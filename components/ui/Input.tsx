import React, { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[var(--color-heading)]">
            {label}
          </label>
        )}
        <input
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
        />
        {error && <span className="text-xs text-[var(--color-rejected)]">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
