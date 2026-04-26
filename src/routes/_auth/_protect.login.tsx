import { Navigate, createFileRoute } from "@tanstack/react-router";
import Login from "../../pages/auth/Login";
import useSession from "../../hooks/useSession";
import VerifyingAuth from "../../Reusables/VerifyingAuth";

export const Route = createFileRoute("/_auth/_protect/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { loading, isFetching, user } = useSession();

  if (loading || isFetching) {
    return <VerifyingAuth />;
  }

  if (user) {
    if (user.emailVerified) {
      return <Navigate to="/knowledge-base" replace />;
    }

    return <Navigate to="/signup" replace hash="login-auto-resend" />;
  }

  return <Login />;
}
