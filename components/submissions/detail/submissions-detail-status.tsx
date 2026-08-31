import { StatusType } from "@/services/api";

interface SubmissionsDetailStatusProps {
  status: StatusType;
}

export function SubmissionsDetailStatus({ status }: SubmissionsDetailStatusProps) {
  const statusColors: Record<string, string> = {
    SUBMIT: "bg-blue-100 text-blue-700",
    APPROVE: "bg-green-100 text-green-700",
    REJECT: "bg-red-100 text-red-700",
  };

  return (
    <div className="mb-6 pb-6 border-b border-[var(--color-border)] flex items-center justify-between">
      <h2 className="text-lg font-semibold text-[var(--color-heading)]">Status Pengajuan</h2>
      <span className={`px-4 py-1.5 rounded-md text-sm font-bold ${statusColors[status] || "bg-gray-100"}`}>
        {status}
      </span>
    </div>
  );
}
