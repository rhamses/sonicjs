import { html } from "hono/html"
import { LoggedInMenu } from "./logged-in-menu"
import * as icons from "../icons"
export const ProfileHeader = () => {
  return html`
  <div class="relative" x-data="{ dropdownOpen: false }" @click.outside="dropdownOpen = false">
    <a class="flex items-center gap-4" href="#" @click.prevent="dropdownOpen = ! dropdownOpen">
      <span class="hidden text-right lg:block">
        <span class="block text-sm font-medium text-black dark:text-white">Thomas Anree</span>
        <span class="block text-xs font-medium">UX Designer</span>
      </span>

      <span class="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
        A
      </span>

      <svg :class="dropdownOpen && 'rotate-180'" class="hidden fill-current sm:block" width="12" height="8"
        viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
          fill="" />
      </svg>
    </a>
    ${<LoggedInMenu />}
  </div>
`
}