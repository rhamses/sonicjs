import { html } from 'hono/html';
import { Sidebar } from './partials/Sidebar';
export default (props: {
  ctx?: any;
  children: any;
  headers?: Array<string>;
}) => {
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <script
          prefetch
          src="https://unpkg.com/gridjs/dist/gridjs.umd.js"
        ></script>
        <link
          href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css"
          rel="stylesheet"
        />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="module" src="/public/js/theme-default.js"></script>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css"
          type="text/css"
          media="screen"
          charset="utf-8"
        />
        <link rel="stylesheet" href="/public/css/tailwind.css" />
        <title>Default SonicJS - Client Panel</title>
      </head>
      <body>
        <main>${Sidebar()} ${props.children}</main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  `;
};
