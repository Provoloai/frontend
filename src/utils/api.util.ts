// Generic API utility functions for all API calls

const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .replace(/[<>"'&]/g, "") // Remove HTML/XML characters
    .substring(0, 100); // Limit length
};

interface ApiRequestOptions extends RequestInit {
  method?: string;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  body?: string;
}

// Generic API functions for common operations
export const apiGet = (
  endpoint: string,
  options?: ApiRequestOptions
): Promise<any> => makeApiRequest(endpoint, options);

export const apiPost = (endpoint: string, data: any): Promise<any> =>
  makeApiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const apiPut = (endpoint: string, data: any): Promise<any> =>
  makeApiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const apiDelete = (endpoint: string): Promise<any> =>
  makeApiRequest(endpoint, {
    method: "DELETE",
  });

// Generic API request function
const makeApiRequest = async (
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<any> => {
  const url = `/api${endpoint}`;

  const defaultOptions: ApiRequestOptions = {
    method: options.method || "GET",
    headers: options.headers || {
      "Content-Type": "application/json",
    },
    credentials: options.credentials || ("include" as RequestCredentials),
    body: options.body || undefined,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Request failed");
    }

    return await response.json();
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`API request failed (${endpoint}):`, error);
    }
    throw error;
  }
};

// Updates the user's username via backend API
export const updateUserDisplayName = async (username: string): Promise<any> => {
  const sanitizedUsername = sanitizeInput(username);

  if (!sanitizedUsername) {
    throw new Error("Username is required");
  }

  if (!/^[a-zA-Z0-9_\- ]{3,32}$/.test(sanitizedUsername)) {
    throw new Error(
      "Username must be 3-32 characters and contain only letters, numbers, underscores, hyphens, and spaces"
    );
  }

  return makeApiRequest("/auth/update-username", {
    method: "PUT",
    body: JSON.stringify({ username: sanitizedUsername }),
  });
};

// Refreshes user session after username update
export const refreshUserSession = async (): Promise<any> => {
  const data = await makeApiRequest("/auth/verify");
  return data?.data || null;
};
