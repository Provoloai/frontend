import { createFileRoute, Outlet } from "@tanstack/react-router";
import Notifications from "@/components/sidebar/Notifications";
import Sidebar from "@/Reusables/Sidebar";

export const Route = createFileRoute("/dev-secret-backdoor")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <Notifications />
      <Outlet />
    </div>
  );
}
