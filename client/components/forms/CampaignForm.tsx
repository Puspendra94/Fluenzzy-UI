import { useState } from "react";
import { Button, Input } from "@/components/micro";
import { ArrowRight, X } from "lucide-react";

interface CampaignFormProps {
  onClose: () => void;
  onSubmit: (data: CampaignFormData) => void;
}

export interface CampaignFormData {
  campaignName: string;
  brief: string;
  budget: string;
  deadline: string;
  influencers: string;
}

export const CampaignForm = ({ onClose, onSubmit }: CampaignFormProps) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    campaignName: "",
    brief: "",
    budget: "",
    deadline: "",
    influencers: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      campaignName: "",
      brief: "",
      budget: "",
      deadline: "",
      influencers: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
          <h2 className="text-2xl font-bold text-foreground">Create New Campaign</h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" fullWidth>
              Create Campaign
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
