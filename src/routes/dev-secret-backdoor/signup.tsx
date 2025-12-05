import { createFileRoute } from "@tanstack/react-router";
import Signup from "../../pages/auth/Signup";

export const Route = createFileRoute("/dev-secret-backdoor/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Signup />;
}
