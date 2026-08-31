import { useQuery } from "@tanstack/react-query";
import { submissionService } from "@/services/api";

export function useSubmissionDetail(id: string) {
  const { data: submission, isLoading, isError } = useQuery({
    queryKey: ["submission", id],
    queryFn: () => submissionService.getDetail(id),
  });

  return { submission, isLoading, isError };
}
