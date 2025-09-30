import { createFileRoute } from "@tanstack/react-router";
import Authentication from "../../pages/auth/Signup";

export const Route = createFileRoute("/_auth/_protect/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Authentication />;
}
