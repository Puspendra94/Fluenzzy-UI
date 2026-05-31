# Fluenzzy App Structure Overview

## 🎯 Application Architecture

```
Fluenzzy Platform
├── PUBLIC PAGES (No Authentication Required)
│   ├── / (Landing Page)
│   │   ├── Hero Section
│   │   ├── Three User Types Overview
│   │   ├── Features Showcase
│   │   └── How It Works Guide
│   ├── /login
│   │   ├── Role Selection
│   │   ├── Email/Password Form
│   │   └── Validation
│   └── /signup
│       ├── Step 1: Role & Currency Selection
│       ├── Step 2: Email & Password
│       └── Step 3: Confirmation
│
├── BRAND EXPERIENCE (/brand/*)
│   ├── /brand/dashboard (Built)
│   │   ├── Active Campaigns Stats
│   │   ├── Campaign Cards
│   │   └── Quick Actions
│   ├── /brand/discover (Placeholder)
│   │   └── Influencer Search & Filter
│   ├── /brand/campaigns/new (Placeholder)
│   │   └── Campaign Creation Form
│   ├── /brand/campaigns/:id (Placeholder)
│   │   └── Campaign Details & Management
│   ├── /brand/contracts (Placeholder)
│   │   └── Contract Review & Signing
│   ├── /brand/payments (Placeholder)
│   │   └── Payment History & Processing
│   └── /brand/messages (Placeholder)
│       └── Chat with Agencies & Influencers
│
├── AGENCY EXPERIENCE (/agency/*)
│   ├── /agency/dashboard (Built)
│   │   ├── Revenue Stats
│   │   ├── Campaign Cards
│   │   └── Quick Actions
│   ├── /agency/brands (Placeholder)
│   │   └── Brand Database Management
│   ├── /agency/influencers (Placeholder)
│   │   └── Influencer Database Management
│   ├── /agency/campaigns/new (Placeholder)
│   │   └── Campaign Creation
│   ├── /agency/analytics (Placeholder)
│   │   └── Advanced Analytics Dashboard
│   └── /agency/shortlisting (Placeholder)
│       └── Influencer Shortlisting & Proposals
│
└── INFLUENCER EXPERIENCE (/influencer/*)
    ├── /influencer/dashboard (Built)
    │   ├── Active Campaigns
    │   ├── Earnings Stats
    │   └── Quick Actions
    ├── /influencer/campaigns/:id (Placeholder)
    │   └── Campaign Details & Deliverables
    ├── /influencer/contracts (Placeholder)
    │   └── Contract Management
    ├── /influencer/payments (Placeholder)
    │   └── Payment History & Earnings
    └── /influencer/messages (Placeholder)
        └── Chat with Brands & Agencies
```

## 🎨 Component Hierarchy

### Micro UI Components (Client/Components/Micro/)
These are the building blocks - modify these and all pages update:

```
Micro Components
├── Button (4 variants × 3 sizes)
├── Input (with label, error, helper text)
├── Card + CardHeader + CardTitle + CardContent
├── Badge (6 variants)
├── Select (dropdown)
├── Logo (branded)
└── Container (responsive wrapper)
```

### Layout Components (Client/Components/Layout/)
Shared across all pages:

```
Layout Components
├── Header (sticky navigation with auth)
└── Footer (multi-column with links)
```

### Page Components (Client/Pages/)
Each role gets dedicated pages:

```
Pages
├── Public
│   ├── Index (Landing)
│   ├── Login
│   └── Signup
├── Brand
│   ├── BrandDashboard
│   └── [Other pages use Placeholder]
├── Agency
│   ├── AgencyDashboard
│   └── [Other pages use Placeholder]
├── Influencer
│   ├── InfluencerDashboard
│   └── [Other pages use Placeholder]
├── Utility
│   ├── Placeholder (for unbuilt pages)
│   └── NotFound (404)
```

## 🎯 User Flows

### Brand User Flow
```
1. Land on home page
   ↓
2. Click "Sign Up" → /signup
   ↓
3. Select "Brand" role + currency
   ↓
4. Enter email/password
   ↓
5. Confirm signup → /brand/dashboard
   ↓
6. From dashboard can:
   - View campaigns
   - Discover influencers (/brand/discover)
   - Manage contracts (/brand/contracts)
   - View payments (/brand/payments)
   - Send messages (/brand/messages)
```

### Agency User Flow
```
1. Land on home page
   ↓
2. Click "Sign Up" → /signup
   ↓
3. Select "Agency" role + currency
   ↓
4. Enter email/password
   ↓
5. Confirm signup → /agency/dashboard
   ↓
6. From dashboard can:
   - View campaigns
   - Manage brands (/agency/brands)
   - Manage influencers (/agency/influencers)
   - Create campaigns (/agency/campaigns/new)
   - View analytics (/agency/analytics)
   - Create shortlists (/agency/shortlisting)
```

### Influencer User Flow
```
1. Land on home page
   ↓
2. Click "Sign Up" → /signup
   ↓
3. Select "Influencer" role + currency
   ↓
4. Enter email/password
   ↓
5. Confirm signup → /influencer/dashboard
   ↓
6. From dashboard can:
   - View assigned campaigns
   - Manage contracts (/influencer/contracts)
   - View payments & earnings (/influencer/payments)
   - Message brands/agencies (/influencer/messages)
```

## 🎨 Design System

### Color Palette (Vibrant & Modern)
- **Primary**: Deep Purple (#9E5FDB) - Main CTAs
- **Secondary**: Bright Blue (#4DA6FF) - Secondary actions
- **Accent**: Energetic Red (#FF2D55) - Highlights & alerts
- **Background**: Clean White (#FFFFFF) / Dark (#2B2B35)
- **Text**: Dark Charcoal (#2B2B35) / Light (#F5F5F7)

### Typography
- **Font**: Inter (400, 500, 600, 700, 800, 900 weights)
- **Headings**: Bold (700-900 weight)
- **Body**: Regular (400-500 weight)

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Common Values**: 4px, 8px, 16px, 24px, 32px, 48px

### Border Radius
- **Default**: 0.75rem (12px)
- **Small**: 0.5rem (8px)
- **Large**: 1rem (16px)

## 📱 Responsive Design

All components and pages are mobile-first:

```
Mobile (< 640px)
├── Single column layouts
├── Full-width buttons
├── Stacked cards
└── Hamburger menu (future)

Tablet (640px - 1024px)
├── Two column layouts
├── Inline buttons
└── Grid cards

Desktop (> 1024px)
├── Three+ column layouts
├── Full responsive grids
└── Side-by-side panels
```

## 🔄 State Management

Currently using:
- **localStorage**: For demo user authentication
- **React State**: For form handling and UI state
- **React Context**: Ready to add for global state (user, theme, etc.)

Ready to integrate:
- **React Query**: For API data fetching
- **Redux/Zustand**: For complex state management
- **Jotai/Recoil**: For atomic state management

## 🔗 Routing Structure

```
App.tsx (Main routing hub)
├── Public Routes
│   ├── / → Index
│   ├── /login → Login
│   └── /signup → Signup
├── Brand Routes
│   ├── /brand/dashboard → BrandDashboard
│   └── /brand/* → Placeholder
├── Agency Routes
│   ├── /agency/dashboard → AgencyDashboard
│   └── /agency/* → Placeholder
├── Influencer Routes
│   ├── /influencer/dashboard → InfluencerDashboard
│   └── /influencer/* → Placeholder
└── Catch-all
    └── * → NotFound
```

## 🚀 Performance

- **Code Splitting**: Ready to add lazy loading for routes
- **Bundle Size**: Minimal with focused dependencies
- **Build Time**: < 5s with Vite
- **Dev Server**: Hot reload for instant feedback

## 🔐 Security Considerations

- **TypeScript**: Prevents type-related bugs
- **Input Validation**: Form validation on signup/login
- **localStorage**: Currently for demo - switch to secure cookies/tokens
- **HTTPS**: Required for production
- **CORS**: Configured in Express server

## 📦 Dependencies Used

- **React 18**: UI framework
- **React Router 6**: Client-side routing
- **TailwindCSS 3**: Utility CSS
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Express**: Backend
- **Lucide React**: Icons
- **Radix UI**: Accessible primitives

## ✅ Ready to Build

All infrastructure is in place. To build new features:

1. **Pages**: Create component in `client/pages/`
2. **Routes**: Add to `App.tsx` routes
3. **Components**: Use micro components from `client/components/micro/`
4. **Styling**: Use TailwindCSS classes
5. **Types**: Add to `shared/api.ts` if needed

The system is designed for rapid feature development while maintaining consistency.
