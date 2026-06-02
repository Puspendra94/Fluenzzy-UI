import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Button, Input, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/micro";
import { Plus, Upload, Search } from "lucide-react";

interface Influencer {
  id: string;
  name: string;
  niche: string;
  subscribers: number;
  avgViews: number;
  internalPrice: number;
  rating: number;
}

const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "Sarah Chen",
    niche: "Fashion & Lifestyle",
    subscribers: 245000,
    avgViews: 45000,
    internalPrice: 3500,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Mike Johnson",
    niche: "Technology",
    subscribers: 520000,
    avgViews: 85000,
    internalPrice: 5500,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    niche: "Beauty & Wellness",
    subscribers: 380000,
    avgViews: 62000,
    internalPrice: 4200,
    rating: 4.9,
  },
  {
    id: "4",
    name: "Rajesh Patel",
    niche: "Food & Cooking",
    subscribers: 195000,
    avgViews: 38000,
    internalPrice: 2800,
    rating: 4.7,
  },
];

export default function AgencyManageInfluencers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const filteredInfluencers = mockInfluencers.filter((inf) =>
    inf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    Manage Influencers
                  </h1>
                  <p className="text-foreground/60 mt-2">
                    Build and manage your influencer database
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
                    Add Influencer
                  </Button>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            {showUpload && (
              <Card className="mb-8 border-primary/30">
                <CardHeader>
                  <CardTitle>Import Influencers from File</CardTitle>
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
                      CSV should include: Name, Channel Link, Niche, Subscribers, Avg Views, Internal Price
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowUpload(false)}>
                        Cancel
                      </Button>
                      <Button>Import Influencers</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search influencers by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Influencers List */}
            <div>
              <p className="text-sm text-foreground/60 mb-4">
                Found {filteredInfluencers.length} influencers
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredInfluencers.map((influencer) => (
                  <Card key={influencer.id} hoverable>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{influencer.name}</CardTitle>
                          <p className="text-sm text-foreground/60 mt-1">
                            {influencer.niche}
                          </p>
                        </div>
                        <Badge variant="primary">★ {influencer.rating}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-foreground/70">Subscribers</p>
                          <p className="font-semibold">
                            {(influencer.subscribers / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div>
                          <p className="text-foreground/70">Avg Views</p>
                          <p className="font-semibold">
                            {(influencer.avgViews / 1000).toFixed(0)}K
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <p className="text-sm text-foreground/70">
                          Internal Pricing
                        </p>
                        <p className="text-lg font-semibold text-primary">
                          ${influencer.internalPrice}
                        </p>
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

              {filteredInfluencers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-foreground/60">
                    No influencers found matching your search
                  </p>
                </div>
              )}
            </div>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
