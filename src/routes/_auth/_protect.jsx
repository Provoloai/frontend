import { createFileRoute, redirect } from "@tanstack/react-router";
import useAuthStore from "../../stores/authStore";

const isAuthenticated = () => {
  // Get auth state from Zustand store
  const authData = useAuthStore.getState();
  const isAuth = authData.isAuthenticated;

  return isAuth;
};

export const Route = createFileRoute("/_auth/_protect")({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({
        to: "/optimizer",
        replace: true,
      });
    }
  },
});
