import { createFileRoute } from "@tanstack/react-router";
import Login from "../../pages/auth/Login";

export const Route = createFileRoute("/_auth/_protect/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
