import { createFileRoute } from '@tanstack/react-router'
import Error from '../pages/Error'

export const Route = createFileRoute('/error')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Error/>
}
