import { createFileRoute } from '@tanstack/react-router'
import ErrorPage from '../pages/ErrorPage'

export const Route = createFileRoute('/error')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ErrorPage/>
}
