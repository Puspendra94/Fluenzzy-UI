import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Container, Button } from "@/components/micro";
import { Header, Footer } from "@/components/layout";
import { AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20">
        <Container>
          <div className="text-center space-y-6">
            <AlertCircle className="w-24 h-24 text-muted-foreground mx-auto opacity-50" />
            <h1 className="text-6xl md:text-7xl font-bold text-foreground">404</h1>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                Page Not Found
              </p>
              <p className="text-lg text-foreground/60 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <Link to="/">
              <Button size="lg">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
