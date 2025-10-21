import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_sidebarlayout/_protected/example')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/example"!</div>
}
