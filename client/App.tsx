import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrandDashboard from "./pages/BrandDashboard";
import AgencyDashboard from "./pages/AgencyDashboard";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import { PlaceholderPage } from "./pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Brand Routes */}
          <Route path="/brand/dashboard" element={<BrandDashboard />} />
          <Route
            path="/brand/discover"
            element={
              <PlaceholderPage
                title="Discover Influencers"
                description="Search and filter influencers by niche, subscriber count, and more."
                userRole="brand"
              />
            }
          />
          <Route
            path="/brand/campaigns/new"
            element={
              <PlaceholderPage
                title="Create New Campaign"
                description="Set up a new campaign brief and video preview."
                userRole="brand"
              />
            }
          />
          <Route
            path="/brand/campaigns/:id"
            element={
              <PlaceholderPage
                title="Campaign Details"
                description="View and manage your campaign details, deliverables, and payments."
                userRole="brand"
              />
            }
          />
          <Route
            path="/brand/contracts"
            element={
              <PlaceholderPage
                title="Contract Management"
                description="Review, sign, and manage your contracts."
                userRole="brand"
              />
            }
          />
          <Route
            path="/brand/payments"
            element={
              <PlaceholderPage
                title="Payments"
                description="View payment history and process new payments."
                userRole="brand"
              />
            }
          />
          <Route
            path="/brand/messages"
            element={
              <PlaceholderPage
                title="Messages"
                description="Communicate with agencies and influencers."
                userRole="brand"
              />
            }
          />

          {/* Agency Routes */}
          <Route path="/agency/dashboard" element={<AgencyDashboard />} />
          <Route
            path="/agency/brands"
            element={
              <PlaceholderPage
                title="Manage Brands"
                description="Add, edit, and manage your client brands."
                userRole="agency"
              />
            }
          />
          <Route
            path="/agency/influencers"
            element={
              <PlaceholderPage
                title="Manage Influencers"
                description="Build and manage your influencer database."
                userRole="agency"
              />
            }
          />
          <Route
            path="/agency/campaigns/new"
            element={
              <PlaceholderPage
                title="Create Campaign"
                description="Create a new campaign for a brand."
                userRole="agency"
              />
            }
          />
          <Route
            path="/agency/analytics"
            element={
              <PlaceholderPage
                title="Analytics Dashboard"
                description="Track revenue, performance, and key metrics."
                userRole="agency"
              />
            }
          />
          <Route
            path="/agency/shortlisting"
            element={
              <PlaceholderPage
                title="Influencer Shortlisting"
                description="Create shortlists and generate proposals."
                userRole="agency"
              />
            }
          />

          {/* Influencer Routes */}
          <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />
          <Route
            path="/influencer/campaigns/:id"
            element={
              <PlaceholderPage
                title="Campaign Details"
                description="View campaign details and upload deliverables."
                userRole="influencer"
              />
            }
          />
          <Route
            path="/influencer/contracts"
            element={
              <PlaceholderPage
                title="Contracts"
                description="View and sign campaign contracts."
                userRole="influencer"
              />
            }
          />
          <Route
            path="/influencer/payments"
            element={
              <PlaceholderPage
                title="Payments & Earnings"
                description="View your payment history and earnings."
                userRole="influencer"
              />
            }
          />
          <Route
            path="/influencer/messages"
            element={
              <PlaceholderPage
                title="Messages"
                description="Communicate with brands and agencies."
                userRole="influencer"
              />
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
