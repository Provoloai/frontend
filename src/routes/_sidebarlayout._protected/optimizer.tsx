import { createFileRoute, Outlet } from '@tanstack/react-router'
import PortfolioOptimizer from '../../pages/Optimizer'

export const Route = createFileRoute('/_sidebarlayout/_protected/optimizer')({
    validateSearch: (search: Record<string, unknown>) => ({
        recordId:
            typeof search.recordId === 'string' ? search.recordId : undefined,
    }),
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        <PortfolioOptimizer />
        <Outlet />
    </>
}
