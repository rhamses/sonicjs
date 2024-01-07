import { html } from "hono/html"
interface NavWrapperData {
  children?: any
}
export const NavWrapper = (props: NavWrapperData) => html`
  <div
    class="overflow-hidden"
    :class="(selected === 'Dashboard') ? 'block' :'hidden'"
  >
    <ul class="mb-6 flex flex-col gap-1.5">
      ${props.children}
    </ul>
  </div>
`