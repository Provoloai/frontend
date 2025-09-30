import { createFileRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "../Reusables/Sidebar";
import { MobilePageModal } from "../pages/MobilePageModal";
import { detectSystem } from "../utils/detectSystem.util";
import { useEffect, useState } from "react";
import UserName from "../pages/auth/UserName";
import VerifyingAuth from "../Reusables/VerifyingAuth";
import useSession from "../hooks/useSession";

export const Route = createFileRoute("/_sidebarlayout")({
  component: RouteComponent,
});

function RouteComponent() {
  const [operatingSystem, setOperatingSystem] = useState(null);
  const { user, loading } = useSession();

  useEffect(() => {
    setOperatingSystem(detectSystem());
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      window.location.replace("/login");
    }
  }, [loading, user]);

  if (loading) return <VerifyingAuth />;
  if (!user) return null;

  const isMobile = operatingSystem === "android" || operatingSystem === "ios";
  const hasDisplayName = user.displayName && user.displayName.trim() !== "";

  if (isMobile) return <MobilePageModal operatingSystem={operatingSystem} />;

  if (!hasDisplayName) return <UserName />;

  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar />
      <Outlet />
    </div>
  );
}
