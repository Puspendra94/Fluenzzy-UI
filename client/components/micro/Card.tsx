import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card = ({
  children,
  className,
  hoverable = false,
  onClick,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground p-6",
        "transition-all duration-200",
        hoverable && "hover:shadow-md hover:border-primary/50 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <div className={cn("pb-4 border-b border-border", className)}>{children}</div>;
};

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <h3 className={cn("text-lg font-semibold text-foreground", className)}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={cn("pt-4", className)}>{children}</div>;
};
