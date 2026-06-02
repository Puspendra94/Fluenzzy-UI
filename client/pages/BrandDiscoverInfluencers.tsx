import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Button, Input, Select, Card, CardContent, Badge } from "@/components/micro";
import { Search, Filter } from "lucide-react";

interface Influencer {
  id: string;
  name: string;
  niche: string;
  subscribers: number;
  avgViews: number;
  location: string;
  rating: number;
}

const mockInfluencers: Influencer[] = [
  {
    id: "1",
    name: "Sarah Chen",
    niche: "Fashion & Lifestyle",
    subscribers: 245000,
    avgViews: 45000,
    location: "Los Angeles, USA",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Mike Johnson",
    niche: "Technology & Gadgets",
    subscribers: 520000,
    avgViews: 85000,
    location: "San Francisco, USA",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    niche: "Beauty & Wellness",
    subscribers: 380000,
    avgViews: 62000,
    location: "Miami, USA",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Rajesh Patel",
    niche: "Food & Cooking",
    subscribers: 195000,
    avgViews: 38000,
    location: "Mumbai, India",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Sophia Laurent",
    niche: "Travel & Adventure",
    subscribers: 420000,
    avgViews: 71000,
    location: "Paris, France",
    rating: 4.8,
  },
  {
    id: "6",
    name: "Alex Morrison",
    niche: "Fitness & Health",
    subscribers: 310000,
    avgViews: 52000,
    location: "Toronto, Canada",
    rating: 4.6,
  },
];

const niches = [
  "All Niches",
  "Fashion & Lifestyle",
  "Technology & Gadgets",
  "Beauty & Wellness",
  "Food & Cooking",
  "Travel & Adventure",
  "Fitness & Health",
];

export default function BrandDiscoverInfluencers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All Niches");
  const [minSubscribers, setMinSubscribers] = useState("");

  const filteredInfluencers = mockInfluencers.filter((influencer) => {
    const matchesSearch = influencer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesNiche =
      selectedNiche === "All Niches" || influencer.niche === selectedNiche;
    const matchesSubscribers = minSubscribers
      ? influencer.subscribers >= parseInt(minSubscribers)
      : true;

    return matchesSearch && matchesNiche && matchesSubscribers;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow">
          <Container className="py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Discover Influencers
              </h1>
              <p className="text-foreground/60 mt-2">
                Search and filter influencers that match your campaign needs
              </p>
            </div>

            {/* Filters */}
            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Filters</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  label="Search by Name"
                  placeholder="Search influencers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Select
                  label="Niche"
                  options={niches.map((niche) => ({
                    value: niche,
                    label: niche,
                  }))}
                  value={selectedNiche}
                  onChange={setSelectedNiche}
                />

                <Input
                  label="Min Subscribers"
                  type="number"
                  placeholder="100000"
                  value={minSubscribers}
                  onChange={(e) => setMinSubscribers(e.target.value)}
                />
              </div>
            </div>

            {/* Results */}
            <div>
              <p className="text-sm text-foreground/60 mb-4">
                Found {filteredInfluencers.length} influencers
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInfluencers.map((influencer) => (
                  <Card key={influencer.id} hoverable>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {influencer.name}
                          </h3>
                          <p className="text-sm text-foreground/60 mt-1">
                            {influencer.niche}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/70">Subscribers:</span>
                            <span className="font-semibold">
                              {(influencer.subscribers / 1000).toFixed(0)}K
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/70">Avg Views:</span>
                            <span className="font-semibold">
                              {(influencer.avgViews / 1000).toFixed(0)}K
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/70">Location:</span>
                            <span className="font-semibold">
                              {influencer.location}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/70">Rating:</span>
                            <span className="font-semibold text-primary">
                              ★ {influencer.rating}
                            </span>
                          </div>
                        </div>

                        <Button variant="primary" size="sm" fullWidth>
                          Request Collaboration
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredInfluencers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-foreground/60">
                    No influencers found matching your criteria
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
