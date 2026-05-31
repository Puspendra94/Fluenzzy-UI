# Fluenzzy Code Examples & Recipes

## Common Tasks & How-To Guide

### 1. Creating a New Page

**File**: `client/pages/MyNewPage.tsx`

```tsx
import { Header, Footer } from "@/components/layout";
import { Container, Button, Card, CardHeader, CardTitle, CardContent } from "@/components/micro";
import { Link } from "react-router-dom";

export default function MyNewPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />
      
      <main className="flex-grow py-8">
        <Container>
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-foreground">
              Page Title
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
              <Card hoverable>
                <CardHeader>
                  <CardTitle>Card 1</CardTitle>
                </CardHeader>
                <CardContent>
                  Content here
                </CardContent>
              </Card>
            </div>

            <Link to="/next-page">
              <Button>Continue</Button>
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
```

Then add to `client/App.tsx`:
```tsx
import MyNewPage from "./pages/MyNewPage";

<Route path="/brand/my-page" element={<MyNewPage />} />
```

---

### 2. Building a Form with Validation

```tsx
import { useState } from "react";
import { Input, Button, Select } from "@/components/micro";

export default function MyForm() {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    
    if (!formData.role) newErrors.role = "Please select a role";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      // Send to API
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />

      <Select
        label="Role"
        options={[
          { value: "admin", label: "Administrator" },
          { value: "user", label: "User" }
        ]}
        value={formData.role}
        onChange={(value) => setFormData({ ...formData, role: value })}
        error={errors.role}
      />

      <Button type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
}
```

---

### 3. Displaying a Data List with Cards

```tsx
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/micro";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "pending" | "completed";
  budget: number;
  deadline: string;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Campaign",
    status: "active",
    budget: 5000,
    deadline: "2024-08-30"
  }
  // ... more campaigns
];

export default function CampaignList() {
  const statusVariants = {
    active: "success" as const,
    pending: "warning" as const,
    completed: "default" as const
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} hoverable>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>{campaign.name}</CardTitle>
              <Badge variant={statusVariants[campaign.status]}>
                {campaign.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-foreground/60">
              Budget: ${campaign.budget}
            </p>
            <p className="text-sm text-foreground/60">
              Deadline: {campaign.deadline}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

### 4. Creating a Reusable Component

**File**: `client/components/MyComponent.tsx`

```tsx
interface MyComponentProps {
  title: string;
  description: string;
  onClick?: () => void;
  loading?: boolean;
}

export const MyComponent = ({
  title,
  description,
  onClick,
  loading = false
}: MyComponentProps) => {
  return (
    <div className="p-6 rounded-lg border border-border bg-card">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-foreground/60 mt-2">{description}</p>
      {onClick && (
        <button
          onClick={onClick}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Click me"}
        </button>
      )}
    </div>
  );
};
```

Usage in other components:
```tsx
import { MyComponent } from "@/components/MyComponent";

<MyComponent
  title="My Title"
  description="My description"
  onClick={() => console.log("Clicked")}
/>
```

---

### 5. Using Conditional Styling with `cn()`

```tsx
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "success" | "warning" | "error";
  label: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full text-sm font-medium",
        status === "success" && "bg-emerald-100 text-emerald-700",
        status === "warning" && "bg-amber-100 text-amber-700",
        status === "error" && "bg-red-100 text-red-700"
      )}
    >
      {label}
    </span>
  );
};
```

---

### 6. Handling User Authentication

**File**: `client/lib/auth.ts` (already created)

```tsx
import { getStoredUser, saveUser, clearUser, getRoleBasedPath } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string, role: string) => {
    try {
      // Call API: const response = await fetch("/api/login", { ... })
      // For demo: use localStorage
      saveUser({
        role: role as "brand" | "agency" | "influencer",
        email,
        currency: "USD"
      });

      // Redirect to role dashboard
      navigate(getRoleBasedPath(role as "brand" | "agency" | "influencer"));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  const user = getStoredUser();
  // Use user info...
}
```

---

### 7. Making API Calls

**Server side** - `server/routes/get-campaigns.ts`:
```tsx
import { RequestHandler } from "express";

interface Campaign {
  id: string;
  name: string;
  status: string;
}

interface CampaignsResponse {
  campaigns: Campaign[];
  total: number;
}

export const handleGetCampaigns: RequestHandler<
  never,
  CampaignsResponse,
  never,
  { userId: string }
> = (req, res) => {
  const { userId } = req.query;
  
  // Fetch from database
  const campaigns: Campaign[] = [
    { id: "1", name: "Campaign 1", status: "active" }
  ];

  res.json({ campaigns, total: campaigns.length });
};
```

Register in `server/index.ts`:
```tsx
import { handleGetCampaigns } from "./routes/get-campaigns";

app.get("/api/campaigns", handleGetCampaigns);
```

**Client side** - Use in React component:
```tsx
import { useEffect, useState } from "react";

interface Campaign {
  id: string;
  name: string;
  status: string;
}

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns?userId=123");
        const data = await response.json();
        setCampaigns(data.campaigns);
      } catch (err) {
        setError("Failed to load campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      {campaigns.map(campaign => (
        <div key={campaign.id}>{campaign.name}</div>
      ))}
    </div>
  );
}
```

---

### 8. Using React Router Navigation

```tsx
import { Link, useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();

  // Link-based navigation (declarative)
  return (
    <div>
      <Link to="/brand/campaigns/123">
        View Campaign
      </Link>

      {/* Programmatic navigation (imperative) */}
      <button onClick={() => navigate("/brand/dashboard")}>
        Go to Dashboard
      </button>

      {/* Navigate with state */}
      <button
        onClick={() => navigate("/brand/campaigns", {
          state: { from: "dashboard" }
        })}
      >
        View Campaigns
      </button>
    </div>
  );
}
```

---

### 9. Styling with TailwindCSS

Common patterns:

```tsx
// Spacing
<div className="p-4 m-8 gap-6">

// Colors
<div className="bg-primary text-primary-foreground">

// Responsive
<div className="w-full md:w-1/2 lg:w-1/3">

// Conditional
<div className={`p-4 ${isActive ? 'bg-primary' : 'bg-muted'}`}>

// Gradients
<div className="bg-gradient-to-r from-primary via-secondary to-accent">

// Transitions
<button className="transition-all duration-200 hover:bg-primary/90">

// Dark mode
<div className="bg-white dark:bg-slate-900">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Flex
<div className="flex items-center justify-between gap-4">
```

---

### 10. Customizing Theme Colors

**Edit** `client/global.css`:

```css
:root {
  --primary: 263 80% 50%;        /* Change these HSL values */
  --secondary: 217 91% 60%;
  --accent: 351 100% 55%;
  /* ... etc ... */
}
```

The app automatically uses these colors everywhere.

To add a new color:
```css
:root {
  --mycolor: 120 100% 50%;
}
```

Use in TailwindCSS (add to tailwind.config.ts):
```tsx
extend: {
  colors: {
    mycolor: "hsl(var(--mycolor))"
  }
}
```

Then use: `<div className="bg-mycolor">`

---

## Best Practices

### ✅ Do's
- Use micro components from `client/components/micro/`
- Keep components small and single-responsibility
- Use TypeScript for type safety
- Use `cn()` for conditional styling
- Use React Router for navigation
- Keep styles in components using TailwindCSS
- Test on mobile, tablet, desktop
- Handle loading and error states

### ❌ Don'ts
- Don't create custom buttons/inputs when micro components exist
- Don't hardcode colors - use CSS variables
- Don't use `<a>` tags for internal navigation - use `<Link>`
- Don't forget TypeScript types
- Don't create new color schemes - use theme colors
- Don't add inline styles - use TailwindCSS classes
- Don't forget responsive design - test all breakpoints
- Don't leave console errors or warnings

---

## Quick Reference

### Import Patterns

```tsx
// Components
import { Button, Input, Card, Badge } from "@/components/micro";
import { Header, Footer } from "@/components/layout";

// Utilities
import { cn } from "@/lib/utils";
import { getStoredUser } from "@/lib/auth";

// React & Router
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

// Icons
import { ArrowRight, Zap, Users } from "lucide-react";
```

### Common Class Patterns

```tsx
// Full page layout
className="min-h-screen bg-background flex flex-col"

// Main content area
className="flex-grow py-8"

// Responsive grid
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// Flex centering
className="flex items-center justify-center"

// Button/input styling
className="w-full px-4 py-2 rounded-lg border-2 border-input"

// Text styling
className="text-lg font-semibold text-foreground"
```

---

All examples follow the established patterns in the codebase and are ready to use as templates for new features.
