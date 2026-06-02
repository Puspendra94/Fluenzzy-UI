import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Button, Input, Select, Card, CardHeader, CardTitle, CardContent } from "@/components/micro";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function BrandCreateCampaign() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    campaignName: "",
    brief: "",
    budget: "",
    deadline: "",
    influencers: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Campaign created:", formData);
    navigate("/brand/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow">
          <Container className="py-8">
            <div className="max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">
                  Create New Campaign
                </h1>
                <p className="text-foreground/60 mt-2">
                  Set up a new campaign with influencer details and budget
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Campaign Name"
                      placeholder="e.g., Summer Collection 2024"
                      value={formData.campaignName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          campaignName: e.target.value,
                        })
                      }
                    />

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Campaign Brief
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                        placeholder="Describe your campaign objectives, target audience, and key messages"
                        rows={5}
                        value={formData.brief}
                        onChange={(e) =>
                          setFormData({ ...formData, brief: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Budget ($)"
                        type="number"
                        placeholder="5000"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                      />

                      <Input
                        label="Deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deadline: e.target.value,
                          })
                        }
                      />
                    </div>

                    <Input
                      label="Number of Influencers"
                      type="number"
                      placeholder="3"
                      value={formData.influencers}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          influencers: e.target.value,
                        })
                      }
                    />

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={() => navigate("/brand/dashboard")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" size="lg" fullWidth>
                        Create Campaign
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
