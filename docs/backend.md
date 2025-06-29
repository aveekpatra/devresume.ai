# Backend Documentation

This document covers the Convex backend implementation, including database schema, functions, authentication, and external service integrations.

## Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Authentication System](#authentication-system)
- [Functions](#functions)
- [File Storage](#file-storage)
- [External Integrations](#external-integrations)
- [Webhooks](#webhooks)
- [Environment Configuration](#environment-configuration)

## Overview

The backend is built on Convex, a Backend-as-a-Service platform that provides:
- Document-based database with ACID transactions
- Real-time queries and mutations
- Built-in authentication system
- File storage with CDN distribution
- HTTP endpoints for webhooks
- Automatic scaling and caching

### Project Structure

```
packages/backend/convex/
├── _generated/          # Auto-generated Convex files
├── email/              # Email templates and logic
├── utils/              # Utility functions and validators
├── auth.config.ts      # Authentication configuration
├── auth.ts            # Auth setup
├── convex.config.ts   # Convex configuration
├── http.ts            # HTTP routes and webhooks
├── init.ts            # Database initialization
├── schema.ts          # Database schema definition
├── subscriptions.ts   # Billing and subscription logic
├── users.ts           # User management functions
└── web.ts             # Web-specific functions
```

## Database Schema

### User Table

The main user table extends Convex Auth's built-in authentication fields:

```typescript
users: defineTable({
  // Convex Auth fields
  name: v.optional(v.string()),
  image: v.optional(v.string()),
  email: v.optional(v.string()),
  emailVerificationTime: v.optional(v.number()),
  phone: v.optional(v.string()),
  phoneVerificationTime: v.optional(v.number()),
  isAnonymous: v.optional(v.boolean()),

  // Custom application fields
  username: v.optional(v.string()),
  imageId: v.optional(v.id("_storage")),
}).index("email", ["email"])
```

### Auth Tables

Convex Auth automatically creates these tables:
- `authAccounts` - OAuth provider accounts
- `authSessions` - User sessions
- `authVerificationCodes` - Email/phone verification codes
- `authRateLimits` - Rate limiting data

### Indexes

- `users.email` - Fast user lookup by email address
- Additional auth-related indexes are automatically created

## Authentication System

### Configuration

```typescript
// auth.config.ts
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
```

### OAuth Integration

Google OAuth is configured through Convex Auth:

```typescript
// Automatic OAuth setup via @convex-dev/auth
// Supports multiple providers:
// - Google
// - GitHub  
// - Discord
// - And more...
```

### Session Management

- JWT-based authentication
- Automatic session refresh
- Server-side session validation
- Middleware-based route protection

## Functions

### Query Functions (Read-only)

#### `getUser`
Retrieves the current authenticated user with subscription data:

```typescript
export const getUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;
    
    const user = await ctx.db.get(userId);
    if (!user) return;
    
    const subscription = await polar.getCurrentSubscription(ctx, {
      userId: user._id,
    });
    
    return {
      ...user,
      name: user.username || user.name,
      subscription,
      avatarUrl: user.imageId 
        ? await ctx.storage.getUrl(user.imageId)
        : undefined,
    };
  },
});
```

### Mutation Functions (Database writes)

#### `updateUsername`
Updates the user's username with validation:

```typescript
export const updateUsername = mutation({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;
    
    const validatedUsername = username.safeParse(args.username);
    if (!validatedUsername.success) {
      throw new Error(validatedUsername.error.message);
    }
    
    await ctx.db.patch(userId, { 
      username: validatedUsername.data 
    });
  },
});
```

#### `generateUploadUrl`
Creates a secure upload URL for file uploads:

```typescript
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not found");
    }
    return await ctx.storage.generateUploadUrl();
  },
});
```

#### `updateUserImage`
Associates an uploaded image with the user:

```typescript
export const updateUserImage = mutation({
  args: { imageId: v.id("_storage") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;
    
    ctx.db.patch(userId, { imageId: args.imageId });
  },
});
```

### Action Functions (External APIs)

#### `deleteCurrentUserAccount`
Handles complete account deletion including subscription cancellation:

```typescript
export const deleteCurrentUserAccount = action({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;
    
    // Cancel subscription if exists
    const subscription = await polar.getCurrentSubscription(ctx, {
      userId,
    });
    if (subscription) {
      await polar.cancelSubscription(ctx, {
        revokeImmediately: true,
      });
    }
    
    // Delete user account
    await ctx.runMutation(internal.users.deleteUserAccount, {
      userId,
    });
  },
});
```

## File Storage

### Upload Process

1. **Generate Upload URL**: Client requests secure upload URL
2. **Direct Upload**: Client uploads file directly to Convex storage
3. **Associate File**: Client calls mutation to associate file with user
4. **Serve Files**: Files served via CDN with automatic optimization

### Implementation

```typescript
// Generate upload URL
const uploadUrl = await generateUploadUrl();

// Upload file (client-side)
const response = await fetch(uploadUrl, {
  method: "POST",
  headers: { "Content-Type": file.type },
  body: file,
});

const { storageId } = await response.json();

// Associate with user
await updateUserImage({ imageId: storageId });
```

## External Integrations

### Polar (Billing)

Polar integration provides subscription management:

```typescript
export const polar = new Polar(components.polar, {
  getUserInfo: async (ctx): Promise<{ 
    userId: Id<"users">; 
    email: string 
  }> => {
    const user = await ctx.runQuery(api.users.getUser);
    if (!user || !user.email) {
      throw new Error("User not found or email missing");
    }
    return {
      userId: user._id,
      email: user.email,
    };
  },
});
```

#### Available Functions
- `changeCurrentSubscription` - Modify existing subscription
- `cancelCurrentSubscription` - Cancel user's subscription
- `listAllProducts` - Get available products
- `generateCheckoutLink` - Create checkout URL
- `generateCustomerPortalUrl` - Create customer portal URL

### Email System

Email templates are built with React Email and sent via Resend:

```typescript
// Email template (React component)
export default function WelcomeEmail() {
  return (
    <Html>
      <Preview>Welcome to DevResume.ai</Preview>
      <Tailwind>
        <Body className="font-sans">
          <Container>
            <Heading>Welcome!</Heading>
            <Section>
              Welcome to our platform...
            </Section>
            <Button href={baseUrl}>
              Get Started
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

## Webhooks

### HTTP Routes

```typescript
const http = httpRouter();

// Authentication routes
auth.addHttpRoutes(http);

// Polar webhook routes
polar.registerRoutes(http);

export default http;
```

### Polar Webhooks

Polar sends webhooks for subscription events:
- `subscription.created` - New subscription
- `subscription.updated` - Subscription changes
- `subscription.cancelled` - Subscription cancellation
- `payment.succeeded` - Successful payment
- `payment.failed` - Failed payment

These are automatically handled by the Polar component.

## Environment Configuration

### Required Environment Variables

```bash
# Convex
CONVEX_DEPLOYMENT=dev:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Authentication
CONVEX_SITE_URL=http://localhost:3000

# Polar (Billing)
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_webhook_secret

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Analytics
OPENPANEL_SECRET_KEY=your_openpanel_secret_key
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=your_client_id

# Monitoring
SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

### Configuration Files

#### `convex.config.ts`
```typescript
import polar from "@convex-dev/polar/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(polar); // Register Polar component

export default app;
```

#### `env.ts`
```typescript
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    POLAR_ACCESS_TOKEN: z.string(),
    OPENPANEL_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.string().url(),
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z.string(),
  },
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    // ... other variables
  },
});
```

## Initialization

### Database Seeding

The `init.ts` function sets up initial data:

```typescript
export default internalAction(async () => {
  // Check if products already exist
  const products = await polar.sdk.products.list({
    isArchived: false,
  });
  
  if (products?.result?.items?.length) {
    console.info("Skipping Polar products creation");
    return;
  }
  
  // Create monthly product
  await polar.sdk.products.create({
    name: "Pro",
    description: "All features for one low monthly price.",
    recurringInterval: "month",
    prices: [{ priceAmount: 2000, amountType: "fixed" }],
  });
  
  // Create yearly product
  await polar.sdk.products.create({
    name: "Pro",
    description: "All features for one low yearly price.",
    recurringInterval: "year",
    prices: [{ priceAmount: 20000, amountType: "fixed" }],
  });
  
  console.info("Polar Products created successfully");
});
```

---

This backend architecture provides a robust, scalable foundation for SaaS applications with built-in authentication, billing, and real-time capabilities. 