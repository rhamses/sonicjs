import { html } from "hono/html"
import { NavWrapper } from "../../components/nav/wrapper"
import { NavWrapperSubMenu } from "../../components/nav/wrapper-submenu"
import { NavItem } from "../../components/nav/item"
import { NavGroup } from "../../components/nav/group"
export const SideBarNav = () => html`
  <nav
    class="mt-5 py-4 px-4 lg:mt-9 lg:px-6"
    x-data="{selected: $persist('Dashboard')}"
  >
  ${
    <NavGroup title="MENU">
      <NavWrapper>
        <NavItem label="Dashboard" href="/client" icon="dashboard" />
        <NavItem label="Posts" href="/client/list/posts" icon="calendar">
          <NavWrapperSubMenu>
            <NavItem label="Categorias" href="/client/list/categories" submenu="true" />
            <NavItem label="Tags" href="/client/list/tags" submenu="true" />
          </NavWrapperSubMenu>
        </NavItem>
        <NavItem label="Media" href="/client/list/medias" icon="forms" />
        <NavItem label="Usuários" href="/client/list/profiles" icon="profile" />
      </NavWrapper>
    </NavGroup>
  }
  ${
    <NavGroup title="Configuração">
      <NavWrapper>
        <NavItem label="Informações Gerais" href="#" icon="settings" />
      </NavWrapper>
    </NavGroup>
  }
  </nav>
`