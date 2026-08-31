import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { submissionService } from "@/services/api";
import type { LoginDTO } from "@/schemas/auth";

export function useLogin() {
  const router = useRouter();
  const { login, isLoading: authLoading, token } = useAuth();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: LoginDTO) => {
      return await submissionService.login(data);
    },
    onSuccess: (data) => {
      if (data.status === "ok" && data.data?.accessToken) {
        login(data.data.accessToken);
      } else {
        setErrorMsg(data.message || "Failed to log in.");
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Invalid credentials or account inactive.";
      setErrorMsg(message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const formData = new FormData(e.currentTarget);
    const data: LoginDTO = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    mutation.mutate(data);
  };

  // Redirect if already authenticated
  React.useEffect(() => {
    if (!authLoading && token) {
      router.push("/submissions/list");
    }
  }, [token, authLoading, router]);

  return {
    handleSubmit,
    mutation,
    errorMsg,
    authLoading,
  };
}
