"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { type StatusType } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SubmissionsCreateBackLink } from "@/components/submissions/create/submissions-create-back-link";
import { SubmissionsCreateErrorAlert } from "@/components/submissions/create/submissions-create-error-alert";
import { SubmissionsDetailStatus } from "@/components/submissions/detail/submissions-detail-status";
import { SubmissionsDetailField } from "@/components/submissions/detail/submissions-detail-field";
import { useSubmissionDetail } from "@/hooks/use-submission-detail";
import { useUpdateSubmissionStatus } from "@/hooks/use-update-submission-status";
import { useAuth } from "@/hooks/use-auth";

export default function SubmissionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState<StatusType | null>(null);

  const { submission, isLoading, isError } = useSubmissionDetail(id);
  const mutation = useUpdateSubmissionStatus(id, () => setIsModalOpen(false));

  if (isLoading) return <div className="p-8">Loading detail...</div>;
  if (isError || !submission) {
    return (
      <div className="max-w-3xl mx-auto mt-6">
        <SubmissionsCreateErrorAlert message="Gagal memuat detail pengajuan." />
      </div>
    );
  }

  const handleOpenModal = (type: StatusType) => {
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (actionType) {
      mutation.mutate(actionType);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SubmissionsCreateBackLink title={`Detail Pengajuan #${id}`} />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <SubmissionsDetailStatus status={submission.status} />

        <h3 className="font-semibold text-gray-700 mb-4">Informasi Nasabah:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <SubmissionsDetailField label="Nama Lengkap" value={submission.fullName} />
          <SubmissionsDetailField label="Tipe Pengajuan" value={submission.type} />
          <SubmissionsDetailField label="Nominal Pengajuan" value={`Rp ${submission.amount.toLocaleString("id-ID")}`} />
          <SubmissionsDetailField label="Tenor" value={`${submission.tenor} Bulan`} />
          <SubmissionsDetailField label="Tagihan Per Bulan" value={`Rp ${submission.monthlyBilling.toLocaleString("id-ID")}`} />
          <SubmissionsDetailField 
            label="Tanggal Pengajuan" 
            value={new Date(submission.submittedAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })} 
          />
        </div>

        {submission.status === "SUBMIT" && user?.role === "CREDIT_ANALYST" && (
          <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex justify-end space-x-4">
            <Button 
              variant="danger" 
              onClick={() => handleOpenModal("REJECT")}
            >
              Tolak Pengajuan
            </Button>
            <Button 
              variant="success" 
              onClick={() => handleOpenModal("APPROVE")}
            >
              Setujui Pengajuan
            </Button>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Konfirmasi Persetujuan"
      >
        <p className="text-gray-600 mb-6">
          Apakah Anda yakin ingin {actionType === "APPROVE" ? "menyetujui" : "menolak"} pengajuan dari <strong>{submission?.fullName}</strong>?
        </p>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={mutation.isPending}>
            Batal
          </Button>
          <Button 
            variant={actionType === "APPROVE" ? "success" : "danger"}
            onClick={handleConfirmAction}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Memproses..." : actionType === "APPROVE" ? "Setujui" : "Tolak"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
