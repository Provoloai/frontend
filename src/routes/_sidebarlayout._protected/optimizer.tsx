import { createFileRoute, Outlet } from '@tanstack/react-router'
import PortfolioOptimizer from '../../old-pages/Optimizer'

export const Route = createFileRoute('/_sidebarlayout/_protected/optimizer')({
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        <PortfolioOptimizer />
        <Outlet />
    </>
}
