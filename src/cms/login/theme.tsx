export const Layout = (props: {
  children?: any[]
}) => {
  return (
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com" />
        <link href="/public/css/login.css" rel="stylesheet" />
        <link
          rel="icon"
          type="image/x-icon"
          href="/public/images/favicon.ico"
        />
      <title>SonicJs Login</title>
    </head>
      <body class="bg-gray-100 flex items-center justify-center h-screen">
        <section class="max-w-xs">
          <h1>
            <a href="/" class="logo">Powered By SonicJS</a>
          </h1>
          {props.children}
        <a
        class="block flex items-center text-sm pl-5 pt-4 text-gray-600"
        href="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>

        Go to website
      </a>
        </section>
    </body>
    </html>
  )
}