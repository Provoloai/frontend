import { onAuthStateChanged, getIdToken, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

/**
 * Get the current user's ID token
 * This token is automatically refreshed by Firebase
 */
export const getCurrentUserToken = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      // Force refresh to get a fresh token
      const token = await getIdToken(user, true);
      return token;
    } catch (error) {
      console.error("Error getting ID token:", error);
      return null;
    }
  }
  return null;
};

/**
 * Listen to authentication state changes
 * This runs whenever user signs in/out
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is authenticated:", user.uid);
      callback({ user, isAuthenticated: true });
    } else {
      console.log("User is not authenticated");
      callback({ user: null, isAuthenticated: false });
    }
  });
};

/**
 * Sign out user and clear tokens
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

/**
 * Make authenticated API requests with automatic token handling
 */
export const authenticatedFetch = async (url, options = {}) => {
  const token = await getCurrentUserToken();

  if (!token) {
    throw new Error("No authentication token available");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid - redirect to login
    window.location.href = "/login";
    throw new Error("Authentication failed");
  }

  return response;
};

/**
 * Security utilities for Firebase
 */

// Token validation
export const isTokenValid = async (user) => {
  if (!user) return false;

  try {
    const tokenResult = await user.getIdTokenResult();
    const now = Date.now() / 1000;

    // Check if token is expired
    if (tokenResult.expirationTime < now) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

// Secure local storage (avoid storing sensitive data)
export const secureStorage = {
  setItem: (key, value) => {
    // Only store non-sensitive data
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },

  getItem: (key) => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};
