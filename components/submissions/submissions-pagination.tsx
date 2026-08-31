import { Button } from "@/components/ui/Button";
import type { Meta } from "@/services/api";

interface SubmissionsPaginationProps {
  meta?: Meta;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export function SubmissionsPagination({ meta, setPage }: SubmissionsPaginationProps) {
  if (!meta) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        Page {meta.page} of {meta.totalPages}
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={!meta.hasPrevPage}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          disabled={!meta.hasNextPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
