import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/securitySettings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/securitySettings"!</div>
}
