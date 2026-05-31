import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm hover:shadow-md",
  outline:
    "border-2 border-primary text-primary hover:bg-primary/5 bg-transparent",
  ghost: "text-foreground hover:bg-muted/50 bg-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = ({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  fullWidth = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
};
