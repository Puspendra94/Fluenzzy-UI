import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header, Footer } from "@/components/layout";
import { Container, Button, Input, Select, Card, Badge } from "@/components/micro";
import { ArrowRight, Check } from "lucide-react";

type UserRole = "agency" | "brand" | "influencer";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!selectedRole) newErrors.role = "Please select a role";
      if (!selectedCurrency) newErrors.currency = "Please select a currency";
    } else if (step === 2) {
      if (!email) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        newErrors.email = "Invalid email format";
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === 1) setStep(2);
      else if (step === 2) setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Mock signup - in real app, would call API
      localStorage.setItem(
        "user",
        JSON.stringify({
          role: selectedRole,
          currency: selectedCurrency,
          email,
        })
      );
      navigate(`/${selectedRole}/dashboard`);
    }
  };

  const roleCards: {
    role: UserRole;
    title: string;
    description: string;
    benefits: string[];
  }[] = [
    {
      role: "brand",
      title: "Brand",
      description: "Run influencer marketing campaigns",
      benefits: [
        "Discover influencers",
        "Manage campaigns",
        "Track performance",
        "Secure payments",
      ],
    },
    {
      role: "agency",
      title: "Agency",
      description: "Manage campaigns for multiple brands",
      benefits: [
        "Multi-brand dashboard",
        "Influencer management",
        "Proposal generation",
        "Advanced analytics",
      ],
    },
    {
      role: "influencer",
      title: "Influencer",
      description: "Receive and fulfill campaign requests",
      benefits: [
        "Get discovered",
        "Manage deliverables",
        "Earn money",
        "Build portfolio",
      ],
    },
  ];

  const currencyOptions = [
    { value: "INR", label: "Indian Rupee (₹)" },
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow py-12">
        <Container size="sm">
          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`h-1 w-8 md:w-16 mx-2 transition-all ${
                        step > s ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Role & Currency Selection */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Join Fluenzzy
                  </h1>
                  <p className="text-foreground/60">
                    Select your role to get started
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {roleCards.map((card) => (
                    <Card
                      key={card.role}
                      hoverable
                      onClick={() => setSelectedRole(card.role)}
                      className={`cursor-pointer transition-all ${
                        selectedRole === card.role
                          ? "ring-2 ring-primary border-primary"
                          : ""
                      }`}
                    >
                      <div className="space-y-4">
                        <div>
                          <div className="text-3xl mb-3">
                            {card.role === "brand"
                              ? "🎯"
                              : card.role === "agency"
                                ? "📊"
                                : "⭐"}
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            {card.title}
                          </h3>
                          <p className="text-sm text-foreground/60 mt-1">
                            {card.description}
                          </p>
                        </div>
                        <ul className="space-y-2">
                          {card.benefits.map((benefit, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm text-foreground/70"
                            >
                              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        {selectedRole === card.role && (
                          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                            <Check className="w-4 h-4" /> Selected
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <Select
                    label="Select your preferred currency"
                    options={currencyOptions}
                    value={selectedCurrency}
                    onChange={setSelectedCurrency}
                    error={errors.currency}
                    placeholder="Choose currency"
                  />
                </div>

                <Button onClick={handleNext} size="lg" fullWidth>
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Step 2: Email & Password */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    Create Your Account
                  </h1>
                  <p className="text-foreground/60">
                    {selectedRole === "agency"
                      ? "For your agency"
                      : selectedRole === "brand"
                        ? "For your brand"
                        : "As a content creator"}
                  </p>
                </div>

                <div className="space-y-4">
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
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    helperText="Must contain uppercase, lowercase, and numbers"
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button type="button" size="lg" fullWidth onClick={handleNext}>
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Almost There!
                    </h2>
                    <div className="space-y-2 text-foreground/70">
                      <p>
                        You're signing up as:{" "}
                        <span className="font-semibold text-foreground capitalize">
                          {selectedRole}
                        </span>
                      </p>
                      <p>
                        Currency: <span className="font-semibold text-foreground">{selectedCurrency}</span>
                      </p>
                      <p>
                        Email:{" "}
                        <span className="font-semibold text-foreground break-all">
                          {email}
                        </span>
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-4 text-sm text-foreground/60">
                  <p>
                    By signing up, you agree to our Terms of Service and Privacy
                    Policy.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <form onSubmit={handleSubmit} className="w-full">
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                    >
                      Create Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {/* Login Link */}
            <p className="text-center text-foreground/60">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
