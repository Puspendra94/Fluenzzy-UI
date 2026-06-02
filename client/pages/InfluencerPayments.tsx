import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/micro";
import { DollarSign, TrendingUp, Clock } from "lucide-react";

interface Transaction {
  id: string;
  campaign: string;
  amount: number;
  status: "pending" | "completed";
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    campaign: "Tech Product Launch",
    amount: 2000,
    status: "completed",
    date: "2024-06-15",
  },
  {
    id: "2",
    campaign: "Summer Collection",
    amount: 1500,
    status: "pending",
    date: "2024-07-10",
  },
  {
    id: "3",
    campaign: "Beauty Campaign Q2",
    amount: 2500,
    status: "completed",
    date: "2024-06-20",
  },
  {
    id: "4",
    campaign: "Food Brand Collab",
    amount: 1200,
    status: "pending",
    date: "2024-07-05",
  },
];

export default function InfluencerPayments() {
  const completedAmount = mockTransactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = mockTransactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="influencer" />

      <div className="flex-grow flex">
        <Sidebar userRole="influencer" />

        <main className="flex-grow">
          <Container className="py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Payments & Earnings
              </h1>
              <p className="text-foreground/60 mt-2">
                Track your earnings and payment history
              </p>
            </div>

            {/* Summary Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: DollarSign,
                  label: "Total Earned",
                  value: `$${completedAmount + pendingAmount}`,
                  color: "text-primary",
                },
                {
                  icon: TrendingUp,
                  label: "Completed",
                  value: `$${completedAmount}`,
                  color: "text-emerald-600",
                },
                {
                  icon: Clock,
                  label: "Pending",
                  value: `$${pendingAmount}`,
                  color: "text-amber-600",
                },
              ].map((stat, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
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

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Campaign
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-4 px-4 font-medium text-foreground">
                            {transaction.campaign}
                          </td>
                          <td className="py-4 px-4 font-semibold text-primary">
                            ${transaction.amount}
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {transaction.status === "completed"
                                ? "Completed"
                                : "Pending"}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-foreground/70">
                            {transaction.date}
                          </td>
                          <td className="py-4 px-4">
                            <a
                              href="#"
                              className="text-primary hover:underline text-sm font-medium"
                            >
                              View Invoice
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Chart */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "January", amount: 1200 },
                    { month: "February", amount: 1800 },
                    { month: "March", amount: 2400 },
                    { month: "April", amount: 1600 },
                    { month: "May", amount: 3200 },
                    { month: "June", amount: 4500 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-foreground/70">{item.month}</span>
                      <div className="flex items-center gap-2 flex-grow mx-4">
                        <div className="flex-grow h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{
                              width: `${(item.amount / 4500) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-primary w-12 text-right">
                        ${item.amount}
                      </span>
                    </div>
                  ))}
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
