import React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface SubmissionsInputProps {
  id: string;
  label: string;
  inputType: "input" | "textarea" | "select";
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  disabled?: boolean;
  options?: { label: string; value: string }[];
}

export function SubmissionsInput({
  id,
  label,
  inputType,
  type = "text",
  placeholder,
  required,
  min,
  disabled,
  options,
}: SubmissionsInputProps) {
  if (inputType === "select") {
    return (
      <Select 
        label={label}
        name={id}
        required={required}
        disabled={disabled}
        options={options || []}
      />
    );
  }

  if (inputType === "textarea") {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label className="text-sm font-medium text-[var(--color-heading)]">
          {label}
        </label>
        <textarea
          name={id}
          rows={4}
          disabled={disabled}
          required={required}
          className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={placeholder}
        ></textarea>
      </div>
    );
  }

  return (
    <Input 
      label={label}
      name={id}
      type={type}
      placeholder={placeholder}
      required={required}
      min={min}
      disabled={disabled}
    />
  );
}
