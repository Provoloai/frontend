import NotificationsPage from '@/pages/NotificationsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_sidebarlayout/_protected/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NotificationsPage />
}
