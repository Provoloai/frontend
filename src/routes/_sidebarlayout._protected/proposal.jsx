import { createFileRoute } from '@tanstack/react-router'
import Proposal from '../../pages/Proposal'

export const Route = createFileRoute('/_sidebarlayout/_protected/proposal')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Proposal />
}
