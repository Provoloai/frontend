import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Beta } from '../Reusables/Beta'
import Error from '../pages/Error'

export const Route = createRootRoute({
  component: () => (
    <>
      <Beta />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return <Error/>
  },
})