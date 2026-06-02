import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Card, CardContent, Button, Input } from "@/components/micro";
import { ArrowLeft, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CampaignFormData {
  campaignName: string;
  brief: string;
  description: string;
  startDate: string;
  deadline: string;
  budget: string;
  influencers: string;
  content: string;
  deliverables: string;
}

export default function BrandCreateCampaign() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CampaignFormData>({
    campaignName: "",
    brief: "",
    description: "",
    startDate: "",
    deadline: "",
    budget: "",
    influencers: "",
    content: "",
    deliverables: "",
  });
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

    console.log("Campaign created:", formData);
    setIsSaving(false);
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
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
                  onClick={handleCancel}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Create New Campaign
                  </h1>
                  <p className="text-foreground/60 mt-1">
                    Set up a new campaign with influencer details and budget
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 max-w-3xl">
                {/* Campaign Name */}
                <Card>
                  <CardContent className="pt-6">
                    <Input
                      label="Campaign Name"
                      placeholder="e.g., Summer Collection 2024"
                      name="campaignName"
                      value={formData.campaignName}
                      onChange={handleChange}
                      required
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
                        required
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
                        required
                      />
                      <Input
                        label="Deadline"
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
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
                        required
                      />
                      <Input
                        label="Number of Influencers"
                        type="number"
                        placeholder="5"
                        name="influencers"
                        value={formData.influencers}
                        onChange={handleChange}
                        required
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
                    onClick={handleCancel}
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
                    {isSaving ? "Creating..." : "Create Campaign"}
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
