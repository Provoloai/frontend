import { createFileRoute } from "@tanstack/react-router";
import Learn from "../../pages/provolo-learn/Learn";

export const Route = createFileRoute("/dev-secret-backdoor/learn")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Learn />;
}
