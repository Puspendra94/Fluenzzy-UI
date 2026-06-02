import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/micro";
import { Upload, CheckCircle, Clock } from "lucide-react";

export default function InfluencerCampaignDetails() {
  const [demoUploaded, setDemoUploaded] = useState(false);
  const [finalUploaded, setFinalUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="influencer" />

      <div className="flex-grow flex">
        <Sidebar userRole="influencer" />

        <main className="flex-grow">
          <Container className="py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Campaign Details
              </h1>
              <p className="text-foreground/60 mt-2">
                TechCorp Inc. - Product Launch Campaign
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Campaign Brief */}
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Brief</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 leading-relaxed">
                      We're launching our new flagship product and need authentic
                      influencer testimonials. Create 2-3 short videos (30-60
                      seconds each) showcasing how you use the product in your daily
                      life. Focus on authentic reactions and genuine benefits you
                      experience. Include 1-2 unboxing moments and real usage
                      scenarios.
                    </p>
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-foreground/70">Budget</p>
                        <p className="text-xl font-semibold text-primary">$2,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/70">Deadline</p>
                        <p className="text-xl font-semibold">June 30, 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Deliverables */}
                <Card>
                  <CardHeader>
                    <CardTitle>Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Demo Video */}
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Demo Video
                          </h4>
                          <p className="text-sm text-foreground/60 mt-1">
                            First draft for brand review
                          </p>
                        </div>
                        {demoUploaded ? (
                          <Badge variant="success">Uploaded</Badge>
                        ) : (
                          <Badge>Pending</Badge>
                        )}
                      </div>

                      {!demoUploaded ? (
                        <div className="border-2 border-dashed border-primary/50 rounded-lg p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                          <p className="text-sm font-medium text-foreground">
                            Upload Demo Video
                          </p>
                          <p className="text-xs text-foreground/60 mt-1">
                            Max 500MB, MP4 format
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm text-emerald-700 dark:text-emerald-400">
                            demo_video_v1.mp4 - Uploaded
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Final Video */}
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            Final Video
                          </h4>
                          <p className="text-sm text-foreground/60 mt-1">
                            Upload after demo is approved
                          </p>
                        </div>
                        {finalUploaded ? (
                          <Badge variant="success">Uploaded</Badge>
                        ) : (
                          <Badge variant="default">Pending</Badge>
                        )}
                      </div>

                      {demoUploaded ? (
                        !finalUploaded ? (
                          <div className="border-2 border-dashed border-primary/50 rounded-lg p-6 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                            <p className="text-sm font-medium text-foreground">
                              Upload Final Video
                            </p>
                            <p className="text-xs text-foreground/60 mt-1">
                              Max 500MB, MP4 format
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm text-emerald-700 dark:text-emerald-400">
                              final_video_v1.mp4 - Uploaded
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <Clock className="w-5 h-5 text-amber-600" />
                          <span className="text-sm text-amber-700 dark:text-amber-400">
                            Waiting for demo approval
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Contract & Payment */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Contract</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="success" className="mb-3">
                        Fully Signed
                      </Badge>
                      <Button variant="outline" size="sm" fullWidth>
                        View Contract
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Payment Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="warning" className="mb-3">
                        Pending Completion
                      </Badge>
                      <p className="text-sm text-foreground/60">
                        Will be released upon final video approval
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Brand Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <p className="text-foreground/70">Name</p>
                      <p className="font-semibold">John Smith</p>
                    </div>
                    <div>
                      <p className="text-foreground/70">Email</p>
                      <p className="font-semibold">john@techcorp.com</p>
                    </div>
                    <div>
                      <p className="text-foreground/70">Phone</p>
                      <p className="font-semibold">+1 (555) 123-4567</p>
                    </div>
                    <Button size="sm" fullWidth className="mt-2">
                      Message
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-foreground/70">Demo Deadline</p>
                      <p className="font-semibold">June 20, 2024</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-foreground/70">Final Deadline</p>
                      <p className="font-semibold">June 30, 2024</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
}
