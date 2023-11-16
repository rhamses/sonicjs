import { html } from 'hono/html'
import { Sidebar } from './sidebar'

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
    <title>Document</title>
  </head>
  <body>
    ${<Sidebar />}
  </body>
  </html>
`

// export const Layout = (props: {
//   children?: string
// }) => {
//   const html = () => { 
//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <script src="//unpkg.com/alpinejs" defer></script>
//       <link rel="stylesheet" href="/public/css/index.css" />
//       <title>Client Panel</title>
//     </head>
//     <body>
//       asdasd
//     </body>
//     </html>`
//   }
//   return (html())
// }