import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Sidebar from "../Reusables/Sidebar";
import useAuthStore from "../stores/authStore";
import { MobilePageModal } from "../pages/MobilePageModal";
import { detectSystem } from "../utils/detectSystem.util";
import { useEffect, useState } from "react";
import UserName from "../pages/auth/UserName";

const isAuthenticated = () => {
  // Get auth state from Zustand store
  const authData = useAuthStore.getState();
  const isAuth = authData.isAuthenticated;

  return isAuth;
};

export const Route = createFileRoute("/_sidebarlayout")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      // Clear any existing auth data
      useAuthStore.getState().clearAuth();
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [operatingSystem, setOperatingSystem] = useState(null);
  const user = useAuthStore((state) => state.user);
  
  useEffect(() => {
    const os = detectSystem();
    setOperatingSystem(os);
  }, []);
  
  const isMobile = operatingSystem === "android" || operatingSystem === "ios";
  
  // Check if user's displayName is null or empty
  const hasDisplayName = user?.displayName && user.displayName.trim() !== "";
  
  if (isMobile) {
    return <MobilePageModal operatingSystem={operatingSystem} />;
  }

  // Show UserName component if displayName is missing
  if (!hasDisplayName) {
    return <UserName />;
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50 ">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
