import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent" | "success" | "warning";
  className?: string;
  size?: "sm" | "md";
}

const variants = {
  default:
    "bg-muted text-muted-foreground border border-border",
  primary:
    "bg-primary/10 text-primary border border-primary/20",
  secondary:
    "bg-secondary/10 text-secondary border border-secondary/20",
  accent:
    "bg-accent/10 text-accent border border-accent/20",
  success:
    "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning:
    "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
};

const sizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

export const Badge = ({
  children,
  variant = "default",
  className,
  size = "md",
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
