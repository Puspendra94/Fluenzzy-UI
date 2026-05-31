import { Header, Footer } from "@/components/layout";
import { Container, Button, Card, CardContent } from "@/components/micro";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowRight } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  userRole: "agency" | "brand" | "influencer";
}

export const PlaceholderPage = ({
  title,
  description,
  userRole,
}: PlaceholderProps) => {
  const dashboardLinks = {
    agency: "/agency/dashboard",
    brand: "/brand/dashboard",
    influencer: "/influencer/dashboard",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole={userRole} />

      <main className="flex-grow py-12">
        <Container>
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-12 pb-12">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
              <p className="text-foreground/60 mb-8 text-lg">{description}</p>

              <p className="text-sm text-foreground/50 mb-6">
                This page is a placeholder. Please continue prompting in the Builder.io chat to build this feature, or navigate using the links below.
              </p>

              <Link to={dashboardLinks[userRole]}>
                <Button>
                  Back to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
};
