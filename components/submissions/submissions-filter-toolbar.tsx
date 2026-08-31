import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface SubmissionsFilterToolbarProps {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
}

export function SubmissionsFilterToolbar({
  search,
  setSearch,
  status,
  setStatus,
}: SubmissionsFilterToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="w-full sm:w-64">
        <Input 
          placeholder="Search by name..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <Select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { label: "All Status", value: "" },
            { label: "SUBMIT", value: "SUBMIT" },
            { label: "APPROVE", value: "APPROVE" },
            { label: "REJECT", value: "REJECT" },
          ]}
        />
      </div>
    </div>
  );
}
