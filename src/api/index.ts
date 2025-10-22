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
  }) => {
    return apiRequest<{ data: any }>("/ai/generate-proposal", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Export the generic API request function for custom use cases
export { apiRequest };
