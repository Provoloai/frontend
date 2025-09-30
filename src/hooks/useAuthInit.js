import { useEffect } from "react";
import useAuthStore from "../stores/authStore";

export const useAuthInit = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);
};
