import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/micro";
import { Link } from "react-router-dom";
import { Plus, TrendingUp, Zap, AlertCircle } from "lucide-react";

export default function BrandDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow py-8">
          <Container>
            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Brand Dashboard
                  </h1>
                  <p className="text-foreground/60 mt-2">
                    Manage your campaigns and discover influencers
                  </p>
                </div>
                <Link to="/brand/campaigns/new">
                  <Button>
                    <Plus className="w-5 h-5 mr-2" />
                    New Campaign
                  </Button>
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Zap,
                    label: "Active Campaigns",
                    value: "3",
                    color: "text-primary",
                  },
                  {
                    icon: TrendingUp,
                    label: "Total Spend",
                    value: "$12,500",
                    color: "text-secondary",
                  },
                  {
                    icon: AlertCircle,
                    label: "Pending Actions",
                    value: "2",
                    color: "text-accent",
                  },
                ].map((stat, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-foreground/60">{stat.label}</p>
                          <p className="text-2xl font-bold text-foreground mt-2">
                            {stat.value}
                          </p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Campaigns Section */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Your Campaigns
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Summer Collection Launch",
                      status: "Active",
                      budget: "$5,000",
                      deadline: "2024-06-30",
                    },
                    {
                      name: "Product Awareness Campaign",
                      status: "Negotiation",
                      budget: "$3,500",
                      deadline: "2024-07-15",
                    },
                  ].map((campaign, idx) => (
                    <Card key={idx} hoverable>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{campaign.name}</CardTitle>
                            <p className="text-sm text-foreground/60 mt-1">
                              Budget: {campaign.budget}
                            </p>
                          </div>
                          <Badge variant={campaign.status === "Active" ? "success" : "warning"}>
                            {campaign.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground/60">
                          Deadline: {campaign.deadline}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
