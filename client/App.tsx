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
import BrandCampaigns from "./pages/BrandCampaigns";
import BrandDiscoverInfluencers from "./pages/BrandDiscoverInfluencers";
import BrandManageContracts from "./pages/BrandManageContracts";
import BrandMessages from "./pages/BrandMessages";
import BrandPayments from "./pages/BrandPayments";
import AgencyDashboard from "./pages/AgencyDashboard";
import AgencyCampaigns from "./pages/AgencyCampaigns";
import AgencyManageBrands from "./pages/AgencyManageBrands";
import AgencyManageInfluencers from "./pages/AgencyManageInfluencers";
import AgencyAnalytics from "./pages/AgencyAnalytics";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import InfluencerCampaignDetails from "./pages/InfluencerCampaignDetails";
import InfluencerPayments from "./pages/InfluencerPayments";
import InfluencerMessages from "./pages/InfluencerMessages";
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
          <Route path="/brand/discover" element={<BrandDiscoverInfluencers />} />
          <Route path="/brand/campaigns" element={<BrandCampaigns />} />
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
          <Route path="/brand/contracts" element={<BrandManageContracts />} />
          <Route path="/brand/payments" element={<BrandPayments />} />
          <Route path="/brand/messages" element={<BrandMessages />} />

          {/* Agency Routes */}
          <Route path="/agency/dashboard" element={<AgencyDashboard />} />
          <Route path="/agency/brands" element={<AgencyManageBrands />} />
          <Route path="/agency/influencers" element={<AgencyManageInfluencers />} />
          <Route path="/agency/campaigns" element={<AgencyCampaigns />} />
          <Route path="/agency/analytics" element={<AgencyAnalytics />} />
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
          <Route path="/influencer/campaigns/:id" element={<InfluencerCampaignDetails />} />
          <Route
            path="/influencer/campaigns"
            element={
              <PlaceholderPage
                title="My Campaigns"
                description="View all your assigned campaigns."
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
          <Route path="/influencer/payments" element={<InfluencerPayments />} />
          <Route path="/influencer/messages" element={<InfluencerMessages />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
