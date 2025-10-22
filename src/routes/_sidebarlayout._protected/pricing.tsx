import { createFileRoute } from '@tanstack/react-router'
import Pricing from '../../pages/landing/Pricing'

export const Route = createFileRoute('/_sidebarlayout/_protected/pricing')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Pricing />
}
