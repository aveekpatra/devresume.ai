# API Reference

This document provides a comprehensive reference for all Convex functions available in the DevResume.ai backend.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [User Management](#user-management)
- [Subscription Management](#subscription-management)
- [File Storage](#file-storage)
- [Email Functions](#email-functions)
- [Utility Functions](#utility-functions)
- [Error Handling](#error-handling)

## Overview

The DevResume.ai API is built on Convex and provides three types of functions:

- **Queries** - Read-only operations that can be cached and subscribed to
- **Mutations** - Write operations that modify the database
- **Actions** - Functions that can call external APIs and perform complex operations

### Base URL
```
https://your-deployment.convex.cloud
```

### Authentication
All protected endpoints require authentication via Convex Auth. Include the JWT token in your requests.

## Authentication

### Check Authentication Status

#### `auth.isAuthenticated`
**Type:** Query  
**Description:** Checks if the current user is authenticated

```typescript
// Usage
const isAuthenticated = useQuery(api.auth.isAuthenticated);

// Response
type Response = boolean;
```

### Sign Out

#### `auth.signOut`
**Type:** Action  
**Description:** Signs out the current user

```typescript
// Usage
const signOut = useAction(api.auth.signOut);
await signOut();

// Response
type Response = void;
```

## User Management

### Get Current User

#### `users.getUser`
**Type:** Query  
**Description:** Retrieves the current authenticated user with subscription data

```typescript
// Usage
const user = useQuery(api.users.getUser);

// Response
type Response = {
  _id: Id<"users">;
  _creationTime: number;
  name?: string;
  email?: string;
  username?: string;
  image?: string;
  imageId?: Id<"_storage">;
  avatarUrl?: string;
  subscription?: {
    id: string;
    status: "active" | "cancelled" | "past_due";
    currentPeriodEnd: number;
    product: {
      id: string;
      name: string;
      recurringInterval: "month" | "year";
    };
  };
} | undefined;
```

### Update Username

#### `users.updateUsername`
**Type:** Mutation  
**Description:** Updates the current user's username

```typescript
// Parameters
interface Args {
  username: string; // 3-30 characters, alphanumeric and underscores only
}

// Usage
const updateUsername = useMutation(api.users.updateUsername);
await updateUsername({ username: "new_username" });

// Response
type Response = void;

// Errors
// - "Username must be 3-30 characters"
// - "Username can only contain letters, numbers, and underscores"
// - "User not found"
```

### Generate Upload URL

#### `users.generateUploadUrl`
**Type:** Mutation  
**Description:** Generates a secure URL for uploading files

```typescript
// Usage
const generateUploadUrl = useMutation(api.users.generateUploadUrl);
const uploadUrl = await generateUploadUrl();

// Response
type Response = string; // Upload URL

// Errors
// - "User not found"
```

### Update User Image

#### `users.updateUserImage`
**Type:** Mutation  
**Description:** Associates an uploaded image with the current user

```typescript
// Parameters
interface Args {
  imageId: Id<"_storage">;
}

// Usage
const updateUserImage = useMutation(api.users.updateUserImage);
await updateUserImage({ imageId: "storage_id_here" });

// Response
type Response = void;
```

### Remove User Image

#### `users.removeUserImage`
**Type:** Mutation  
**Description:** Removes the current user's profile image

```typescript
// Usage
const removeUserImage = useMutation(api.users.removeUserImage);
await removeUserImage();

// Response
type Response = void;
```

### Delete User Account

#### `users.deleteCurrentUserAccount`
**Type:** Action  
**Description:** Permanently deletes the current user's account and cancels subscriptions

```typescript
// Usage
const deleteAccount = useAction(api.users.deleteCurrentUserAccount);
await deleteAccount();

// Response
type Response = void;

// Side Effects
// - Cancels active subscriptions
// - Deletes all user data
// - Removes authentication accounts
```

## Subscription Management

### List Products

#### `subscriptions.listAllProducts`
**Type:** Query  
**Description:** Retrieves all available subscription products

```typescript
// Usage
const products = useQuery(api.subscriptions.listAllProducts);

// Response
type Response = Array<{
  id: string;
  name: string;
  description: string;
  recurringInterval: "month" | "year";
  prices: Array<{
    id: string;
    priceAmount: number; // Amount in cents
    amountType: "fixed";
  }>;
}>;
```

### Change Subscription

#### `subscriptions.changeCurrentSubscription`
**Type:** Action  
**Description:** Changes the current user's subscription plan

```typescript
// Parameters
interface Args {
  productId: string;
  priceId?: string;
}

// Usage
const changeSubscription = useAction(api.subscriptions.changeCurrentSubscription);
await changeSubscription({ 
  productId: "prod_123",
  priceId: "price_456" 
});

// Response
type Response = {
  success: boolean;
  subscriptionId?: string;
  checkoutUrl?: string;
};
```

### Cancel Subscription

#### `subscriptions.cancelCurrentSubscription`
**Type:** Action  
**Description:** Cancels the current user's subscription

```typescript
// Parameters
interface Args {
  revokeImmediately?: boolean; // Default: false
}

// Usage
const cancelSubscription = useAction(api.subscriptions.cancelCurrentSubscription);
await cancelSubscription({ revokeImmediately: true });

// Response
type Response = {
  success: boolean;
  cancelledAt: number;
};
```

### Generate Checkout Link

#### `subscriptions.generateCheckoutLink`
**Type:** Action  
**Description:** Creates a checkout link for subscription purchase

```typescript
// Parameters
interface Args {
  productIds: string[];
  successUrl?: string;
  cancelUrl?: string;
}

// Usage
const generateCheckout = useAction(api.subscriptions.generateCheckoutLink);
const { checkoutUrl } = await generateCheckout({
  productIds: ["prod_123", "prod_456"],
  successUrl: "https://app.example.com/success",
  cancelUrl: "https://app.example.com/cancel"
});

// Response
type Response = {
  checkoutUrl: string;
};
```

### Generate Customer Portal URL

#### `subscriptions.generateCustomerPortalUrl`
**Type:** Action  
**Description:** Creates a customer portal URL for subscription management

```typescript
// Parameters
interface Args {
  returnUrl?: string;
}

// Usage
const generatePortal = useAction(api.subscriptions.generateCustomerPortalUrl);
const { portalUrl } = await generatePortal({
  returnUrl: "https://app.example.com/settings"
});

// Response
type Response = {
  portalUrl: string;
};
```

## File Storage

### Upload File Process

File uploads follow a three-step process:

1. **Generate Upload URL**
2. **Upload File to Storage**
3. **Associate File with User**

#### Complete Upload Example

```typescript
// Step 1: Generate upload URL
const generateUploadUrl = useMutation(api.users.generateUploadUrl);
const uploadUrl = await generateUploadUrl();

// Step 2: Upload file
const response = await fetch(uploadUrl, {
  method: "POST",
  headers: { "Content-Type": file.type },
  body: file,
});

const { storageId } = await response.json();

// Step 3: Associate with user
const updateUserImage = useMutation(api.users.updateUserImage);
await updateUserImage({ imageId: storageId });
```

### Get File URL

Files are automatically served via CDN when accessed through the `avatarUrl` field in user queries.

## Email Functions

### Send Welcome Email

#### `email.sendWelcomeEmail`
**Type:** Action  
**Description:** Sends a welcome email to a user

```typescript
// Parameters
interface Args {
  email: string;
  name: string;
}

// Usage (internal use only)
await ctx.runAction(internal.email.sendWelcomeEmail, {
  email: "user@example.com",
  name: "John Doe"
});

// Response
type Response = {
  success: boolean;
  messageId?: string;
};
```

### Send Subscription Email

#### `email.sendSubscriptionEmail`
**Type:** Action  
**Description:** Sends subscription-related emails

```typescript
// Parameters
interface Args {
  email: string;
  type: "subscription_created" | "subscription_cancelled" | "payment_failed";
  subscriptionData: {
    productName: string;
    amount: number;
    nextBillingDate?: number;
  };
}

// Usage (internal use only)
await ctx.runAction(internal.email.sendSubscriptionEmail, {
  email: "user@example.com",
  type: "subscription_created",
  subscriptionData: {
    productName: "Pro Plan",
    amount: 2000,
    nextBillingDate: Date.now() + 30 * 24 * 60 * 60 * 1000
  }
});

// Response
type Response = {
  success: boolean;
  messageId?: string;
};
```

## Utility Functions

### Initialize Database

#### `init`
**Type:** Internal Action  
**Description:** Initializes the database with default products and settings

```typescript
// Usage (CLI only)
npx convex run init

// Side Effects
// - Creates default Polar products
// - Sets up initial configuration
// - Configures webhooks
```

### Validate Input

#### Input Validation Schemas

The API uses Zod schemas for input validation:

```typescript
// Username validation
const username = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be less than 30 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");

// Email validation
const email = z
  .string()
  .email("Invalid email format");

// Usage in functions
const validatedUsername = username.parse(args.username);
```

## Error Handling

### Error Types

The API uses consistent error handling with these error types:

#### ConvexError
Standard Convex errors for client-facing issues:

```typescript
import { ConvexError } from "convex/values";

throw new ConvexError("User not found");
throw new ConvexError("Authentication required");
throw new ConvexError("Invalid input data");
```

#### Validation Errors
Input validation errors from Zod:

```typescript
// Automatic validation error format
{
  code: "invalid_type",
  expected: "string",
  received: "undefined",
  path: ["username"],
  message: "Required"
}
```

### Common Error Codes

| Error Code | Description | Resolution |
|------------|-------------|------------|
| `UNAUTHENTICATED` | User not authenticated | Sign in required |
| `FORBIDDEN` | Insufficient permissions | Check user role |
| `NOT_FOUND` | Resource not found | Verify resource ID |
| `INVALID_INPUT` | Input validation failed | Check input format |
| `RATE_LIMITED` | Too many requests | Wait and retry |
| `EXTERNAL_API_ERROR` | External service error | Retry or contact support |

### Error Response Format

```typescript
// Error response structure
{
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

### Handling Errors in Client

```typescript
// React error handling
function MyComponent() {
  const user = useQuery(api.users.getUser);
  const updateUsername = useMutation(api.users.updateUsername);
  
  const handleUpdateUsername = async (username: string) => {
    try {
      await updateUsername({ username });
      toast.success("Username updated successfully");
    } catch (error) {
      if (error instanceof ConvexError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  
  if (user === undefined) {
    return <LoadingSpinner />;
  }
  
  if (user === null) {
    return <SignInPrompt />;
  }
  
  return <UserProfile user={user} onUpdateUsername={handleUpdateUsername} />;
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Queries**: 1000 requests per minute per user
- **Mutations**: 100 requests per minute per user  
- **Actions**: 50 requests per minute per user

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Webhooks

### Polar Webhooks

The API automatically handles Polar webhooks for subscription events:

#### Supported Events
- `subscription.created`
- `subscription.updated`
- `subscription.cancelled`
- `payment.succeeded`
- `payment.failed`

#### Webhook Endpoint
```
POST https://your-deployment.convex.cloud/polar/events
```

#### Webhook Security
- Webhooks are automatically verified using HMAC signatures
- Invalid signatures are rejected
- Duplicate events are handled idempotently

---

This API reference provides comprehensive documentation for integrating with the DevResume.ai backend. For additional support, refer to the [Convex documentation](https://docs.convex.dev) or create an issue in the project repository. 