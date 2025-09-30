import { createFileRoute } from '@tanstack/react-router'
import { Resume } from '../../pages/resume-generator/Resume'

export const Route = createFileRoute('/_sidebarlayout/_protected/resume')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Resume />
}
