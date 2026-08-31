import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface SubmissionsCreateActionsProps {
  isPending: boolean;
}

export function SubmissionsCreateActions({ isPending }: SubmissionsCreateActionsProps) {
  const router = useRouter();
  
  return (
    <div className="flex justify-end space-x-4 pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => router.back()}
        disabled={isPending}
      >
        Batal
      </Button>
      <Button 
        type="submit" 
        variant="primary"
        disabled={isPending}
      >
        {isPending ? "Menyimpan..." : "Submit Data"}
      </Button>
    </div>
  );
}
