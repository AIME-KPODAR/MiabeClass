import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/supports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/supports"!</div>
}
