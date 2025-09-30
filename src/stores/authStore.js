import { create } from "zustand";
import { persist } from "zustand/middleware";
import { onAuthStateChanged, getIdToken, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const useAuthStore = create(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      loading: true,
      error: null,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          loading: false,
          error: null,
        }),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      // Initialize auth listener
      initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            // Extract safe user data
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              emailVerified: firebaseUser.emailVerified,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              createdAt: firebaseUser.metadata.creationTime,
              lastLoginAt: firebaseUser.metadata.lastSignInTime,
            };

            set({
              user: userData,
              isAuthenticated: true,
              loading: false,
              error: null,
            });

            console.log("User authenticated:", userData.uid);
          } else {
            set({
              user: null,
              isAuthenticated: false,
              loading: false,
              error: null,
            });

            console.log("User not authenticated");
          }
        });

        return unsubscribe;
      },

      // Get fresh ID token
      getToken: async () => {
        if (auth.currentUser) {
          try {
            return await getIdToken(auth.currentUser, true);
          } catch (error) {
            console.error("Error getting token:", error);
            set({ error: "Failed to get authentication token" });
            return null;
          }
        }
        return null;
      },

      // Sign out
      signOut: async () => {
        try {
          await signOut(auth);
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
          console.log("User signed out successfully");
        } catch (error) {
          console.error("Error signing out:", error);
          set({ error: "Failed to sign out" });
          throw error;
        }
      },

      // Clear all auth data
      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // Only persist user and auth status
    }
  )
);

export default useAuthStore;
