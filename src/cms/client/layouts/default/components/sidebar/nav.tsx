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
        <NavItem label="Dashboard" href="#" icon="dashboard">
          <NavWrapperSubMenu>
            <NavItem label="Ecommerce" href="#" submenu="true" />
            <NavItem label="Ecommerce" href="#" submenu="true" />
          </NavWrapperSubMenu>
        </NavItem>
        <NavItem label="Calendar" href="#" icon="calendar" />
        <NavItem label="Profile" href="#" icon="profile" />
        <NavItem label="Forms" href="#" icon="forms" />
        <NavItem label="Tables" href="#" icon="table" />
        <NavItem label="Settings" href="#" icon="settings" />
      </NavWrapper>
    </NavGroup>
  }
  ${
    <NavGroup title="OTHERS">
      <NavWrapper>
        <NavItem label="Chart" href="#" icon="chart" />
        <NavItem label="UI Elements" href="#" icon="ui-elements" />
        <NavItem label="Authentication" href="#" icon="auth" />
      </NavWrapper>
    </NavGroup>
  }
  </nav>
`