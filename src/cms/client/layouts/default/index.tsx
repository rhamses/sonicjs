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
        <style>
          body.loading::before {
            content: '';
            position: fixed;
            height: 100vh;
            width: 100vw;
            background: rgba(255, 255, 255, 0.7);
            z-index: 100;
          }
          body.loading::after {
            content: '';
            display: block;
            height: 50px;
            position: fixed;
            left: 50%;
            top: 50%;
            width: 50px;
            background-image: url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWU0a2sza2Q3Zm1la2tybXB0cDR2eWVwamZ6MDY4emFyd21ydHIwYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.webp);
            background-size: cover;
            background-color: transparent;
            z-index: 101;
          }
        </style>
      </head>
      <body>
        <main>${Sidebar()} ${props.children}</main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
      </body>
    </html>
  `;
};
