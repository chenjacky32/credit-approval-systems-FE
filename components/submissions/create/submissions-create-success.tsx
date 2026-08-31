import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function SubmissionsCreateSuccess() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[var(--color-heading)]">Pengajuan Berhasil!</h2>
      <p className="text-gray-500 max-w-sm">
        Data pengajuan Anda telah berhasil disimpan dan diteruskan untuk diproses.
      </p>
      <div className="pt-4">
        <Link href="/submissions/list">
          <Button variant="primary">Lihat Daftar Pengajuan</Button>
        </Link>
      </div>
    </div>
  );
}
