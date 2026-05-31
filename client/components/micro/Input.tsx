import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = ({
  label,
  error,
  helperText,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border-2 border-input",
          "bg-background text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50",
          "transition-colors duration-200",
          error && "border-destructive focus:border-destructive focus:ring-destructive/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground mt-1">{helperText}</p>
      )}
    </div>
  );
};
