import {
  Resume,
  DeviceSession,
  NotificationsResponse,
  CreateResumeResponse,
  GetResumesResponse,
  DeleteResumeResponse,
  SaveResumeRequest,
} from "@/types";
import { apiGet } from "@/utils/api.util";
import { useQuery } from "@tanstack/react-query";

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  responseType: "json" | "blob" = "json"
): Promise<T> => {
  const NODE_ENV = (import.meta.env.VITE_NODE_ENV as string) || "";
  const SERVER_URL = (import.meta.env.VITE_SERVER_URL as string) || "";

  const apiBase =
    NODE_ENV === "development" && SERVER_URL
      ? SERVER_URL.replace(/\/$/, "")
      : "/api";

  const url = `${apiBase}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      if (response.status === 401) {
        // Redirect to login on 401, but only if not already on a public auth route
        const publicAuthRoutes = [
          "/login",
          "/signup",
          "/forgot-password",
          "/reset-password",
          "/onboarding",
        ];
        const currentPath = window.location.pathname;

        const isOnPublicAuthRoute = publicAuthRoutes.some(route =>
          currentPath.startsWith(route)
        );

        if (!isOnPublicAuthRoute) {
          window.location.replace("/login?reason=session_expired");
          throw new Error("Session expired");
        }
      }

      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
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
    queryKey: ["devices"],
    queryFn: () => deviceApi.getDevices(),
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
  updateProviders: async (providers: string[]) => {
    return apiRequest<{ success: boolean; message?: string }>(
      "/auth/update-providers",
      {
        method: "PUT",
        body: JSON.stringify({ providers }),
      }
    );
  },
};

export const useGetProposalList = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["proposal-history", page, limit],
    queryFn: () => apiGet(`/ai/proposal-history?page=${page}&limit=${limit}`),
  });
};

export const useGetProposal = (id: string) => {
  return useQuery({
    queryKey: ["proposal-history", id],
    queryFn: () => apiGet(`/ai/proposal-history/${id}`),
    enabled: !!id, // Only run query if id exists
  });
};

export const useGetOptimizerList = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["optimizer-history", page, limit],
    queryFn: () => apiGet(`/ai/optimizer-history`),
  });
};

export const useGetOptimizer = (id: string) => {
  return useQuery({
    queryKey: ["optimizer-history", id],
    queryFn: () => apiGet(`/ai/optimizer-history/${id}`),
    enabled: !!id, // Only run query if id exists
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
    queryKey: ["quota", quotaSlug],
    queryFn: () => quotaApi.getQuota(quotaSlug),
    enabled: !!quotaSlug,
  });
};

// Notification API functions
export const notificationApi = {
  getNotifications: async (limit: number = 20, startAfter?: string) => {
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
  limit: number = 20,
  startAfter?: string
) => {
  return useQuery({
    queryKey: ["notifications", limit, startAfter],
    queryFn: () => notificationApi.getNotifications(limit, startAfter),
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
};

export { apiRequest };
