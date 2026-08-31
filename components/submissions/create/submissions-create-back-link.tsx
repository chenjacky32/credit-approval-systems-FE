import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface SubmissionsCreateBackLinkProps {
  title?: string;
}

export function SubmissionsCreateBackLink({ title = "Buat Pengajuan Baru" }: SubmissionsCreateBackLinkProps) {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="sm" onClick={() => router.back()}>
        &lt; Kembali
      </Button>
      <h1 className="text-2xl font-bold text-[var(--color-heading)]">{title}</h1>
    </div>
  );
}
