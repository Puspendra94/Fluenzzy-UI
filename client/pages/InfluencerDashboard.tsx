import { Header, Footer } from "@/components/layout";
import { Container, Button, Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/micro";
import { Link } from "react-router-dom";
import { Zap, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

export default function InfluencerDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="influencer" />

      <main className="flex-grow py-8">
        <Container>
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Campaign Hub
              </h1>
              <p className="text-foreground/60 mt-2">
                Manage your campaigns and earnings
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  icon: Zap,
                  label: "Active Campaigns",
                  value: "4",
                  color: "text-primary",
                },
                {
                  icon: CheckCircle,
                  label: "Completed",
                  value: "12",
                  color: "text-emerald-500",
                },
                {
                  icon: DollarSign,
                  label: "Earnings This Month",
                  value: "$3,200",
                  color: "text-secondary",
                },
                {
                  icon: AlertCircle,
                  label: "Pending Actions",
                  value: "1",
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

            {/* Active Campaigns */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Your Campaigns
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    brand: "TechCorp Inc.",
                    campaign: "Product Launch Campaign",
                    status: "Active",
                    payment: "$2,000",
                    deadline: "2024-06-30",
                  },
                  {
                    brand: "GlowBeauty",
                    campaign: "Skincare Product Review",
                    status: "Pending Delivery",
                    payment: "$1,500",
                    deadline: "2024-06-25",
                  },
                ].map((campaign, idx) => (
                  <Card key={idx} hoverable>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">
                            {campaign.campaign}
                          </CardTitle>
                          <p className="text-sm text-foreground/60 mt-1">
                            by {campaign.brand}
                          </p>
                        </div>
                        <Badge
                          variant={
                            campaign.status === "Active"
                              ? "success"
                              : "warning"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/60">Payment:</span>
                        <span className="font-semibold text-primary">
                          {campaign.payment}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/60">Deadline:</span>
                        <span className="text-foreground">{campaign.deadline}</span>
                      </div>
                      <Link to={`/influencer/campaigns/${idx + 1}`}>
                        <Button variant="outline" size="sm" fullWidth>
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment & Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/60 mb-4">
                    View your payment history and earnings tracking.
                  </p>
                  <Link to="/influencer/payments">
                    <Button variant="outline" fullWidth>
                      View Payments
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/60 mb-4">
                    Communicate with brands and agencies.
                  </p>
                  <Link to="/influencer/messages">
                    <Button variant="outline" fullWidth>
                      View Messages
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
