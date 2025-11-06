import VerificationPage from '@/pages/auth/Verification'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/verification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <VerificationPage />
}
