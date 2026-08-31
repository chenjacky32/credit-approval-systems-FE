interface SubmissionsDetailFieldProps {
  label: string;
  value: React.ReactNode;
}

export function SubmissionsDetailField({ label, value }: SubmissionsDetailFieldProps) {
  return (
    <div>
      <span className="block text-gray-500 mb-1">{label}</span>
      <span className="font-medium text-[var(--color-heading)]">{value}</span>
    </div>
  );
}
