import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacyPolicy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/privacyPolicy"!</div>
}
