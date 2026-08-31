import { useQuery } from "@tanstack/react-query";
import { submissionService, type Submission } from "@/services/api";

interface UseSubmissionsProps {
  page?: number;
  size?: number;
  status?: string;
  debouncedSearch?: string;
}

export function useSubmissions({
  page = 1,
  size = 10,
  status,
  debouncedSearch = "",
}: UseSubmissionsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["submissions", { page, size, status, search: debouncedSearch }],
    queryFn: async () => {
      const params: Record<string, any> = { page, size };
      if (status) params.status = status;
      if (debouncedSearch) params.search = debouncedSearch;
      
      return await submissionService.getList(params);
    },
  });

  return {
    submissions: data?.data as Submission[] || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
