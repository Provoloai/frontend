import { createFileRoute } from "@tanstack/react-router";
import Login from "../../pages/auth/Login";
import useSession from "../../hooks/useSession";
import VerifyingAuth from "../../Reusables/VerifyingAuth";

export const Route = createFileRoute("/_auth/_protect/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { loading, isFetching, user } = useSession();
  if (loading || isFetching || user) {
    return <VerifyingAuth />;
  }
  return <Login />;
}
