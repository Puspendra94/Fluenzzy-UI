import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header, Footer } from "@/components/layout";
import { Container, Button, Input, Select } from "@/components/micro";
import { ArrowRight } from "lucide-react";

type UserRole = "agency" | "brand" | "influencer";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: "brand", label: "Brand" },
    { value: "agency", label: "Agency" },
    { value: "influencer", label: "Influencer" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!role) newErrors.role = "Please select your role";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Mock login - in real app, would call API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem(
        "user",
        JSON.stringify({
          role,
          email,
        })
      );
      navigate(`/${role}/dashboard`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow py-12">
        <Container size="sm">
          <div className="max-w-md mx-auto">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="text-foreground/60">
                Sign in to your Fluenzzy account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Select
                label="I'm signing in as"
                options={roleOptions}
                value={role || ""}
                onChange={(value) => setRole(value as UserRole)}
                error={errors.role}
                placeholder="Select your role"
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-foreground/70">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-primary hover:underline font-semibold"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </form>

            <p className="text-center text-foreground/60 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
