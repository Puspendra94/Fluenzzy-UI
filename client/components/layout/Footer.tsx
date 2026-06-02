import { Container } from "@/components/micro";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <Container>
        <div className="py-12 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Fluenzzy</h4>
            <p className="text-sm text-foreground/60">
              Connect brands, agencies, and influencers for powerful marketing campaigns.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 flex items-center justify-between text-sm text-foreground/60">
          <p>&copy; 2026 Fluenzzy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
