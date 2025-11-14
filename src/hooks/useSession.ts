import { useQuery } from "@tanstack/react-query";
import { User, ApiResponse } from "../types";

async function fetchSession(): Promise<User | null> {
  const res = await fetch(`/auth/verify`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return null;
  const data: ApiResponse<User> = await res.json();
  return data?.data ?? null;
}

interface UseSessionReturn {
  user: User | null | undefined;
  loading: boolean;
  isFetching: boolean;
  refetch: () => void;
}

export default function useSession(): UseSessionReturn {
  const {
    data: user,
    isLoading: loading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 15 * 60 * 1000, // 15 minutes - standard session cache time
    gcTime: 60 * 60 * 1000, // 1 hour - keep in cache for a reasonable time
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return { user, loading, isFetching, refetch };
}
