import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const Select = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  className,
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <select
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg border-2 border-input",
          "bg-background text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50",
          "transition-colors duration-200 appearance-none cursor-pointer",
          error && "border-destructive focus:border-destructive focus:ring-destructive/50",
          className
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
};
