import BlogPage from '@/pages/BlogPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blog')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BlogPage/>
}
