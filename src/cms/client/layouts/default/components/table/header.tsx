import { html } from "hono/html";
interface tableHeaderProps {
  children?: any
}
export const TableHeader = (props: tableHeaderProps) => html`
  <div class="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
    ${props.children}
  </div>
`