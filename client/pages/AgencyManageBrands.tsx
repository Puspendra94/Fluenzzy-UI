import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/micro";
import { Plus, Upload } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  industry: string;
  pastCampaigns: number;
  budget: string;
  rating: number;
}

const mockBrands: Brand[] = [
  {
    id: "1",
    name: "TechCorp Inc.",
    industry: "Technology",
    pastCampaigns: 5,
    budget: "$50,000 - $100,000",
    rating: 4.8,
  },
  {
    id: "2",
    name: "StyleBrand Co.",
    industry: "Fashion",
    pastCampaigns: 3,
    budget: "$25,000 - $50,000",
    rating: 4.6,
  },
  {
    id: "3",
    name: "GlowBeauty",
    industry: "Beauty & Wellness",
    pastCampaigns: 8,
    budget: "$75,000 - $150,000",
    rating: 4.9,
  },
  {
    id: "4",
    name: "FitLife Gym",
    industry: "Fitness",
    pastCampaigns: 2,
    budget: "$15,000 - $30,000",
    rating: 4.5,
  },
];

export default function AgencyManageBrands() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="agency" />

      <div className="flex-grow flex">
        <Sidebar userRole="agency" />

        <main className="flex-grow">
          <Container className="py-8">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Manage Brands
                  </h1>
                  <p className="text-foreground/60 mt-2">
                    Add and manage brands you work with
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowUpload(!showUpload)}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Import CSV
                  </Button>
                  <Button>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Brand
                  </Button>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            {showUpload && (
              <Card className="mb-8 border-primary/30">
                <CardHeader>
                  <CardTitle>Import Brands from File</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                      <Upload className="w-10 h-10 text-primary mx-auto mb-2" />
                      <p className="text-foreground font-medium">
                        Drag and drop your CSV or Excel file
                      </p>
                      <p className="text-sm text-foreground/60 mt-1">
                        or click to browse
                      </p>
                    </div>
                    <p className="text-sm text-foreground/70">
                      CSV should include: Name, Industry, Past Campaigns, Budget Range
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowUpload(false)}>
                        Cancel
                      </Button>
                      <Button>Import Brands</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Brands List */}
            <div>
              <p className="text-sm text-foreground/60 mb-4">
                {mockBrands.length} brands in your network
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {mockBrands.map((brand) => (
                  <Card key={brand.id} hoverable>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{brand.name}</CardTitle>
                          <p className="text-sm text-foreground/60 mt-1">
                            {brand.industry}
                          </p>
                        </div>
                        <Badge variant="primary">★ {brand.rating}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">Past Campaigns:</span>
                        <span className="font-semibold">{brand.pastCampaigns}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/70">Budget Range:</span>
                        <span className="font-semibold">{brand.budget}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" fullWidth>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" fullWidth>
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
