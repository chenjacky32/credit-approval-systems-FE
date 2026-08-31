import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionService, type StatusType } from "@/services/api";

export function useUpdateSubmissionStatus(id: string, onCloseModal?: () => void) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (status: StatusType) => submissionService.updateStatus(id, status),
    onSuccess: () => {
      alert(`Status berhasil diupdate!`);
      if (onCloseModal) onCloseModal();
      queryClient.invalidateQueries({ queryKey: ["submission", id] });
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
    onError: (error: any) => {
      console.error(error);
      alert("Gagal mengupdate status.");
      if (onCloseModal) onCloseModal();
    },
  });

  return mutation;
}
