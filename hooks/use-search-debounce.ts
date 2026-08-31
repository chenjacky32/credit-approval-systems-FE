import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useSearchDebounce(delay: number = 500) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Inisialisasi state awal dari URL params (berguna jika user membagikan link / reload)
  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = React.useState(searchParams.get("search") || "");
  const [status, setStatus] = React.useState(searchParams.get("status") || "");
  const [page, setPage] = React.useState(Number(searchParams.get("page")) || 1);
  const [date, setDate] = React.useState("");

  const isInitialMount = React.useRef(true);

  // 1. Debounce untuk input search
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(handler);
  }, [search, delay]);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setPage(1);
  }, [debouncedSearch, status]);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;

    // Gunakan router.replace agar tidak menumpuk history back button
    router.replace(newUrl, { scroll: false });
  }, [debouncedSearch, status, page, pathname, router]); // searchParams dihilangkan dari dependensi agar tidak infinite loop

  return {
    search,
    setSearch,
    debouncedSearch,
    status,
    setStatus,
    page,
    setPage,
    date,
    setDate,
  };
}
