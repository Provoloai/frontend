import OptimizerHistoryPage from '@/old-pages/optimizerHistory'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_sidebarlayout/_protected/optimizerHistory/$optimizerId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <OptimizerHistoryPage />
}
