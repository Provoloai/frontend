import { createFileRoute } from '@tanstack/react-router'
import Welcome from '../Reusables/Welcome'

export const Route = createFileRoute('/welcome')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Welcome />
}
