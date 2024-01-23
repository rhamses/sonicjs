import { SidebarHeader } from "../components/sidebar/header"
import { SideBarNav } from "../components/sidebar/nav"
import { pageProps } from "../interface"
export const Sidebar = (props: pageProps) => { 
  return (
    <aside
      class="absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
    >
      <SidebarHeader />
      <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <SideBarNav ctx={props.ctx} d1Data={props.d1Data} />
      </div>
    </aside>
  )
}