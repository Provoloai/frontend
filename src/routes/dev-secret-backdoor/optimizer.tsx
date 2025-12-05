import { createFileRoute } from "@tanstack/react-router";
import PortfolioOptimizer from "../../pages/Optimizer";

export const Route = createFileRoute("/dev-secret-backdoor/optimizer")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PortfolioOptimizer />;
}
