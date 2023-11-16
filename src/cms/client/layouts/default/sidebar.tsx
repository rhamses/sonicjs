import { html } from "hono/html"
import { SidebarHeader } from "./components/sidebar/header"
import { SideBarNav } from "./components/sidebar/nav"
export const Sidebar = () => html`
<aside
  class="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
>
  ${<SidebarHeader />}
  <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
    ${<SideBarNav />}
  </div>
</aside>
`