import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionService, type SubmissionType } from "@/services/api";
import type { CreateSubmissionDTO } from "@/schemas/submission";

export function useCreateSubmissions() {
  const [success, setSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateSubmissionDTO) => submissionService.create(data),
    onSuccess: () => {
      setSuccess(true);
      setErrorMsg(null);

      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
    onError: (error: any) => {
      console.error(error);
      const msg = error.response?.data?.message || "Gagal membuat pengajuan. Silakan coba lagi.";
      setErrorMsg(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);
    
    const payload: CreateSubmissionDTO = {
      fullName: formData.get("fullName") as string,
      type: formData.get("type") as SubmissionType,
      amount: Number(formData.get("amount")),
      tenor: Number(formData.get("tenor")),
      monthlyIncome: Number(formData.get("monthlyIncome")),
      notes: formData.get("notes") as string,
    };

    mutation.mutate(payload);
  };

  return {
    handleSubmit,
    mutationPending: mutation.isPending,
    mutationError: mutation.isError,
    success,
    errorMsg,
  };
}
