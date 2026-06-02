import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardContent, Button } from "@/components/micro";
import { Link } from "react-router-dom";
import { Plus, ChevronLeft, ChevronRight, Eye, Edit } from "lucide-react";
import { CampaignForm, type CampaignFormData } from "@/components/forms/CampaignForm";
import { cn } from "@/lib/utils";

interface AgencyCampaign {
  id: string;
  name: string;
  brand: string;
  status: "active" | "draft" | "completed";
  budget: number;
  influencers: number;
  deadline: string;
  brief: string;
}

const mockCampaigns: AgencyCampaign[] = [
  {
    id: "1",
    name: "Summer Collection 2024",
    brand: "Fashion Brand Co",
    status: "active",
    budget: 5000,
    influencers: 5,
    deadline: "2024-08-31",
    brief: "Launch new summer clothing line with influencer partnerships",
  },
  {
    id: "2",
    name: "Tech Product Launch",
    brand: "TechHub Inc",
    status: "active",
    budget: 12000,
    influencers: 8,
    deadline: "2024-09-15",
    brief: "Introduce new smartphone to market with top tech influencers",
  },
  {
    id: "3",
    name: "Fitness Challenge",
    brand: "FitLife Pro",
    status: "draft",
    budget: 6500,
    influencers: 6,
    deadline: "2024-11-01",
    brief: "30-day fitness challenge with influencer coaching",
  },
  {
    id: "4",
    name: "Beauty Brand Collaboration",
    brand: "GlowBeauty Ltd",
    status: "completed",
    budget: 8000,
    influencers: 10,
    deadline: "2024-04-30",
    brief: "Makeup collection collaboration with beauty influencers",
  },
  {
    id: "5",
    name: "Food & Beverage Campaign",
    brand: "Taste Innovations",
    status: "draft",
    budget: 10000,
    influencers: 12,
    deadline: "2024-11-29",
    brief: "New beverage launch with food and lifestyle influencers",
  },
  {
    id: "6",
    name: "Travel Destination",
    brand: "Wanderlust Travels",
    status: "active",
    budget: 7000,
    influencers: 7,
    deadline: "2024-01-31",
    brief: "Promote travel destination with travel and adventure influencers",
  },
];

const ITEMS_PER_PAGE = 4;

export default function AgencyCampaigns() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const totalPages = Math.ceil(mockCampaigns.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCampaigns = mockCampaigns.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  const handleCreateCampaign = (data: CampaignFormData) => {
    console.log("Campaign created:", data);
    setShowForm(false);
    // Add API call here
  };

  const getStatusColor = (status: AgencyCampaign["status"]) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      completed: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="agency" />

      <div className="flex-grow flex">
        <Sidebar userRole="agency" />

        <main className="flex-grow">
          <Container className="py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
              <p className="text-foreground/60 mt-2">
                Manage campaigns for your brands and influencers
              </p>
            </div>

            {paginatedCampaigns.length > 0 ? (
              <>
                <div className="grid gap-4">
                  {paginatedCampaigns.map((campaign) => (
                    <div key={campaign.id} className="group">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {campaign.name}
                                </h3>
                                <span
                                  className={cn(
                                    "px-3 py-1 rounded-full text-xs font-medium capitalize",
                                    getStatusColor(campaign.status)
                                  )}
                                >
                                  {campaign.status}
                                </span>
                              </div>
                              <p className="text-foreground/70 text-sm mb-2">
                                <span className="font-medium">Brand:</span>{" "}
                                {campaign.brand}
                              </p>
                              <p className="text-foreground/70 text-sm mb-4">
                                {campaign.brief}
                              </p>

                              <div className="grid grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-foreground/60">Budget</span>
                                  <p className="font-semibold text-foreground">
                                    ${campaign.budget.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-foreground/60">
                                    Influencers
                                  </span>
                                  <p className="font-semibold text-foreground">
                                    {campaign.influencers}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-foreground/60">
                                    Deadline
                                  </span>
                                  <p className="font-semibold text-foreground">
                                    {new Date(campaign.deadline).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-foreground/60">Status</span>
                                  <p className="font-semibold text-foreground">
                                    Active
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 ml-4">
                              <button className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/60 hover:text-foreground">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/60 hover:text-foreground">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8">
                    <p className="text-sm text-foreground/60">
                      Page {currentPage} of {totalPages}
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
              </>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-foreground/60 mb-4">No campaigns yet</p>
                  <Button onClick={() => setShowForm(true)} size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Campaign
                  </Button>
                </CardContent>
              </Card>
            )}
          </Container>
        </main>
      </div>

      {/* Floating Action Button */}
      {paginatedCampaigns.length > 0 && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {showForm && (
        <CampaignForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreateCampaign}
        />
      )}

      <Footer />
    </div>
  );
}
