import { createFileRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";

export const Route = createFileRoute("/_v2layout")({
  component: V2Layout,
});

function V2Layout() {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#F3F4F6]">
        <Outlet />
      </main>
    </div>
  );
}
