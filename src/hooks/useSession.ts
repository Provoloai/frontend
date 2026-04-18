import { useQuery, QueryObserverResult } from "@tanstack/react-query";
import { User } from "../types";
import { apiRequest } from "@/api";
import { QUERY_STALE_TIMES, queryKeys } from "@/lib/queryClient";

async function fetchSession(): Promise<User | null> {
  try {
    const resp = await apiRequest<{ data: User }>("/auth/verify", {
      method: "GET",
      credentials: "include",
    });
    return resp?.data ?? null;
  } catch {
    // swallow errors and treat as no session
    return null;
  }
}

interface UseSessionReturn {
  user: User | null | undefined;
  loading: boolean;
  isFetching: boolean;
  refetch: () => Promise<QueryObserverResult<User | null, Error>>;
}

export default function useSession(): UseSessionReturn {
  const {
    data: user,
    isLoading: loading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: queryKeys.session(),
    queryFn: fetchSession,
    staleTime: QUERY_STALE_TIMES.session, // 15 minutes - standard session cache time
    gcTime: 60 * 60 * 1000, // 1 hour - keep in cache for a reasonable time
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return { user, loading, isFetching, refetch };
}
