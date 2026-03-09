import { createFileRoute } from "@tanstack/react-router";
import Authentication from "../../pages/auth/Signup";
import useSession from "../../hooks/useSession";
import VerifyingAuth from "../../Reusables/VerifyingAuth";

export const Route = createFileRoute("/_auth/_protect/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const { loading, isFetching, user } = useSession();
  if (loading || isFetching || user) {
    return <VerifyingAuth />;
  }
  return <Authentication />;
}
