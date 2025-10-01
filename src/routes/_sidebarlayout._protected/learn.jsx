import { createFileRoute } from '@tanstack/react-router'
import Learn from '../../pages/provolo-learn/Learn'

export const Route = createFileRoute('/_sidebarlayout/_protected/learn')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Learn />
}
