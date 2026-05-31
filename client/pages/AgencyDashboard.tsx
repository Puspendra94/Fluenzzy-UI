import { Header, Footer } from "@/components/layout";
import { Container, Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/micro";
import { Link } from "react-router-dom";
import { Plus, BarChart3, Users, TrendingUp } from "lucide-react";

export default function AgencyDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="agency" />

      <main className="flex-grow py-8">
        <Container>
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Agency Dashboard
                </h1>
                <p className="text-foreground/60 mt-2">
                  Manage brands, influencers, and campaigns
                </p>
              </div>
              <Link to="/agency/campaigns/new">
                <Button>
                  <Plus className="w-5 h-5 mr-2" />
                  New Campaign
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  icon: TrendingUp,
                  label: "Revenue This Month",
                  value: "$28,500",
                  color: "text-primary",
                },
                {
                  icon: Users,
                  label: "Active Campaigns",
                  value: "8",
                  color: "text-secondary",
                },
                {
                  icon: BarChart3,
                  label: "Total Brands",
                  value: "15",
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

            {/* Recent Campaigns */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Recent Campaigns
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Tech Brand Q2 Campaign",
                    client: "TechCorp Inc.",
                    status: "Active",
                    influencers: 5,
                  },
                  {
                    name: "Fashion Collection Launch",
                    client: "StyleBrand",
                    status: "Negotiation",
                    influencers: 3,
                  },
                  {
                    name: "Beauty Product Launch",
                    client: "GlowBeauty",
                    status: "Contract Pending",
                    influencers: 4,
                  },
                ].map((campaign, idx) => (
                  <Card key={idx} hoverable>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{campaign.name}</CardTitle>
                          <p className="text-sm text-foreground/60 mt-1">
                            {campaign.client}
                          </p>
                        </div>
                        <Badge
                          variant={
                            campaign.status === "Active"
                              ? "success"
                              : campaign.status === "Negotiation"
                                ? "warning"
                                : "default"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/60">
                        {campaign.influencers} influencers assigned
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Brands</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/60 mb-4">
                    Add, edit, or view all your client brands.
                  </p>
                  <Link to="/agency/brands">
                    <Button variant="outline" fullWidth>
                      View Brands
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Manage Influencers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/60 mb-4">
                    Build and manage your influencer database.
                  </p>
                  <Link to="/agency/influencers">
                    <Button variant="outline" fullWidth>
                      View Influencers
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/60 mb-4">
                    Track revenue, performance, and trends.
                  </p>
                  <Link to="/agency/analytics">
                    <Button variant="outline" fullWidth>
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
