import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/systemStatus')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/systemStatus"!</div>
}
