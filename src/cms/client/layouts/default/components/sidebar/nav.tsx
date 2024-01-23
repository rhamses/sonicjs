import { NavWrapper } from "../../components/nav/wrapper"
import { NavWrapperSubMenu } from "../../components/nav/wrapper-submenu"
import { NavItem } from "../../components/nav/item"
import { NavGroup } from "../../components/nav/group"
import { pageProps } from "../../interface"
export const SideBarNav = async (props: pageProps) => { 
  return (
    <nav class="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
      <NavGroup title="MENU">
        <NavWrapper>
          <NavItem label="Dashboard" href="/client" icon="dashboard" />
          <NavItem label="Posts" href="/client/list/posts" icon="calendar">
            <NavWrapperSubMenu>
              <NavItem label="Categorias" href="/client/list/terms?type=category" submenu="true" />
              <NavItem label="Tags" href="/client/list/tags" submenu="true" />
            </NavWrapperSubMenu>
          </NavItem>
          <NavItem label="Media" href="/client/list/medias" icon="forms" />
          <NavItem label="Usuários" href="/client/list/users" icon="profile" />
        </NavWrapper>
      </NavGroup>
      <NavGroup title="Configuração">
        <NavWrapper>
          <NavItem label="Informações Gerais" href="#" icon="settings" />
        </NavWrapper>
      </NavGroup>
    </nav>
  )
}