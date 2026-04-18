import {
  Resume,
  DeviceSession,
  NotificationsResponse,
  CreateResumeResponse,
  GetResumesResponse,
  DeleteResumeResponse,
  ImportResumePdfResponse,
  SaveResumeRequest,
} from "@/types";
import { apiGet, getBackendBaseUrl } from "@/utils/api.util";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/lib/firebase";
import { QUERY_STALE_TIMES, queryKeys } from "@/lib/queryClient";

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  responseType: "json" | "blob" = "json"
): Promise<T> => {
  const apiBase = getBackendBaseUrl();

  const url = `${apiBase}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers = new Headers(options.headers ?? {});
  const isFormDataBody = options.body instanceof FormData;

  if (!isFormDataBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const defaultOptions: RequestInit = {
    headers,
    credentials: "include",
    ...options,
  };

  try {
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      defaultOptions.headers = headers;
    }

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      if (response.status === 503 && endpoint.includes("import-pdf")) {
        throw new Error(
          "Upload failed (service unavailable). The request goes through your site’s /api proxy; large uploads sometimes fail at the edge. Check hosting rewrite limits, or that the backend (e.g. Fly) is up and listening on the expected port."
        );
      }
      let errorMessage = `Request failed with status ${response.status}`;
      let errorTitle = "";
      try {
        const payload = (await response.clone().json()) as {
          message?: string;
          title?: string;
        };
        if (payload?.title) {
          errorTitle = payload.title;
        }
        if (payload?.message) {
          errorMessage = payload.message;
        } else if (payload?.title) {
          errorMessage = payload.title;
        }
      } catch {
        errorMessage =
          response.status >= 500
            ? "Something went wrong on our side. Please contact support."
            : errorMessage;
      }
      if (response.status >= 500) {
        errorMessage = "Something went wrong on our side. Please contact support.";
      }

      if (response.status === 401) {
        // Only redirect for true auth/session-expired cases.
        const normalized = `${errorTitle} ${errorMessage}`.toLowerCase();
        const isSessionAuthFailure =
          normalized.includes("session expired") ||
          normalized.includes("invalid or expired token") ||
          normalized.includes("authentication required") ||
          normalized.includes("user not authenticated") ||
          normalized.includes("no authentication provided");

        const publicAuthRoutes = [
          "/login",
          "/signup",
          "/forgot-password",
          "/reset-password",
        ];
        const currentPath = window.location.pathname;
        const isOnPublicAuthRoute = publicAuthRoutes.some(route =>
          currentPath.startsWith(route)
        );

        if (isSessionAuthFailure && !isOnPublicAuthRoute) {
          window.location.replace("/login?reason=session_expired");
          throw new Error("Session expired");
        }
      }

      throw new Error(errorMessage);
    }

    return responseType === "blob"
      ? ((await response.blob()) as unknown as T)
      : await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Device Tracking API
export const deviceApi = {
  getDevices: async () => {
    return apiRequest<{
      success: boolean;
      data: DeviceSession[];
    }>("/auth/devices", {
      method: "GET",
    });
  },
  revokeDevice: async (id: string) => {
    return apiRequest<{ success: boolean; message: string }>(
      `/auth/devices/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};

export const useGetDevices = () => {
  return useQuery({
    queryKey: queryKeys.devices(),
    queryFn: () => deviceApi.getDevices(),
    staleTime: QUERY_STALE_TIMES.devices,
  });
};

// Proposal API functions
export const proposalApi = {
  generateProposal: async (data: {
    client_name: string;
    proposal_tone: string;
    job_summary: string;
    job_title: string;
  }) => {
    return apiRequest<{ data: any }>("/ai/generate-proposal", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  refineGenerateProposal: async (data: {
    proposalId: string | undefined;
    newTone: string;
    refinementType: string;
  }) => {
    return apiRequest<{ data: any }>("/ai/refine-proposal", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Proposal API functions
export const refineProposalApi = {
  refineProposal: async (data: {
    proposalId: string;
    refinementType: string;
    newTone: string;
  }) => {
    return apiRequest<{ data: any }>("/ai/refine-proposal", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Optimizer API functions
export const optimizerApi = {
  optimizePortfolio: async (data: {
    full_name: string;
    professional_title: string;
    profile: string;
  }) => {
    return apiRequest<{ data: any }>("/ai/optimize-upwork", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Auth API functions
export const authApi = {
  login: async (idToken: string) => {
    return apiRequest<{ data: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
  },
  signup: async (idToken: string) => {
    return apiRequest<{ data: any }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
  },
  sendVerificationCode: async () => {
    return apiRequest<{ success: boolean; message?: string }>(
      "/auth/resend-verification-otp",
      {
        method: "POST",
      }
    );
  },

  verify: async (otp: string) => {
    return apiRequest<{ success: boolean; message?: string }>(
      "/auth/verify-email",
      {
        method: "POST",
        body: JSON.stringify({ otp }),
      }
    );
  },

  updateUsername: async (username: string) => {
    return apiRequest<{ success: boolean; message?: string }>(
      "/auth/update-username",
      {
        method: "POST",
        body: JSON.stringify({ username }),
      }
    );
  },
  updateProfile: async (data: {
    portfolio_link?: string;
    professional_title?: string;
  }) => {
    return apiRequest<{ success: boolean; message?: string; data?: any }>(
      "/auth/update-profile",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },
  updateProviders: async (providers: string[], idToken?: string) => {
    return apiRequest<{ success: boolean; message?: string }>(
      "/auth/update-providers",
      {
        method: "PUT",
        body: JSON.stringify({ providers, idToken }),
      }
    );
  },
};

export const useGetProposalList = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: queryKeys.proposalHistory.list(page, limit),
    queryFn: () => apiGet(`/ai/proposal-history?page=${page}&limit=${limit}`),
    staleTime: QUERY_STALE_TIMES.history,
  });
};

export const useGetProposal = (id: string) => {
  return useQuery({
    queryKey: queryKeys.proposalHistory.detail(id),
    queryFn: () => apiGet(`/ai/proposal-history/${id}`),
    enabled: !!id, // Only run query if id exists
    staleTime: QUERY_STALE_TIMES.detail,
  });
};

export const useGetOptimizerList = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: queryKeys.optimizerHistory.list(page, limit),
    queryFn: () => apiGet(`/ai/optimizer-history?page=${page}&limit=${limit}`),
    staleTime: QUERY_STALE_TIMES.history,
  });
};

export const useGetOptimizer = (id: string) => {
  return useQuery({
    queryKey: queryKeys.optimizerHistory.detail(id),
    queryFn: () => apiGet(`/ai/optimizer-history/${id}`),
    enabled: !!id, // Only run query if id exists
    staleTime: QUERY_STALE_TIMES.detail,
  });
};

// Quota API functions
export const quotaApi = {
  getQuota: async (quotaSlug: string) => {
    return apiRequest<{
      success: boolean;
      message: string;
      data: {
        quota: string;
        count: number;
        limit: string | number;
        remaining: string | number;
      };
    }>(`/ai/quota?quota=${quotaSlug}`, {
      method: "GET",
    });
  },
};

export const useGetQuota = (quotaSlug: string) => {
  return useQuery({
    queryKey: queryKeys.quota(quotaSlug),
    queryFn: () => quotaApi.getQuota(quotaSlug),
    enabled: !!quotaSlug,
    staleTime: QUERY_STALE_TIMES.quota,
  });
};

// Notification API functions
export const NOTIFICATIONS_DEFAULT_LIMIT = 20;

export const notificationApi = {
  getNotifications: async (
    limit: number = NOTIFICATIONS_DEFAULT_LIMIT,
    startAfter?: string
  ) => {
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
    });

    if (startAfter) {
      queryParams.append("startAfter", startAfter);
    }

    return apiRequest<NotificationsResponse>(
      `/notifications?${queryParams.toString()}`,
      {
        method: "GET",
      }
    );
  },

  markNotificationAsRead: async (id: string) => {
    return apiRequest<{
      title: string;
      message: string;
      status: string;
      data: null;
    }>(`/notifications/${id}/read`, {
      method: "PATCH",
    });
  },

  markAllNotificationsAsRead: async () => {
    return apiRequest<{
      title: string;
      message: string;
      status: string;
      data: {
        count: number;
      };
    }>("/notifications/read-all", {
      method: "PATCH",
    });
  },
};

export const useGetNotifications = (
  startAfter?: string
) => {
  return useQuery({
    queryKey: queryKeys.notifications.list(startAfter),
    queryFn: () =>
      notificationApi.getNotifications(NOTIFICATIONS_DEFAULT_LIMIT, startAfter),
    staleTime: QUERY_STALE_TIMES.notifications,
  });
};

export const resumeApi = {
  getResumes: async (): Promise<GetResumesResponse> => {
    return apiRequest<GetResumesResponse>("/resumes/list", {
      method: "GET",
    });
  },

  createResume: async (
    data: Partial<Resume> | SaveResumeRequest
  ): Promise<CreateResumeResponse> => {
    return apiRequest<CreateResumeResponse>("/resumes/save", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  deleteResume: async (id: string): Promise<DeleteResumeResponse> => {
    return apiRequest<DeleteResumeResponse>(`/resumes/${id}`, {
      method: "DELETE",
    });
  },

  downloadResumePdf: async (latexContent: string): Promise<Blob> => {
    return apiRequest<Blob>(
      "/latex/compile",
      {
        method: "POST",
        body: JSON.stringify({ latexContent }),
      },
      "blob"
    );
  },

  scrapeLinkedIn: async (url: string): Promise<{ data: any }> => {
    return apiRequest<{ data: any }>("/resumes/scrape-linkedin", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
  },

  importResumePdf: async (file: File): Promise<ImportResumePdfResponse> => {
    const formData = new FormData();
    formData.append("resume", file);

    return apiRequest<ImportResumePdfResponse>("/resumes/import-pdf", {
      method: "POST",
      body: formData,
    });
  },
};

export const useGetResumes = () => {
  return useQuery({
    queryKey: queryKeys.resumes.list(),
    queryFn: () => resumeApi.getResumes(),
    staleTime: QUERY_STALE_TIMES.history,
  });
};

export { apiRequest };
