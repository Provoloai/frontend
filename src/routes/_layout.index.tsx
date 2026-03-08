import { createFileRoute } from '@tanstack/react-router'
import Home from '../old-pages/Home';

export const Route = createFileRoute('/_layout/')({
  component: Index,
})

function Index() {
  return <Home/>
}