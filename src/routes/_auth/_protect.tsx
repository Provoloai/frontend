import { createFileRoute, Outlet } from "@tanstack/react-router";
import UnderMaintenance from "../../old-pages/UnderMaintenance";

export const Route = createFileRoute("/_auth/_protect")({
  component: ProtectComponent,
});

function ProtectComponent() {
  const isUnderMaintenance = import.meta.env.VITE_UNDER_MAINTENANCE === "true";

  // Show maintenance page for unauthenticated users
  if (isUnderMaintenance) return <UnderMaintenance />;

  return <Outlet />;
}
