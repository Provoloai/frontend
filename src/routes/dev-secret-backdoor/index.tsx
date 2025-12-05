import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dev-secret-backdoor/")({
  beforeLoad: () => {
    throw redirect({ to: "/dev-secret-backdoor/optimizer" });
  },
});
