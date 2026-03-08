import ProposalHistory from '@/old-pages/proposalHistory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_sidebarlayout/_protected/proposalHistory/$proposalId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProposalHistory />
}
