import Login from "@/pages/auth/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dev-secret-backdoor/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
