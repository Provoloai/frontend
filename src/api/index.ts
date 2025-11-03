import { apiGet } from "@/utils/api.util";
import { useQuery } from "@tanstack/react-query";

// API base configuration
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
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
    return apiRequest<{ success: boolean; message?: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
  },
  signup: async (idToken: string) => {
    return apiRequest<{ success: boolean; message?: string }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
  },
  updateUsername: async (username: string) => {
    return apiRequest<{ success: boolean; message?: string }>("/auth/update-username", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
  },
  updateProfile: async (data: {
    portfolio_link?: string;
    professional_title?: string;
  }) => {
    return apiRequest<{ success: boolean; message?: string; data?: any }>("/auth/update-profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

export const useGetProposalList = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['proposal-history', page, limit],
    queryFn: () => apiGet(`/ai/proposal-history?page=${page}&limit=${limit}`),
  });
};

export const useGetProposal = (id: string) => {
  return useQuery({
    queryKey: ['proposal-history', id],
    queryFn: () => apiGet(`/ai/proposal-history/${id}`),
    enabled: !!id, // Only run query if id exists
  });
};

// Export the generic API request function for custom use cases
export { apiRequest };
