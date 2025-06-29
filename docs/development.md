# Development Guide

This document provides comprehensive guidance for developing, testing, and contributing to the DevResume.ai project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Strategy](#testing-strategy)
- [Debugging](#debugging)
- [Performance Guidelines](#performance-guidelines)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

1. **Bun** - Package manager and runtime
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Node.js** - For compatibility (18.0+)
   ```bash
   # Using nvm
   nvm install 18
   nvm use 18
   ```

3. **Git** - Version control
   ```bash
   git --version
   ```

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd devresume.ai
   bun install
   ```

2. **Environment Configuration**
   ```bash
   # Copy environment files
   cp apps/app/.env.example apps/app/.env
   cp apps/web/.env.example apps/web/.env
   cp packages/backend/.env.example packages/backend/.env
   ```

3. **Convex Setup**
   ```bash
   cd packages/backend
   bunx convex dev --once
   npx @convex-dev/auth
   ```

4. **Start Development**
   ```bash
   # From root directory
   bun dev
   ```

### Development Scripts

```bash
# Start all applications
bun dev

# Start specific applications
bun dev:app      # Dashboard app only
bun dev:web      # Marketing site only

# Build and test
bun build        # Build all packages
bun test         # Run tests
bun lint         # Lint code
bun format       # Format code
bun typecheck    # Type checking

# Clean and reset
bun clean        # Clean build artifacts
bun clean:workspaces  # Clean all workspaces
```

## Development Workflow

### Branch Strategy

```
main
├── develop
├── feature/feature-name
├── bugfix/bug-description
├── hotfix/critical-fix
└── release/version-number
```

### Typical Workflow

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/new-feature
   ```

2. **Development**
   ```bash
   # Make changes
   bun dev
   
   # Test changes
   bun test
   bun lint
   bun typecheck
   ```

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/new-feature
   # Create pull request via GitHub
   ```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

**Examples:**
```bash
feat: add user profile management
fix: resolve authentication redirect loop
docs: update API documentation
refactor: simplify user query logic
```

## Code Standards

### TypeScript Guidelines

1. **Strict Type Safety**
   ```typescript
   // ✅ Good - Explicit types
   interface UserProfile {
     id: string;
     name: string;
     email: string;
     createdAt: Date;
   }
   
   // ❌ Avoid - Any types
   const user: any = getUserData();
   ```

2. **Function Signatures**
   ```typescript
   // ✅ Good - Clear function signature
   async function updateUser(
     userId: string, 
     updates: Partial<UserProfile>
   ): Promise<UserProfile> {
     // Implementation
   }
   
   // ❌ Avoid - Unclear parameters
   async function updateUser(id, data) {
     // Implementation
   }
   ```

3. **Error Handling**
   ```typescript
   // ✅ Good - Explicit error handling
   try {
     const result = await riskyOperation();
     return { success: true, data: result };
   } catch (error) {
     logger.error("Operation failed", error);
     return { success: false, error: error.message };
   }
   ```

### React Guidelines

1. **Component Structure**
   ```typescript
   // ✅ Good - Functional component with TypeScript
   interface Props {
     title: string;
     onSubmit: (data: FormData) => void;
     isLoading?: boolean;
   }
   
   export function MyComponent({ title, onSubmit, isLoading = false }: Props) {
     const [formData, setFormData] = useState<FormData>({});
     
     const handleSubmit = useCallback(() => {
       onSubmit(formData);
     }, [formData, onSubmit]);
     
     return (
       <div>
         <h1>{title}</h1>
         {/* Component JSX */}
       </div>
     );
   }
   ```

2. **Hooks Usage**
   ```typescript
   // ✅ Good - Custom hooks for reusable logic
   function useUserProfile(userId: string) {
     const user = useQuery(api.users.getUser, { userId });
     const updateUser = useMutation(api.users.updateUser);
     
     return {
       user,
       updateUser,
       isLoading: user === undefined,
     };
   }
   ```

3. **State Management**
   ```typescript
   // ✅ Good - Minimal state, derive when possible
   function UserList() {
     const users = useQuery(api.users.list);
     const searchTerm = useQueryState('search', { defaultValue: '' });
     
     const filteredUsers = useMemo(() => 
       users?.filter(user => 
         user.name.toLowerCase().includes(searchTerm.toLowerCase())
       ) ?? []
     , [users, searchTerm]);
     
     return (
       <div>
         {filteredUsers.map(user => (
           <UserCard key={user.id} user={user} />
         ))}
       </div>
     );
   }
   ```

### Styling Guidelines

1. **Tailwind CSS**
   ```typescript
   // ✅ Good - Semantic class organization
   <div className={cn(
     "flex items-center justify-between",
     "p-4 rounded-lg border",
     "bg-card text-card-foreground",
     "hover:bg-accent hover:text-accent-foreground",
     isActive && "bg-primary text-primary-foreground"
   )}>
   ```

2. **Component Variants**
   ```typescript
   // ✅ Good - Using class-variance-authority
   const cardVariants = cva(
     "rounded-lg border p-4",
     {
       variants: {
         variant: {
           default: "bg-card text-card-foreground",
           destructive: "bg-destructive text-destructive-foreground",
         },
         size: {
           sm: "p-2 text-sm",
           md: "p-4 text-base",
           lg: "p-6 text-lg",
         },
       },
       defaultVariants: {
         variant: "default",
         size: "md",
       },
     }
   );
   ```

### Backend Guidelines

1. **Convex Functions**
   ```typescript
   // ✅ Good - Clear function structure
   export const updateUserProfile = mutation({
     args: {
       userId: v.id("users"),
       updates: v.object({
         name: v.optional(v.string()),
         bio: v.optional(v.string()),
       }),
     },
     handler: async (ctx, { userId, updates }) => {
       const user = await ctx.db.get(userId);
       if (!user) {
         throw new Error("User not found");
       }
       
       // Validate updates
       const validatedUpdates = validateUserUpdates(updates);
       
       // Update user
       await ctx.db.patch(userId, validatedUpdates);
       
       return { success: true };
     },
   });
   ```

2. **Error Handling**
   ```typescript
   // ✅ Good - Consistent error handling
   export const createDocument = mutation({
     args: { title: v.string(), content: v.string() },
     handler: async (ctx, args) => {
       const userId = await getAuthUserId(ctx);
       if (!userId) {
         throw new ConvexError("Authentication required");
       }
       
       try {
         const document = await ctx.db.insert("documents", {
           ...args,
           userId,
           createdAt: Date.now(),
         });
         
         return document;
       } catch (error) {
         logger.error("Failed to create document", error);
         throw new ConvexError("Failed to create document");
       }
     },
   });
   ```

## Testing Strategy

### Unit Testing

```typescript
// Example test file: components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });
});
```

### Integration Testing

```typescript
// Example: API integration test
import { ConvexTestingHelper } from "convex/testing";
import { api } from "./_generated/api";
import schema from "./schema";

describe("User API", () => {
  let t: ConvexTestingHelper<typeof schema>;
  
  beforeEach(async () => {
    t = new ConvexTestingHelper(schema);
    await t.run(async (ctx) => {
      // Setup test data
    });
  });
  
  it("creates user successfully", async () => {
    const result = await t.mutation(api.users.create, {
      name: "Test User",
      email: "test@example.com",
    });
    
    expect(result).toMatchObject({
      name: "Test User",
      email: "test@example.com",
    });
  });
});
```

### E2E Testing

```typescript
// Example: Playwright E2E test
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('user can sign in with Google', async ({ page }) => {
    await page.goto('/login');
    
    // Mock Google OAuth
    await page.route('**/oauth/google', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ token: 'mock-token' }),
      });
    });
    
    await page.click('[data-testid="google-signin"]');
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-avatar"]')).toBeVisible();
  });
});
```

## Debugging

### Frontend Debugging

1. **React DevTools**
   ```bash
   # Install React DevTools extension
   # Available for Chrome, Firefox, Edge
   ```

2. **Console Debugging**
   ```typescript
   // ✅ Good - Structured logging
   console.log('User data:', { userId, userData, timestamp: Date.now() });
   
   // ✅ Good - Conditional debugging
   if (process.env.NODE_ENV === 'development') {
     console.debug('Component rendered with props:', props);
   }
   ```

3. **Error Boundaries**
   ```typescript
   function ErrorBoundary({ children }: { children: React.ReactNode }) {
     return (
       <Suspense fallback={<LoadingSpinner />}>
         <ErrorBoundaryComponent>
           {children}
         </ErrorBoundaryComponent>
       </Suspense>
     );
   }
   ```

### Backend Debugging

1. **Convex Dashboard**
   - View function logs
   - Monitor database queries
   - Track real-time updates

2. **Logging**
   ```typescript
   import { logger } from "@v1/logger";
   
   export const debugFunction = mutation({
     handler: async (ctx, args) => {
       logger.debug("Function called with args", args);
       
       try {
         const result = await processData(args);
         logger.info("Processing completed", { resultId: result.id });
         return result;
       } catch (error) {
         logger.error("Processing failed", error);
         throw error;
       }
     },
   });
   ```

## Performance Guidelines

### Frontend Performance

1. **Bundle Optimization**
   ```typescript
   // ✅ Good - Dynamic imports for code splitting
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   
   function App() {
     return (
       <Suspense fallback={<Loading />}>
         <HeavyComponent />
       </Suspense>
     );
   }
   ```

2. **Image Optimization**
   ```typescript
   // ✅ Good - Next.js Image component
   import Image from 'next/image';
   
   <Image
     src="/hero-image.jpg"
     alt="Hero"
     width={800}
     height={600}
     priority
     placeholder="blur"
     blurDataURL="data:image/jpeg;base64,..."
   />
   ```

3. **Caching Strategies**
   ```typescript
   // ✅ Good - Memoization for expensive calculations
   const expensiveValue = useMemo(() => {
     return heavyCalculation(data);
   }, [data]);
   
   // ✅ Good - Callback memoization
   const handleSubmit = useCallback((formData: FormData) => {
     onSubmit(formData);
   }, [onSubmit]);
   ```

### Backend Performance

1. **Query Optimization**
   ```typescript
   // ✅ Good - Efficient database queries
   export const getUsersWithPosts = query({
     handler: async (ctx) => {
       const users = await ctx.db.query("users").collect();
       
       // Batch fetch posts to avoid N+1 queries
       const userIds = users.map(u => u._id);
       const posts = await ctx.db
         .query("posts")
         .withIndex("by_user_id", q => q.in("userId", userIds))
         .collect();
       
       // Group posts by user
       const postsByUser = groupBy(posts, 'userId');
       
       return users.map(user => ({
         ...user,
         posts: postsByUser[user._id] || [],
       }));
     },
   });
   ```

2. **Caching**
   ```typescript
   // ✅ Good - Leverage Convex caching
   export const getExpensiveData = query({
     handler: async (ctx) => {
       // This query result is automatically cached
       return await performExpensiveOperation();
     },
   });
   ```

## Contributing

### Pull Request Process

1. **Before Creating PR**
   ```bash
   # Ensure all checks pass
   bun lint
   bun typecheck
   bun test
   bun build
   ```

2. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Integration tests pass
   - [ ] Manual testing completed
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   ```

3. **Review Process**
   - At least one code review required
   - All CI checks must pass
   - No merge conflicts
   - Up-to-date with target branch

### Code Review Guidelines

**As a Reviewer:**
- Focus on logic, security, and maintainability
- Suggest improvements, don't just point out problems
- Consider performance implications
- Check for proper error handling

**As an Author:**
- Respond to all comments
- Make requested changes or explain why not
- Keep PRs focused and reasonably sized
- Update tests and documentation

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear caches and reinstall
   bun clean
   rm -rf node_modules
   bun install
   
   # Clear Next.js cache
   rm -rf .next
   bun build
   ```

2. **Type Errors**
   ```bash
   # Regenerate Convex types
   cd packages/backend
   bunx convex dev --once
   
   # Check TypeScript configuration
   bun typecheck
   ```

3. **Authentication Issues**
   ```bash
   # Reconfigure Convex Auth
   cd packages/backend
   npx @convex-dev/auth
   
   # Check environment variables
   cat .env
   ```

4. **Development Server Issues**
   ```bash
   # Kill all node processes
   pkill -f node
   
   # Restart development server
   bun dev
   ```

### Getting Help

1. **Documentation**
   - Check this documentation first
   - Review Convex documentation
   - Check Next.js documentation

2. **Community**
   - Create GitHub issue for bugs
   - Join Discord for questions
   - Check existing issues first

3. **Debugging Steps**
   - Check browser console for errors
   - Review server logs
   - Verify environment variables
   - Test in incognito/private mode

---

This development guide provides the foundation for contributing effectively to the DevResume.ai project. Follow these guidelines to maintain code quality, performance, and team productivity. 