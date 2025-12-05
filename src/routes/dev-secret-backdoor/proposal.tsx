import { createFileRoute } from "@tanstack/react-router";
import Proposal from "../../pages/proposal/Proposal";

export const Route = createFileRoute("/dev-secret-backdoor/proposal")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Proposal />;
}
