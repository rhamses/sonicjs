import { html } from "hono/html"
import { pageProps } from "./interfaces"
export const PageWrapper = (props: pageProps) => html`
<div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
  <h4 class="mb-6 text-xl font-bold text-black dark:text-white">
    ${(props.pageName) ? props.action + " " + props.pageName : "List"}
  </h4>
  ${props.children}
</div>
`