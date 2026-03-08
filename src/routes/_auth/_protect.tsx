import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import useSession from "../../hooks/useSession";
import VerifyingAuth from "../../Reusables/VerifyingAuth";
import UnderMaintenance from "../../old-pages/UnderMaintenance";

export const Route = createFileRoute("/_auth/_protect")({
  component: ProtectComponent,
});

function ProtectComponent() {
  const { user, loading } = useSession();
  const isUnderMaintenance = import.meta.env.VITE_UNDER_MAINTENANCE === "true";

  React.useEffect(() => {
    if (!loading && user?.userId) {
      window.location.replace("/optimizer");
    }
  }, [loading, user]);

  if (loading) return <VerifyingAuth />;

  // Show maintenance page for unauthenticated users
  if (isUnderMaintenance) return <UnderMaintenance />;

  return <Outlet />;
}
