# Fluenzzy - Complete Application Guide

## Overview

Fluenzzy is a full-stack influencer marketing platform connecting brands, agencies, and YouTube influencers. The application is built with React 18, TypeScript, Vite, and TailwindCSS with a modern, production-ready design.

## Architecture

### Three-Role System

The platform has strict role-based UI isolation:
- **Brand Users**: Create campaigns, discover influencers, manage contracts
- **Agency Users**: Manage multiple brands, influencer database, analytics
- **Influencer Users**: Receive campaign requests, upload deliverables, track earnings

Each role has a completely isolated UI experience with no cross-contamination.

### Project Structure

```
client/
├── pages/                 # Route components
│   ├── Index.tsx          # Landing page
│   ├── Login.tsx          # Login form
│   ├── Signup.tsx         # Multi-step signup
│   ├── BrandDashboard.tsx
│   ├── AgencyDashboard.tsx
│   ├── InfluencerDashboard.tsx
│   ├── Placeholder.tsx    # Reusable placeholder for unbuilt pages
│   └── NotFound.tsx
├── components/
│   ├── micro/             # **Micro UI Components (easy to swap)**
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Select.tsx
│   │   ├── Logo.tsx
│   │   ├── Container.tsx
│   │   └── index.ts       # Export all micro components
│   ├── layout/            # Shared layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                # Pre-built Radix UI components
├── lib/
│   ├── utils.ts           # cn() utility for class merging
│   └── auth.ts            # Auth helpers
├── App.tsx                # Main app with all routes
└── global.css             # Theme and global styles

server/
├── index.ts               # Express server config
└── routes/                # API endpoints

shared/
└── api.ts                 # Shared types between client and server
```

## Micro UI Components System

All UI components are built as **micro components** for easy swapping and customization. They're located in `client/components/micro/`.

### Available Micro Components

#### Button
```tsx
import { Button } from "@/components/micro";

<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "outline" | "ghost" (default: "primary")
- `size`: "sm" | "md" | "lg" (default: "md")
- `fullWidth`: boolean
- `disabled`: boolean
- `onClick`: () => void
- `type`: "button" | "submit" | "reset"
- `className`: string (for overrides)

#### Input
```tsx
import { Input } from "@/components/micro";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid email"
  helperText="We'll never share this"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

**Props:**
- `label`: string (optional)
- `type`: HTML input type
- `placeholder`: string
- `error`: string (shows error message in red)
- `helperText`: string (shows helper text below input)
- `value`: string
- `onChange`: (e: ChangeEvent) => void

#### Card / CardHeader / CardTitle / CardContent
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/micro";

<Card hoverable onClick={handleClick}>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

**Props:**
- `Card`: hoverable, onClick, className
- `CardHeader`: children, className
- `CardTitle`: children, className
- `CardContent`: children, className

#### Badge
```tsx
import { Badge } from "@/components/micro";

<Badge variant="primary">Active</Badge>
<Badge variant="success" size="sm">Completed</Badge>
```

**Props:**
- `variant`: "default" | "primary" | "secondary" | "accent" | "success" | "warning"
- `size`: "sm" | "md" (default: "md")

#### Select
```tsx
import { Select } from "@/components/micro";

<Select
  label="Choose role"
  options={[
    { value: "admin", label: "Administrator" },
    { value: "user", label: "User" }
  ]}
  value={selectedRole}
  onChange={setSelectedRole}
  error={errors.role}
/>
```

**Props:**
- `label`: string (optional)
- `options`: Array<{ value: string; label: string }>
- `value`: string
- `onChange`: (value: string) => void
- `placeholder`: string
- `error`: string

#### Logo
```tsx
import { Logo } from "@/components/micro";

<Logo className="custom-class" />
```

#### Container
```tsx
import { Container } from "@/components/micro";

<Container size="lg">
  Content here with max-width and auto margins
</Container>
```

**Props:**
- `size`: "sm" | "md" | "lg" | "xl" (default: "lg")

## Theme & Colors

The application uses a vibrant modern brand color scheme:

- **Primary**: Purple (#9E5FDB / hsl(263 80% 50%)) - Main actions
- **Secondary**: Blue (#4DA6FF / hsl(217 91% 60%)) - Secondary actions
- **Accent**: Red (#FF2D55 / hsl(351 100% 55%)) - Alerts and highlights
- **Muted**: Light gray - Backgrounds and disabled states

### Customizing Colors

Edit `client/global.css` to change theme colors. All colors use HSL format for easy adjustments.

```css
:root {
  --primary: 263 80% 50%;
  --secondary: 217 91% 60%;
  --accent: 351 100% 55%;
  /* ... more colors ... */
}
```

Update corresponding colors in `tailwind.config.ts` if needed.

## Routing

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/signup` - Multi-step signup

### Brand Routes (Prefix: `/brand/`)
- `/brand/dashboard` - Main dashboard
- `/brand/discover` - Discover influencers
- `/brand/campaigns/new` - Create campaign
- `/brand/campaigns/:id` - Campaign details
- `/brand/contracts` - Contract management
- `/brand/payments` - Payment history
- `/brand/messages` - Chat/messaging

### Agency Routes (Prefix: `/agency/`)
- `/agency/dashboard` - Main dashboard
- `/agency/brands` - Manage brands
- `/agency/influencers` - Manage influencers
- `/agency/campaigns/new` - Create campaign
- `/agency/analytics` - Analytics dashboard
- `/agency/shortlisting` - Create shortlists

### Influencer Routes (Prefix: `/influencer/`)
- `/influencer/dashboard` - Main dashboard
- `/influencer/campaigns/:id` - Campaign details
- `/influencer/contracts` - Contracts
- `/influencer/payments` - Payment history
- `/influencer/messages` - Messaging

## Building New Features

### Creating a New Page

1. Create page component in `client/pages/`:
```tsx
import { Header, Footer } from "@/components/layout";
import { Container, Button, Card } from "@/components/micro";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />
      
      <main className="flex-grow py-8">
        <Container>
          {/* Content */}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
```

2. Add route in `client/App.tsx`:
```tsx
<Route path="/brand/my-page" element={<MyPage />} />
```

### Creating a New Component

Use the micro UI system. Create in appropriate folder and import:

```tsx
import { Button, Input, Card } from "@/components/micro";
```

### Styling

- Use TailwindCSS utilities for all styling
- Use the `cn()` utility for conditional classes:
```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-classes", condition && "conditional-class")}>
```

## Authentication Flow

The app currently uses localStorage for demo purposes. For production:

1. Create API endpoint in `server/routes/` for login/signup
2. Update `client/lib/auth.ts` with API calls
3. Implement proper JWT or session-based auth

Current demo flow:
```
Signup → localStorage → Redirect to dashboard
Login → localStorage → Redirect to dashboard
```

## Adding API Endpoints

1. Create route handler in `server/routes/my-endpoint.ts`:
```tsx
import { RequestHandler } from "express";

export const handleMyEndpoint: RequestHandler = (req, res) => {
  res.json({ message: "Success" });
};
```

2. Register in `server/index.ts`:
```tsx
import { handleMyEndpoint } from "./routes/my-endpoint";
app.get("/api/my-endpoint", handleMyEndpoint);
```

3. Call from React:
```tsx
const response = await fetch("/api/my-endpoint");
const data = await response.json();
```

## Placeholder Pages

For pages not yet built, use the `PlaceholderPage` component:

```tsx
<Route
  path="/brand/unbuilt"
  element={
    <PlaceholderPage
      title="Feature Title"
      description="Feature description"
      userRole="brand"
    />
  }
/>
```

This maintains consistent UX and encourages users to request features.

## Development Commands

```bash
# Start dev server (auto-reloads on changes)
pnpm dev

# Type check
pnpm typecheck

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test
```

## Best Practices

1. **Micro UI First**: Always use micro components, don't build custom styles
2. **Role Isolation**: Keep role-specific code separate, no shared logic between roles
3. **Type Safety**: Use TypeScript for all components and utilities
4. **Responsive Design**: Test on mobile, tablet, and desktop
5. **Accessibility**: Use semantic HTML and ARIA labels
6. **Performance**: Code-split by role and lazy load pages when possible

## Key Dependencies

- **React 18**: UI framework
- **React Router 6**: Client-side routing (SPA mode)
- **TailwindCSS 3**: Utility-first CSS
- **Radix UI**: Accessible component primitives
- **TypeScript**: Static typing
- **Vite**: Fast build tool
- **Express**: Backend framework
- **Zod**: Schema validation

## Next Steps to Build

To request new features or pages, simply mention them in the chat:
- "Build the influencer discovery page"
- "Create the payment processing flow"
- "Add the contract signing page"

The system will handle implementation while maintaining the micro UI architecture and consistent design throughout.
