import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/micro";
import { FileText, Download, Eye } from "lucide-react";

interface Contract {
  id: string;
  influencerName: string;
  campaignName: string;
  status: "pending" | "signed_by_a" | "fully_signed";
  amount: number;
  startDate: string;
  endDate: string;
}

const mockContracts: Contract[] = [
  {
    id: "1",
    influencerName: "Sarah Chen",
    campaignName: "Summer Collection 2024",
    status: "pending",
    amount: 5000,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
  {
    id: "2",
    influencerName: "Mike Johnson",
    campaignName: "Tech Product Launch",
    status: "signed_by_a",
    amount: 8000,
    startDate: "2024-06-15",
    endDate: "2024-09-15",
  },
  {
    id: "3",
    influencerName: "Emma Rodriguez",
    campaignName: "Beauty Campaign Q3",
    status: "fully_signed",
    amount: 6500,
    startDate: "2024-07-01",
    endDate: "2024-09-30",
  },
  {
    id: "4",
    influencerName: "Rajesh Patel",
    campaignName: "Food Brand Collab",
    status: "pending",
    amount: 3500,
    startDate: "2024-06-20",
    endDate: "2024-08-20",
  },
];

const statusVariants = {
  pending: "default" as const,
  signed_by_a: "warning" as const,
  fully_signed: "success" as const,
};

const statusLabels = {
  pending: "Pending Signature",
  signed_by_a: "Signed by One Party",
  fully_signed: "Fully Signed",
};

export default function BrandManageContracts() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow">
          <Container className="py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Manage Contracts
              </h1>
              <p className="text-foreground/60 mt-2">
                Review, sign, and manage campaign contracts
              </p>
            </div>

            <div className="space-y-4">
              {mockContracts.map((contract) => (
                <Card key={contract.id} hoverable>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {contract.campaignName}
                        </CardTitle>
                        <p className="text-sm text-foreground/60 mt-1">
                          with {contract.influencerName}
                        </p>
                      </div>
                      <Badge variant={statusVariants[contract.status]}>
                        {statusLabels[contract.status]}
                      </Badge>
                    </div>
                  </CardHeader>

                  {expandedId === contract.id && (
                    <CardContent>
                      <div className="space-y-4 border-t border-border pt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-foreground/70">
                              Amount
                            </p>
                            <p className="text-xl font-semibold text-foreground">
                              ${contract.amount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/70">Period</p>
                            <p className="text-sm text-foreground">
                              {contract.startDate} to {contract.endDate}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">
                            Contract Details
                          </h4>
                          <p className="text-sm text-foreground/70">
                            This is a standard influencer marketing agreement between
                            Fluenzzy and the selected influencer. The contract includes
                            deliverables, payment terms, and timeline.
                          </p>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Contract
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                          {contract.status !== "fully_signed" && (
                            <Button size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Sign Contract
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  )}

                  <div className="px-6 py-3 border-t border-border">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === contract.id ? null : contract.id
                        )
                      }
                      className="text-sm text-primary font-semibold hover:underline"
                    >
                      {expandedId === contract.id ? "Show Less" : "Show More"}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
