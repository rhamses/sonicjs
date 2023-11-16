import { html } from "hono/html"
import icon from "../icons"
interface navItemData {
  label: string,
  href?: string,
  icon?: string,
  children?: any,
  submenu?: string
}
export const NavItem = (props: navItemData) => html`
  <li><a 
    class="${
    (props.submenu == "true")
    ? 'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white'
    : 'group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4' 
    }" 
    :class="{ 'bg-graydark dark:bg-meta-4': (selected === 'Calendar') &amp;&amp; (page === 'calendar') }"
    href="${props.href}"
    @click="selected = (selected === 'Calendar' ? '':'Calendar')" 
    >
    ${icon(props.icon)}
    ${props.label}
  </a></li>
  ${props.children}
`