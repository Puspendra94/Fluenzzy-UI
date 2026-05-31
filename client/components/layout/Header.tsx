import { Link } from "react-router-dom";
import { Logo, Container, Button } from "@/components/micro";

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
  userRole?: "agency" | "brand" | "influencer";
}

export const Header = ({
  isAuthenticated = false,
  onLogout,
  userRole,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {!isAuthenticated && (
              <>
                <a
                  href="#features"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  How it Works
                </a>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-foreground/70 capitalize">
                  {userRole}
                </span>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
