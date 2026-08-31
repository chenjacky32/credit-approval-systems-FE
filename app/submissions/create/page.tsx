"use client";

import { SubmissionsCreateActions } from "@/components/submissions/create/submissions-create-actions";
import { SubmissionsCreateBackLink } from "@/components/submissions/create/submissions-create-back-link";
import { SubmissionsCreateErrorAlert } from "@/components/submissions/create/submissions-create-error-alert";
import { SubmissionsCreateFormHeader } from "@/components/submissions/create/submissions-create-form-header";
import { SubmissionsCreateSuccess } from "@/components/submissions/create/submissions-create-success";
import { SubmissionsInput } from "@/components/submissions/create/submissions-input";
import { useCreateSubmissions } from "@/hooks/use-create-submissions";

export default function CreateSubmissionPage() {
  const {
    handleSubmit,
    mutationPending,
    mutationError,
    success,
    errorMsg,
  } = useCreateSubmissions();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <SubmissionsCreateBackLink />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        {success ? (
          <SubmissionsCreateSuccess />
        ) : (
          <div className="space-y-6">
            <SubmissionsCreateFormHeader />

            {(errorMsg || mutationError) && (
              <SubmissionsCreateErrorAlert
                message={errorMsg || "Terjadi kesalahan saat membuat pengajuan."}
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <SubmissionsInput
                id="fullName"
                label="Nama Lengkap Nasabah"
                inputType="input"
                placeholder="Masukkan nama lengkap"
                required
                disabled={mutationPending}
              />

              <SubmissionsInput
                id="type"
                label="Tipe Pengajuan"
                inputType="select"
                required
                disabled={mutationPending}
                options={[
                  { label: "Sepeda Motor", value: "MOTORCYCLE" },
                  { label: "Mobil", value: "CAR" },
                  { label: "Multiguna", value: "MULTIPURPOSE" },
                ]}
              />

              <SubmissionsInput
                id="amount"
                label="Nominal Pengajuan (Rp)"
                inputType="input"
                type="number"
                min="0"
                placeholder="Contoh: 10000000"
                required
                disabled={mutationPending}
              />

              <SubmissionsInput
                id="tenor"
                label="Tenor (Bulan)"
                inputType="input"
                type="number"
                min="1"
                placeholder="Contoh: 12"
                required
                disabled={mutationPending}
              />

              <SubmissionsInput
                id="monthlyIncome"
                label="Pendapatan Bulanan Nasabah (Rp)"
                inputType="input"
                type="number"
                min="0"
                placeholder="Contoh: 5000000"
                required
                disabled={mutationPending}
              />

              <SubmissionsInput
                id="notes"
                label="Catatan (Opsional)"
                inputType="textarea"
                placeholder="Tambahkan catatan jika diperlukan..."
                disabled={mutationPending}
              />

              <SubmissionsCreateActions isPending={mutationPending} />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
