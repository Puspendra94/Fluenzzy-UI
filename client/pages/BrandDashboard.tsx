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
                      id: "1",
                      name: "Summer Collection 2024",
                      status: "active",
                      budget: "5000",
                      deadline: "2024-08-31",
                    },
                    {
                      id: "2",
                      name: "Fall Fashion Week",
                      status: "active",
                      budget: "8000",
                      deadline: "2024-09-15",
                    },
                  ].map((campaign) => (
                    <Link key={campaign.id} to={`/brand/campaigns/${campaign.id}`}>
                      <Card hoverable>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{campaign.name}</CardTitle>
                              <p className="text-sm text-foreground/60 mt-1">
                                Budget: ${parseInt(campaign.budget).toLocaleString()}
                              </p>
                            </div>
                            <Badge variant={campaign.status === "active" ? "primary" : "secondary"}>
                              {campaign.status === "active" ? "Active" : "Negotiation"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-foreground/60">
                            Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
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
