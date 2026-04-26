import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";
import VerifyingAuth from "@/Reusables/VerifyingAuth";
import useSession from "@/hooks/useSession";

export const Route = createFileRoute("/_v2layout")({
  component: V2Layout,
});

function V2Layout() {
  const { user, loading, isFetching } = useSession();

  if (loading || isFetching) {
    return <VerifyingAuth />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="flex h-dvh">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#F3F4F6]">
        <Outlet />
      </main>
    </div>
  );
}
