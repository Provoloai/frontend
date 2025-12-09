import BlogPostSingle from '@/pages/blog-post'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blogPost/$blogpostId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BlogPostSingle />
}
