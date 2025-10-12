// Generic API utility functions for all API calls

const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .replace(/[<>"'&]/g, "") // Remove HTML/XML characters
    .substring(0, 100); // Limit length
};

// Generic API request function
const makeApiRequest = async (endpoint, options = {}) => {
  if (!import.meta.env.VITE_SERVER_URL) {
    throw new Error("Server configuration error");
  }

  const url = `${import.meta.env.VITE_SERVER_URL}${endpoint}`;
  
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
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
export const updateUserDisplayName = async (username) => {
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
export const refreshUserSession = async () => {
  const data = await makeApiRequest("/auth/verify");
  return data?.data || null;
};

// Generic API functions for common operations
export const apiGet = (endpoint) => makeApiRequest(endpoint);
export const apiPost = (endpoint, data) => makeApiRequest(endpoint, {
  method: "POST",
  body: JSON.stringify(data),
});
export const apiPut = (endpoint, data) => makeApiRequest(endpoint, {
  method: "PUT", 
  body: JSON.stringify(data),
});
export const apiDelete = (endpoint) => makeApiRequest(endpoint, {
  method: "DELETE",
});