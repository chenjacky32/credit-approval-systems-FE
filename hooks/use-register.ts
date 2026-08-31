import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { submissionService } from "@/services/api";
import type { RegisterDTO } from "@/schemas/auth";

export function useRegister() {
  const router = useRouter();
  const { isLoading: authLoading, token } = useAuth();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: RegisterDTO) => {
      return await submissionService.register(data);
    },
    onSuccess: (data) => {
      if (data.status === "ok") {
        router.push("/login");
      } else {
        setErrorMsg(data.message || "Failed to register.");
      }
    },

    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to register. Please check your data and try again.";
      setErrorMsg(message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);
    const data: RegisterDTO = {
      fullname: formData.get("fullname") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    mutation.mutate(data);
  };

  return {
    handleSubmit,
    mutation,
    errorMsg,
    authLoading,
  };
}
