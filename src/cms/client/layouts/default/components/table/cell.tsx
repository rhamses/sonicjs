import { html } from "hono/html";
interface tableCellProps {
  children?: any[],
  title?: string,
  header?: boolean
}
export const TableCell = (props: tableCellProps) => {
  if (props.header) {
    return html`
      <div class="p-2.5 text-center xl:p-5">
        <h5 class="text-sm font-medium uppercase xsm:text-base">${props.title}</h5>
      </div>
    `
  } else {
    return html`
      <div class="flex items-center justify-center p-2.5 xl:p-5">
        ${props.children}
      </div>
    `
  }
}