"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/use-auth";

export function SubmissionsActionBar() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-heading)]">Daftar Pengajuan</h1>
        <p className="text-sm text-gray-500">Kelola dan lihat semua status pengajuan nasabah.</p>
      </div>
      
      {user?.role === "CREDIT_ADMIN" && (
        <Link href="/submissions/create">
          <Button>+ Buat Pengajuan</Button>
        </Link>
      )}
    </div>
  );
}
