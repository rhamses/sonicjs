import { html } from "hono/html";
interface tableRowProps {
  children?: any
}
export const TableRow = (props: tableRowProps) => html`
  <div class="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5">
    ${props.children}
  </div>
`