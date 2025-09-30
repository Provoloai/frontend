import { createFileRoute } from "@tanstack/react-router";
import Authentication from "../../pages/auth/Signup";
import useSession from "../../hooks/useSession";
import VerifyingAuth from "../../Reusables/VerifyingAuth";

export const Route = createFileRoute("/_auth/_protect/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const { loading } = useSession();
  if (loading) {
    return <VerifyingAuth />;
  }
  return <Authentication />;
}
