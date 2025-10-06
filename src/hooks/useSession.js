import { useQuery } from "@tanstack/react-query";

async function fetchSession() {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/verify`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
}

export default function useSession() {
  const {
    data: user,
    isLoading: loading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  return { user, loading, isFetching, refetch };
}
