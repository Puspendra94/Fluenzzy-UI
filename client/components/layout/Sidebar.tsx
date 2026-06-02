import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  FileText,
  Search,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  Database,
  Eye,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarProps {
  userRole: "brand" | "agency" | "influencer";
}

export const Sidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();

  const navItems: Record<string, NavItem[]> = {
    brand: [
      {
        label: "Dashboard",
        href: "/brand/dashboard",
        icon: <Home className="w-4 h-4" />,
      },
      {
        label: "Campaigns",
        href: "/brand/campaigns/new",
        icon: <FileText className="w-4 h-4" />,
        badge: "new",
      },
      {
        label: "Discover Influencers",
        href: "/brand/discover",
        icon: <Search className="w-4 h-4" />,
      },
      {
        label: "Contracts",
        href: "/brand/contracts",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Payments",
        href: "/brand/payments",
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        label: "Messages",
        href: "/brand/messages",
        icon: <MessageSquare className="w-4 h-4" />,
      },
    ],
    agency: [
      {
        label: "Dashboard",
        href: "/agency/dashboard",
        icon: <Home className="w-4 h-4" />,
      },
      {
        label: "Brands",
        href: "/agency/brands",
        icon: <Users className="w-4 h-4" />,
      },
      {
        label: "Influencers",
        href: "/agency/influencers",
        icon: <Users className="w-4 h-4" />,
      },
      {
        label: "Campaigns",
        href: "/agency/campaigns/new",
        icon: <FileText className="w-4 h-4" />,
        badge: "new",
      },
      {
        label: "Analytics",
        href: "/agency/analytics",
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        label: "Shortlisting",
        href: "/agency/shortlisting",
        icon: <Database className="w-4 h-4" />,
      },
    ],
    influencer: [
      {
        label: "Dashboard",
        href: "/influencer/dashboard",
        icon: <Home className="w-4 h-4" />,
      },
      {
        label: "Campaigns",
        href: "/influencer/campaigns",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Contracts",
        href: "/influencer/contracts",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Payments & Earnings",
        href: "/influencer/payments",
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        label: "Messages",
        href: "/influencer/messages",
        icon: <MessageSquare className="w-4 h-4" />,
      },
    ],
  };

  const items = navItems[userRole] || [];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen">
      <nav className="p-6 space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
              "text-sidebar-foreground hover:bg-sidebar-accent/50",
              location.pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
