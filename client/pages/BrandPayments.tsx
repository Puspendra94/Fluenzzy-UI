import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardContent, Button } from "@/components/micro";
import {
  CreditCard,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Payment {
  id: string;
  recipientName: string;
  recipientType: "influencer" | "agency";
  amount: number;
  status: "completed" | "pending" | "processing" | "failed";
  date: string;
  dueDate?: string;
  campaignName: string;
  method: string;
  transactionId?: string;
  description: string;
}

const mockPayments: Payment[] = [
  {
    id: "PAY001",
    recipientName: "Alex Johnson (@alexjohnson)",
    recipientType: "influencer",
    amount: 2500,
    status: "completed",
    date: "2024-01-15",
    campaignName: "Summer Collection 2024",
    method: "Bank Transfer",
    transactionId: "TXN-2024-001",
    description: "Content delivery & promotion",
  },
  {
    id: "PAY002",
    recipientName: "Creative Minds Agency",
    recipientType: "agency",
    amount: 5000,
    status: "processing",
    date: "2024-01-14",
    campaignName: "Fall Fashion Week",
    method: "Bank Transfer",
    description: "Campaign management and influencer coordination",
  },
  {
    id: "PAY003",
    recipientName: "Sarah Chen (@sarahchenart)",
    recipientType: "influencer",
    amount: 1800,
    status: "pending",
    date: "2024-01-10",
    dueDate: "2024-01-20",
    campaignName: "Summer Collection 2024",
    method: "PayPal",
    description: "Photo content package",
  },
  {
    id: "PAY004",
    recipientName: "Digital Growth Co",
    recipientType: "agency",
    amount: 8000,
    status: "completed",
    date: "2024-01-08",
    campaignName: "Tech Product Launch",
    method: "Bank Transfer",
    transactionId: "TXN-2024-002",
    description: "Full campaign management",
  },
  {
    id: "PAY005",
    recipientName: "Mike Davis (@mikedavis)",
    recipientType: "influencer",
    amount: 3200,
    status: "completed",
    date: "2024-01-05",
    campaignName: "Fitness Challenge",
    method: "Bank Transfer",
    transactionId: "TXN-2024-003",
    description: "30-day challenge content",
  },
  {
    id: "PAY006",
    recipientName: "Emily Rodriguez (@emilyrodriguez)",
    recipientType: "influencer",
    amount: 1500,
    status: "failed",
    date: "2024-01-01",
    campaignName: "Winter Seasonal Campaign",
    method: "Credit Card",
    description: "Video content package",
  },
  {
    id: "PAY007",
    recipientName: "BrandHub Agency",
    recipientType: "agency",
    amount: 6500,
    status: "pending",
    date: "2023-12-28",
    dueDate: "2024-01-15",
    campaignName: "Winter Campaign",
    method: "Bank Transfer",
    description: "Influencer selection & negotiation",
  },
  {
    id: "PAY008",
    recipientName: "Jessica Lee (@jessicalee)",
    recipientType: "influencer",
    amount: 2200,
    status: "completed",
    date: "2023-12-20",
    campaignName: "Holiday Season Marketing",
    method: "Bank Transfer",
    transactionId: "TXN-2024-004",
    description: "Holiday content series",
  },
];

const ITEMS_PER_PAGE = 5;

export default function BrandPayments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Payment["status"] | "all">(
    "all"
  );

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPayments = filteredPayments.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  const stats = {
    totalPaid: mockPayments
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0),
    pending: mockPayments
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0),
    processing: mockPayments
      .filter((p) => p.status === "processing")
      .reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: mockPayments.length,
  };

  const getStatusColor = (status: Payment["status"]) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const getStatusIcon = (status: Payment["status"]) => {
    const icons = {
      completed: (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ),
      pending: <Clock className="w-5 h-5 text-yellow-600" />,
      processing: <CreditCard className="w-5 h-5 text-blue-600" />,
      failed: <AlertCircle className="w-5 h-5 text-red-600" />,
    };
    return icons[status];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow">
          <Container className="py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Payments
              </h1>
              <p className="text-foreground/60">
                Manage and track all your campaign payments
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">
                        Total Paid
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        ${stats.totalPaid.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">
                        Pending
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        ${stats.pending.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">
                        Processing
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        ${stats.processing.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">
                        Total Transactions
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.totalTransactions}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-grow relative">
                    <Search className="absolute left-3 top-3.5 w-4 h-4 text-foreground/50" />
                    <input
                      type="text"
                      placeholder="Search by recipient, campaign, or transaction ID..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                    />
                  </div>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value as any);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2.5 rounded-lg border-2 border-input bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>

                  {/* Export Button */}
                  <Button variant="outline" size="lg">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payments Table */}
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                          Transaction ID
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                          Recipient
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                          Campaign
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                          Status
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-foreground text-sm">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPayments.map((payment, idx) => (
                        <tr
                          key={payment.id}
                          className={cn(
                            "border-b border-border transition-colors hover:bg-muted/30",
                            idx === paginatedPayments.length - 1 && "border-b-0"
                          )}
                        >
                          <td className="py-4 px-4">
                            <p className="font-semibold text-foreground text-sm">
                              {payment.id}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {payment.transactionId || "—"}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-foreground text-sm">
                                {payment.recipientName}
                              </p>
                              <p className="text-xs text-foreground/60 capitalize">
                                {payment.recipientType}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-foreground">
                              {payment.campaignName}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {payment.description}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-foreground text-sm">
                              ${payment.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-foreground/60">
                              via {payment.method}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm text-foreground">
                              {new Date(payment.date).toLocaleDateString()}
                            </p>
                            {payment.dueDate && (
                              <p className="text-xs text-foreground/60">
                                Due: {new Date(payment.dueDate).toLocaleDateString()}
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(payment.status)}
                              <span
                                className={cn(
                                  "px-3 py-1 rounded-full text-xs font-medium capitalize",
                                  getStatusColor(payment.status)
                                )}
                              >
                                {payment.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-foreground/60">
                      Showing {startIdx + 1} to{" "}
                      {Math.min(startIdx + ITEMS_PER_PAGE, filteredPayments.length)} of{" "}
                      {filteredPayments.length} transactions
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {filteredPayments.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-foreground/60 mb-4">
                    No payments found matching your filters
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
