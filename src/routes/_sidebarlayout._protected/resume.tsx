import { createFileRoute } from "@tanstack/react-router";
import { Resume } from "../../pages/resume-generator/Resume";
import useSession from "@/hooks/useSession";
import { useEffect } from "react";
import VerifyingAuth from "@/Reusables/VerifyingAuth";

export const Route = createFileRoute("/_sidebarlayout/_protected/resume")({
  component: RouteComponent,
});

function RouteComponent() {
    const { user, loading } = useSession();
    useEffect(() => {
      if (!loading) {
        if (!user) {
          window.location.replace("/login");
        } else if (user?.tierId === "starter") {
          window.location.replace("/pricing");
        }
      }
    }, [loading, user]);
  
    // Always show a spinner while deciding/redirecting to avoid UI flash
    if (loading) return <VerifyingAuth />;
    if (!user || user?.tierId === "starter") return <VerifyingAuth />;

  return <Resume />;
}
