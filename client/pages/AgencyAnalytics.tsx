import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/micro";
import { TrendingUp, Users, DollarSign, Target, BarChart3 } from "lucide-react";

export default function AgencyAnalytics() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="agency" />

      <div className="flex-grow flex">
        <Sidebar userRole="agency" />

        <main className="flex-grow">
          <Container className="py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Analytics Dashboard
              </h1>
              <p className="text-foreground/60 mt-2">
                Track your agency performance and metrics
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {[
                {
                  icon: DollarSign,
                  label: "Total Revenue",
                  value: "$125,400",
                  change: "+12.5%",
                  color: "text-primary",
                },
                {
                  icon: Target,
                  label: "Active Campaigns",
                  value: "8",
                  change: "+2",
                  color: "text-secondary",
                },
                {
                  icon: Users,
                  label: "Total Influencers",
                  value: "24",
                  change: "+5",
                  color: "text-accent",
                },
                {
                  icon: TrendingUp,
                  label: "Avg Campaign ROI",
                  value: "3.2x",
                  change: "+0.4x",
                  color: "text-emerald-500",
                },
                {
                  icon: BarChart3,
                  label: "Success Rate",
                  value: "92%",
                  change: "+3%",
                  color: "text-blue-500",
                },
              ].map((metric, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-foreground/60 uppercase">
                          {metric.label}
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-2">
                          {metric.value}
                        </p>
                        <p className="text-xs text-emerald-600 mt-1">
                          {metric.change}
                        </p>
                      </div>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Revenue Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "January", amount: "$12,500" },
                      { month: "February", amount: "$14,200" },
                      { month: "March", amount: "$18,900" },
                      { month: "April", amount: "$21,300" },
                      { month: "May", amount: "$23,100" },
                      { month: "June", amount: "$35,400" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-foreground/70">
                          {item.month}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary"
                              style={{
                                width: `${(parseInt(item.amount.slice(1)) / 35400) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-foreground">
                            {item.amount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Brands</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "TechCorp Inc.", campaigns: 5, revenue: "$42,500" },
                      { name: "GlowBeauty", campaigns: 8, revenue: "$38,200" },
                      { name: "StyleBrand", campaigns: 3, revenue: "$24,700" },
                      {
                        name: "FitLife Gym",
                        campaigns: 2,
                        revenue: "$12,300",
                      },
                    ].map((brand, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-foreground">
                            {brand.name}
                          </p>
                          <p className="text-xs text-foreground/60">
                            {brand.campaigns} campaigns
                          </p>
                        </div>
                        <span className="font-semibold text-primary">
                          {brand.revenue}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Campaign Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Budget
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          ROI
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Completion
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Tech Product Launch",
                          status: "Active",
                          budget: "$28,000",
                          roi: "3.8x",
                          completion: "75%",
                        },
                        {
                          name: "Summer Collection",
                          status: "Active",
                          budget: "$35,200",
                          roi: "4.2x",
                          completion: "90%",
                        },
                        {
                          name: "Beauty Campaign Q1",
                          status: "Completed",
                          budget: "$18,500",
                          roi: "3.1x",
                          completion: "100%",
                        },
                      ].map((campaign, idx) => (
                        <tr key={idx} className="border-b border-border last:border-b-0">
                          <td className="py-4 px-4 text-foreground">
                            {campaign.name}
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              variant={
                                campaign.status === "Active"
                                  ? "success"
                                  : "default"
                              }
                            >
                              {campaign.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 font-semibold text-foreground">
                            {campaign.budget}
                          </td>
                          <td className="py-4 px-4 font-semibold text-primary">
                            {campaign.roi}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{
                                    width: campaign.completion,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-semibold">
                                {campaign.completion}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
