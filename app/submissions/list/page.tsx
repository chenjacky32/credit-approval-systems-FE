"use client";

import { SubmissionsActionBar } from "@/components/submissions/submissions-action-bar";
import { SubmissionsFilterToolbar } from "@/components/submissions/submissions-filter-toolbar";
import { SubmissionsLoading } from "@/components/submissions/submissions-loading";
import { SubmissionsError } from "@/components/submissions/submissions-error";
import { SubmissionsTable } from "@/components/submissions/submissions-table";
import { SubmissionsPagination } from "@/components/submissions/submissions-pagination";
import { useSearchDebounce } from "@/hooks/use-search-debounce";
import { useSubmissions } from "@/hooks/use-submissions";

export default function SubmissionListPage() {
  const {
    search,
    setSearch,
    status,
    setStatus,
    page,
    setPage,
    debouncedSearch,
  } = useSearchDebounce();

  const { submissions, meta, isLoading, error } = useSubmissions({
    page,
    debouncedSearch,
    status,
  });

  return (
    <div className="space-y-6">
      <SubmissionsActionBar />

      <SubmissionsFilterToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {isLoading && <SubmissionsLoading />}

      {error && <SubmissionsError />}

      {!isLoading && !error && (
        <>
          <SubmissionsTable submissions={submissions} />

          <SubmissionsPagination meta={meta} setPage={setPage} />
        </>
      )}
    </div>
  );
}
