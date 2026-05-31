import { Header, Footer } from "@/components/layout";
import { Container, Button, Card, CardContent, Badge } from "@/components/micro";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, BarChart3, Shield, Smartphone, Lightbulb } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="primary">Now Live</Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Connect with{" "}
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Influencers
                  </span>{" "}
                  That Matter
                </h1>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Fluenzzy is the all-in-one platform for brands, agencies, and
                  influencers to collaborate on powerful marketing campaigns. Manage
                  contracts, payments, and performance all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/signup">
                    <Button size="lg" fullWidth>
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <button className="inline-flex items-center justify-center text-primary font-semibold hover:gap-2 transition-all">
                    Watch Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl" />
                <div className="relative text-center p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 opacity-20" />
                  <p className="text-foreground/50 font-medium">
                    Dashboard Preview Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Three User Types Section */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                For Everyone in the Creator Economy
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Designed specifically for brands, agencies, and influencers to work
                together seamlessly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "For Brands",
                  description:
                    "Discover perfect influencers, manage campaigns, and track ROI with comprehensive analytics.",
                  icon: "🎯",
                  features: [
                    "Influencer discovery & filtering",
                    "Campaign management",
                    "Performance tracking",
                    "Secure payments",
                  ],
                },
                {
                  title: "For Agencies",
                  description:
                    "Manage multiple brands and influencers while maintaining profitability with advanced tools.",
                  icon: "📊",
                  features: [
                    "Multi-brand management",
                    "Influencer database",
                    "Proposal generation",
                    "Analytics dashboard",
                  ],
                },
                {
                  title: "For Influencers",
                  description:
                    "Get discovered by brands, manage deliverables, and earn securely on your own terms.",
                  icon: "⭐",
                  features: [
                    "Campaign requests",
                    "Content delivery",
                    "Secure payments",
                    "Rating & reviews",
                  ],
                },
              ].map((userType, idx) => (
                <Card key={idx} hoverable>
                  <div className="text-4xl mb-4">{userType.icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {userType.title}
                  </h3>
                  <p className="text-foreground/70 mb-6">{userType.description}</p>
                  <ul className="space-y-2">
                    {userType.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Powerful Features Built In
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Everything you need to run successful influencer campaigns
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Smart Contract Management",
                  description:
                    "Digital contract generation, e-signature capabilities, and automated compliance tracking",
                },
                {
                  icon: Zap,
                  title: "Fast Payments",
                  description:
                    "Multi-currency payments via Razorpay with automatic tax calculation and invoicing",
                },
                {
                  icon: BarChart3,
                  title: "Analytics & Insights",
                  description:
                    "Track campaign performance, ROI, and influencer metrics in real-time",
                },
                {
                  icon: Users,
                  title: "Collaboration Tools",
                  description:
                    "Integrated chat, file sharing, and real-time notifications",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Responsive",
                  description:
                    "Access your campaigns anywhere with our fully responsive platform",
                },
                {
                  icon: Lightbulb,
                  title: "YouTube Integration",
                  description:
                    "Real-time influencer verification, metrics, and video monitoring",
                },
              ].map((feature, idx) => (
                <Card key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Simple steps to launch your first campaign
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Sign Up",
                  description: "Create your account as Brand, Agency, or Influencer",
                },
                {
                  step: "2",
                  title: "Setup Profile",
                  description: "Complete your profile with relevant information",
                },
                {
                  step: "3",
                  title: "Connect & Collaborate",
                  description: "Find partners and start managing campaigns",
                },
                {
                  step: "4",
                  title: "Track & Earn",
                  description: "Monitor progress and process secure payments",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl mx-4 md:mx-0">
          <Container>
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Transform Your Influencer Marketing?
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Join thousands of brands, agencies, and creators using Fluenzzy to
                power their campaigns
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    variant="secondary"
                    fullWidth
                    className="bg-white hover:bg-white/90"
                  >
                    Get Started for Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
