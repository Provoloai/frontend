import { createFileRoute } from '@tanstack/react-router'
import UserProfile from '../../pages/user/UserProfile'

export const Route = createFileRoute('/_sidebarlayout/_protected/userprofile')({
    component: RouteComponent,
})

function RouteComponent() {
    return <UserProfile />
}
