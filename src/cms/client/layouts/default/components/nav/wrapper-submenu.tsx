import { html } from "hono/html"
interface NavWrapperSubMenuData {
  children?: any
}
export const NavWrapperSubMenu = (props: NavWrapperSubMenuData) => html`
<div
  class="overflow-hidden"
  :class="(selected === 'Dashboard') ? 'block' :'hidden'"
>
  <ul class="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
  ${props.children}
  </ul>
</div>
`