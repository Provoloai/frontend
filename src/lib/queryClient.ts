import { QueryClient } from "@tanstack/react-query";

export const QUERY_STALE_TIMES = {
  default: 2 * 60 * 1000,
  short: 60 * 1000,
  quota: 45 * 1000,
  devices: 2 * 60 * 1000,
  notifications: 60 * 1000,
  history: 5 * 60 * 1000,
  detail: 5 * 60 * 1000,
  pricing: 15 * 60 * 1000,
  session: 15 * 60 * 1000,
} as const;

export const queryKeys = {
  session: () => ["session"] as const,
  devices: {
    /** Prefix for invalidating all device-history queries */
    all: () => ["devices"] as const,
    page: (exclusiveAfter?: string) =>
      ["devices", "page", exclusiveAfter ?? "__first__"] as const,
  },
  paymentTiers: () => ["payment-tiers"] as const,
  proposalHistory: {
    all: () => ["proposal-history"] as const,
    list: (page: number, limit: number) =>
      ["proposal-history", page, limit] as const,
    detail: (id: string) => ["proposal-history", id] as const,
  },
  optimizerHistory: {
    all: () => ["optimizer-history"] as const,
    list: (page: number, limit: number) =>
      ["optimizer-history", page, limit] as const,
    detail: (id: string) => ["optimizer-history", id] as const,
  },
  quota: (quotaSlug: string) => ["quota", quotaSlug] as const,
  notifications: {
    all: () => ["notifications"] as const,
    list: (startAfter?: string) =>
      startAfter
        ? (["notifications", "list", startAfter] as const)
        : (["notifications", "list"] as const),
  },
  resumes: {
    all: () => ["resumes"] as const,
    list: () => ["resumes", "list"] as const,
  },
} as const;

export const createAppQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIMES.default,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
      },
    },
  });

export const queryClient = createAppQueryClient();
