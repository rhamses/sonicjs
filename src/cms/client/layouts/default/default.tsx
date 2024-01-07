import { html } from 'hono/html'
import { Sidebar } from './partials/sidebar'
import { Header } from "./partials/header"

interface SiteData {
  children?: any
}

export const Layout = (props: SiteData) => html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="//unpkg.com/alpinejs" defer></script>
    <link rel="stylesheet" href="/public/css/index.css" />
    <script src="/public/js/client.js" defer></script>
    <title>Document</title>
  </head>
  <body>
    <div class="flex h-screen overflow-hidden">
      ${<Sidebar />}
      <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      ${<Header />}
      ${props.children}
      </div>
    </div>
  </body>
  </html>
`