# DevResume.ai Documentation

Welcome to the DevResume.ai codebase documentation. This is a comprehensive guide to understanding the project structure, architecture, and implementation details.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Core Technologies](#core-technologies)
- [Getting Started](#getting-started)
- [Documentation Sections](#documentation-sections)

## Project Overview

DevResume.ai is a production-ready SaaS starter kit built on top of the Convex platform. It's designed as a monorepo with a focus on code reuse, best practices, and scalability. The project is based on the open-source v1 starter kit by Midday, ported to use Convex as the backend platform.

### Key Features

- **Full-stack TypeScript** - Type-safe development across frontend and backend
- **Monorepo Architecture** - Shared packages and organized workspace structure
- **Modern Authentication** - Convex Auth with Google OAuth integration
- **Subscription Management** - Polar integration for billing and subscriptions
- **Internationalization** - Multi-language support with next-international
- **Analytics & Monitoring** - OpenPanel analytics and Sentry error tracking
- **Email System** - React Email templates with Resend delivery
- **Component Library** - Shared UI components with Shadcn/ui

## Architecture

The application follows a modern full-stack architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Marketing     │    │   Dashboard     │    │   Shared        │
│   Website       │    │   Application   │    │   Packages      │
│   (Next.js)     │    │   (Next.js)     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Convex        │
                    │   Backend       │
                    │   - Database    │
                    │   - Auth        │
                    │   - API         │
                    │   - Storage     │
                    │   - Webhooks    │
                    └─────────────────┘
```

### Data Flow

1. **Frontend Applications** (Web & App) communicate with Convex backend
2. **Convex Functions** handle business logic, database operations, and authentication
3. **External Services** (Polar, Resend, OpenPanel, Sentry) integrate via APIs and webhooks
4. **Shared Packages** provide common utilities, UI components, and configurations

## Directory Structure

```
devresume.ai/
├── apps/                    # Application workspace
│   ├── app/                # Main dashboard application
│   └── web/                # Marketing website
├── packages/               # Shared packages
│   ├── analytics/          # OpenPanel analytics integration
│   ├── backend/           # Convex backend (API, DB, Auth)
│   ├── email/             # React Email templates
│   ├── logger/            # Logging utilities
│   └── ui/                # Shared UI components (Shadcn)
├── tooling/               # Build and development tools
│   └── typescript/        # Shared TypeScript configurations
├── docs/                  # Documentation (this folder)
├── biome.json            # Code formatting and linting
├── turbo.json            # Monorepo build configuration
└── package.json          # Root package configuration
```

## Core Technologies

### Frontend Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library built on Radix UI
- **next-themes** - Dark/light mode support
- **next-international** - Internationalization

### Backend Stack
- **Convex** - Backend-as-a-Service platform
- **Convex Auth** - Authentication system
- **Polar** - Subscription and billing management
- **React Email** - Email template system
- **Resend** - Email delivery service

### Development Tools
- **Turborepo** - Monorepo build system
- **Biome** - Fast linter and formatter
- **TypeScript** - Static type checking
- **Bun** - Package manager and runtime

### External Services
- **OpenPanel** - Privacy-focused analytics
- **Sentry** - Error monitoring and performance tracking
- **Polar** - Subscription billing platform
- **Resend** - Transactional email service

## Getting Started

1. **Prerequisites**: Install [Bun](https://bun.sh/docs/installation)

2. **Installation**:
   ```bash
   bun create @convex-dev/v1@latest
   cd your-project-name
   bun install
   ```

3. **Development**:
   ```bash
   bun dev          # Start all applications
   bun dev:app      # Start dashboard app only
   bun dev:web      # Start marketing site only
   ```

## Documentation Sections

This documentation is organized into the following sections:

- **[Architecture](./architecture.md)** - Detailed system architecture and design patterns
- **[Apps](./apps.md)** - Application-specific documentation (Dashboard & Web)
- **[Packages](./packages.md)** - Shared package documentation and APIs
- **[Backend](./backend.md)** - Convex backend implementation details
- **[Authentication](./authentication.md)** - Auth system and user management
- **[Database](./database.md)** - Schema design and data models
- **[API Reference](./api-reference.md)** - Complete API documentation
- **[UI Components](./ui-components.md)** - Component library documentation
- **[Deployment](./deployment.md)** - Production deployment guide
- **[Development](./development.md)** - Development workflow and best practices

---

For specific implementation details, please refer to the individual documentation sections listed above. 