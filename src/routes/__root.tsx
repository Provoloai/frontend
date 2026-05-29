import { createRootRoute, Outlet } from "@tanstack/react-router";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";

function RootComponent() {
  return <Outlet />;
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error, info, reset }) => <ErrorPage error={error} info={info} reset={reset} />,
});
