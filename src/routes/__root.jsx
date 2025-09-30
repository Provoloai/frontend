import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Beta } from "../Reusables/Beta";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function RootComponent() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Beta /> */}
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error, info, reset }) => <ErrorPage error={error} info={info} reset={reset} />,
});
