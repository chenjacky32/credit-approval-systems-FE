import React, { forwardRef } from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, options, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[var(--color-heading)]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            flex h-10 w-full rounded-md border bg-[var(--color-card)] px-3 py-2 text-sm 
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-[var(--color-rejected)] focus:ring-[var(--color-rejected)]" : "border-[var(--color-border)]"}
            ${className}
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-xs text-[var(--color-rejected)]">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
