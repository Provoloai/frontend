import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from '@/components/landing/Header'

export const Route = createFileRoute('/_layout')({
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        {/* <Header /> */}
        <Outlet />
    </>
}
