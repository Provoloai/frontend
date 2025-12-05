import Signup from "@/pages/auth/Signup";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dev-secret-backdoor/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Signup />;
}
