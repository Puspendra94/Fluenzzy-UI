import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardContent, Button, Input } from "@/components/micro";
import { ArrowLeft, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface CampaignFormData {
  name: string;
  brief: string;
  description: string;
  startDate: string;
  deadline: string;
  budget: string;
  influencers: string;
  content: string;
  deliverables: string;
}

const mockCampaign = {
  id: "1",
  name: "Summer Collection 2024",
  brief: "Launch new summer clothing line with influencer partnerships",
  description:
    "We are launching our new summer collection and want to partner with influencers to promote it across various social media platforms. This campaign focuses on lifestyle content showing the products in real-world scenarios.",
  startDate: "2024-06-01",
  deadline: "2024-08-31",
  budget: "5000",
  influencers: "5",
  content: "Instagram posts, TikTok videos, Instagram Reels, and YouTube Shorts",
  deliverables:
    "5 Instagram posts, 10 TikTok videos, 5 Instagram Reels, 3 YouTube videos",
};

export default function BrandCampaignEdit() {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [formData, setFormData] = useState<CampaignFormData>(mockCampaign);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Campaign updated:", formData);
    setIsSaving(false);
    navigate(`/brand/campaigns/${campaignId}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow">
          <Container className="py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(`/brand/campaigns/${campaignId}`)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Edit Campaign
                  </h1>
                  <p className="text-foreground/60 mt-1">
                    Update campaign details and settings
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Campaign Name */}
                <Card>
                  <CardContent className="pt-6">
                    <Input
                      label="Campaign Name"
                      placeholder="e.g., Summer Collection 2024"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </CardContent>
                </Card>

                {/* Brief and Description */}
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Campaign Brief
                      </label>
                      <textarea
                        name="brief"
                        placeholder="Short overview of your campaign"
                        value={formData.brief}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                      />
                    </div>

                    <div className="border-t border-border pt-6">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        placeholder="Detailed description of your campaign"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline and Budget */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      Timeline & Budget
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Start Date"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                      <Input
                        label="Deadline"
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Total Budget ($)"
                        type="number"
                        placeholder="5000"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                      />
                      <Input
                        label="Number of Influencers"
                        type="number"
                        placeholder="5"
                        name="influencers"
                        value={formData.influencers}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Content Details */}
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Content Type
                      </label>
                      <textarea
                        name="content"
                        placeholder="e.g., Instagram posts, TikTok videos, Instagram Reels"
                        value={formData.content}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                      />
                    </div>

                    <div className="border-t border-border pt-6">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Deliverables
                      </label>
                      <textarea
                        name="deliverables"
                        placeholder="e.g., 5 Instagram posts, 10 TikTok videos, 5 Instagram Reels"
                        value={formData.deliverables}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={() => navigate(`/brand/campaigns/${campaignId}`)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    disabled={isSaving}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </form>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
