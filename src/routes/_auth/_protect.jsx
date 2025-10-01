import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import useSession from "../../hooks/useSession";
import VerifyingAuth from "../../Reusables/VerifyingAuth";

export const Route = createFileRoute("/_auth/_protect")({
  component: ProtectComponent,
});

function ProtectComponent() {
  const { user, loading } = useSession();
  React.useEffect(() => {
    if (!loading && user?.userId) {
      window.location.replace("/optimizer");
    }
  }, [loading, user]);
  if (loading) return <VerifyingAuth />;
  return <Outlet />;
}
