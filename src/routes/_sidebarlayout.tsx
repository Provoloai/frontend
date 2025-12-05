import { createFileRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "../Reusables/Sidebar";
import { MobilePageModal } from "../pages/MobilePageModal";
import { detectSystem } from "../utils/detectSystem.util";
import { useEffect, useState } from "react";
import UserName from "../pages/auth/UserName";
import EmailVerification from "../pages/auth/EmailVerification";
import VerifyingAuth from "../Reusables/VerifyingAuth";
import useSession from "../hooks/useSession";
import Notifications from "@/components/sidebar/Notifications";
import UnderMaintenance from "../pages/UnderMaintenance";

export const Route = createFileRoute("/_sidebarlayout")({
  component: RouteComponent,
});

function RouteComponent() {
  const [operatingSystem, setOperatingSystem] = useState<
    "android" | "ios" | "tablet" | "unknown" | null
  >(null);
  const { user, loading, isFetching } = useSession();
  const isUnderMaintenance = import.meta.env.VITE_UNDER_MAINTENANCE === "true";

  useEffect(() => {
    setOperatingSystem(detectSystem());
  }, []);

  useEffect(() => {
    if (!loading && !user && !isFetching) {
      window.location.replace("/login");
    }
  }, [loading, user, isFetching]);

  if (loading || isFetching) return <VerifyingAuth />;
  if (!user) return null;

  // Show maintenance page even for authenticated users
  if (isUnderMaintenance) return <UnderMaintenance />;

  const isMobile = operatingSystem === "android" || operatingSystem === "ios";
  const hasDisplayName = user.displayName && user.displayName.trim() !== "";
  const isEmailVerified = user.emailVerified === true;

  if (isMobile) return <MobilePageModal operatingSystem={operatingSystem} />;

  if (!isEmailVerified) return <EmailVerification />;

  if (!hasDisplayName) return <UserName />;

  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar />
      <Notifications />
      <Outlet />
    </div>
  );
}
