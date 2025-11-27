import FAQs from '@/components/landing/Faqs'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/faq')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FAQs/>
}
