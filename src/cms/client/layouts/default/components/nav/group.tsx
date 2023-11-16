import { html } from "hono/html"
interface navGroupData {
  children?: any,
  title?: string
}
export const NavGroup = (props: navGroupData) => html`
  <div>
    <h3 class="mb-4 ml-4 text-sm font-medium text-bodydark2">${props.title}</h3>
    ${props.children}
  </div>
`