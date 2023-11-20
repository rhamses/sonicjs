import { html } from "hono/html"

interface tableWrapperData {
  children?: any
}

export const TableWrapper = (props: tableWrapperData) => html`
<div class="flex flex-col">
  ${props.children}
</div>`