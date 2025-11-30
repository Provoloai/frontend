import { apiGet } from "@/utils/api.util";
import { useQuery } from "@tanstack/react-query";

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
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
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
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

// Notification API types
export enum NotificationCategory {
  SYSTEM = "system",
  USER = "user",
  PROMOTION = "promotion",
  ADMIN = "admin",
  OTHER = "other",
  PROFILE = "profile",
  PROPOSAL = "proposal",
  KNOWLEDGE = "knowledge",
  COMMUNITY = "community",
  ACHIEVEMENT = "achievement",
  SUBSCRIPTION = "subscription",
  RESEARCH = "research",
}

export interface FirebaseTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface BackendNotification {
  id: string;
  recipient: string;
  title: string;
  message: string;
  read: boolean;
  category: NotificationCategory;
  createdAt: string | FirebaseTimestamp;
}

export interface NotificationsResponse {
  title: string;
  message: string;
  status: string;
  data: {
    notifications: BackendNotification[];
    lastVisibleId: string;
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    remainingPages: number;
  };
}

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
};

export const useGetNotifications = (limit: number = 20, startAfter?: string) => {
  return useQuery({
    queryKey: ["notifications", limit, startAfter],
    queryFn: () => notificationApi.getNotifications(limit, startAfter),
  });
};

// Export the generic API request function for custom use cases
export { apiRequest };
