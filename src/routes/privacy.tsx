import PrivacyPolicyPage from '@/old-pages/PrivacyPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PrivacyPolicyPage />
}
