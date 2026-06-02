import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardContent, Button, Badge } from "@/components/micro";
import { ArrowLeft, Edit, Copy, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "draft" | "completed";
  budget: number;
  influencers: number;
  deadline: string;
  brief: string;
  description?: string;
  startDate?: string;
  content?: string;
  deliverables?: string;
}

interface CampaignInfluencer {
  id: string;
  name: string;
  handle: string;
  status: "invited" | "accepted" | "content_submitted" | "completed";
  fee: number;
  contentDelivered: number;
  dueDate: string;
}

const mockCampaign: Campaign = {
  id: "1",
  name: "Summer Collection 2024",
  status: "active",
  budget: 5000,
  influencers: 5,
  deadline: "2024-08-31",
  startDate: "2024-06-01",
  brief: "Launch new summer clothing line with influencer partnerships",
  description:
    "We are launching our new summer collection and want to partner with influencers to promote it across various social media platforms. This campaign focuses on lifestyle content showing the products in real-world scenarios.",
  content:
    "Instagram posts, TikTok videos, Instagram Reels, and YouTube Shorts",
  deliverables:
    "5 Instagram posts, 10 TikTok videos, 5 Instagram Reels, 3 YouTube videos",
};

const mockInfluencers: CampaignInfluencer[] = [
  {
    id: "1",
    name: "Alex Johnson",
    handle: "@alexjohnson",
    status: "accepted",
    fee: 500,
    contentDelivered: 3,
    dueDate: "2024-08-15",
  },
  {
    id: "2",
    name: "Sarah Chen",
    handle: "@sarahchenart",
    status: "accepted",
    fee: 450,
    contentDelivered: 2,
    dueDate: "2024-08-20",
  },
  {
    id: "3",
    name: "Mike Davis",
    handle: "@mikedavis",
    status: "invited",
    fee: 600,
    contentDelivered: 0,
    dueDate: "2024-08-25",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    handle: "@emilyrodriguez",
    status: "content_submitted",
    fee: 550,
    contentDelivered: 5,
    dueDate: "2024-08-18",
  },
  {
    id: "5",
    name: "Jessica Lee",
    handle: "@jessicalee",
    status: "accepted",
    fee: 520,
    contentDelivered: 1,
    dueDate: "2024-08-22",
  },
];

export default function BrandCampaignDetails() {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [campaign] = useState(mockCampaign);
  const [influencers] = useState(mockInfluencers);

  const getStatusColor = (status: Campaign["status"]) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      completed: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };

  const getInfluencerStatusColor = (status: CampaignInfluencer["status"]) => {
    const colors = {
      invited: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      content_submitted: "bg-purple-100 text-purple-800",
      completed: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };

  const getInfluencerStatusLabel = (status: CampaignInfluencer["status"]) => {
    const labels = {
      invited: "Invited",
      accepted: "Accepted",
      content_submitted: "Content Submitted",
      completed: "Completed",
    };
    return labels[status];
  };

  const totalBudgetAllocated = influencers.reduce((sum, inf) => sum + inf.fee, 0);
  const remainingBudget = campaign.budget - totalBudgetAllocated;
  const acceptedCount = influencers.filter((inf) => inf.status !== "invited").length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow">
          <Container className="py-8">
            {/* Header with Back Button */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold text-foreground">
                      {campaign.name}
                    </h1>
                    <Badge variant="primary">{campaign.status}</Badge>
                  </div>
                  <p className="text-foreground/60">
                    Campaign ID: {campaign.id}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => navigate(`/brand/campaigns/${campaignId}/edit`)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Campaign
              </Button>
            </div>

            {/* Overview Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/60 mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${campaign.budget.toLocaleString()}
                  </p>
                  <p className="text-xs text-foreground/50 mt-2">
                    Allocated: ${totalBudgetAllocated.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/60 mb-1">Influencers</p>
                  <p className="text-2xl font-bold text-foreground">
                    {acceptedCount}/{campaign.influencers}
                  </p>
                  <p className="text-xs text-foreground/50 mt-2">
                    {acceptedCount} accepted
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/60 mb-1">Timeline</p>
                  <p className="text-sm font-bold text-foreground">
                    {campaign.startDate &&
                      new Date(campaign.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-foreground/50 mt-2">
                    to {new Date(campaign.deadline).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-foreground/60 mb-1">Remaining</p>
                  <p
                    className={cn(
                      "text-2xl font-bold",
                      remainingBudget >= 0 ? "text-green-600" : "text-red-600"
                    )}
                  >
                    ${remainingBudget.toLocaleString()}
                  </p>
                  <p className="text-xs text-foreground/50 mt-2">
                    {remainingBudget >= 0 ? "Available" : "Over budget"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Details */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Campaign Details
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        Brief
                      </h3>
                      <p className="text-foreground/70">{campaign.brief}</p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold text-foreground mb-2">
                        Description
                      </h3>
                      <p className="text-foreground/70">
                        {campaign.description}
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold text-foreground mb-2">
                        Content Type
                      </h3>
                      <p className="text-foreground/70">{campaign.content}</p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold text-foreground mb-2">
                        Deliverables
                      </h3>
                      <p className="text-foreground/70">
                        {campaign.deliverables}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-foreground mb-4">Quick Info</h3>

                  <div className="space-y-4">
                    <div className="pb-4 border-b border-border">
                      <p className="text-xs text-foreground/60 mb-1">Status</p>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium capitalize inline-block",
                          getStatusColor(campaign.status)
                        )}
                      >
                        {campaign.status}
                      </span>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-xs text-foreground/60 mb-1">
                        Start Date
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {campaign.startDate &&
                          new Date(campaign.startDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-xs text-foreground/60 mb-1">
                        Deadline
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(campaign.deadline).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-xs text-foreground/60 mb-1">
                        Days Remaining
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {Math.ceil(
                          (new Date(campaign.deadline).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </p>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <Button variant="outline" size="sm" fullWidth>
                        <Copy className="w-4 h-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm" fullWidth>
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Influencers Section */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Associated Influencers
                </h2>

                <div className="space-y-4">
                  {influencers.map((influencer) => (
                    <div
                      key={influencer.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <div>
                            <p className="font-semibold text-foreground">
                              {influencer.name}
                            </p>
                            <p className="text-sm text-foreground/60">
                              {influencer.handle}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">
                            ${influencer.fee.toLocaleString()}
                          </p>
                          <p className="text-xs text-foreground/60">
                            Due: {new Date(influencer.dueDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right min-w-[140px]">
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium inline-block",
                              getInfluencerStatusColor(influencer.status)
                            )}
                          >
                            {getInfluencerStatusLabel(influencer.status)}
                          </span>
                          <p className="text-xs text-foreground/60 mt-2">
                            {influencer.contentDelivered}/{5} items
                          </p>
                        </div>
                      </div>
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
