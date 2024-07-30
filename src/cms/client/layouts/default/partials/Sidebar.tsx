const menus = [
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M20 40V28h8v12h10V24h6L24 6 4 24h6v16z"/><path d="M0 0h48v48H0z" fill="none"/></svg>`,
    name: 'Home',
    submenu: [
      {
        name: 'Todos os Home',
        menu: 'posts',
        posttype: 'home',
        type: 'list'
      },
      {
        name: 'Nova Home',
        menu: 'posts',
        posttype: 'home',
        type: 'add'
      }
    ]
  },
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M36 6v4h-4V6H16v4h-4V6H8v36h4v-4h4v4h16v-4h4v4h4V6h-4zM16 34h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zm20 16h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4z"/><path d="M0 0h48v48H0z" fill="none"/></svg>`,
    name: 'Trabalhos',
    submenu: [
      {
        name: 'Todos os Trabalhos',
        menu: 'posts',
        posttype: 'jobs',
        type: 'list'
      },
      {
        name: 'Novo Trabalho',
        menu: 'posts',
        posttype: 'jobs',
        type: 'add'
      },
      {
        name: 'Categoria',
        menu: 'categories',
        posttype: 'jobs',
        type: 'add'
      }
    ]
  },
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M42 10v28h4V10h-4zm-8 28h4V10h-4v28zm-6-28H4c-1.1 0-2 .9-2 2v24c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm-12 5.5c2.48 0 4.5 2.02 4.5 4.5 0 2.49-2.02 4.5-4.5 4.5s-4.5-2.01-4.5-4.5c0-2.48 2.02-4.5 4.5-4.5zM25 34H7v-1.5c0-3 6-4.5 9-4.5s9 1.5 9 4.5V34z"/></svg>`,
    name: 'Equipe',
    category: false,
    submenu: [
      {
        name: 'Todos os Equipe',
        menu: 'posts',
        posttype: 'equipe',
        type: 'list'
      },
      {
        name: 'Novo Equipe',
        menu: 'posts',
        posttype: 'equipe',
        type: 'add'
      }
    ]
  },

  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 0h48v48H0V0z" id="a"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath><path clip-path="url(#b)" d="M42 6H6c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h10v4h16v-4h10c2.21 0 3.98-1.79 3.98-4L46 10c0-2.21-1.79-4-4-4zm0 28H6V10h36v24zM32 20v4H16v-4h16z"/></svg>`,
    category: false,
    name: 'Quem Somos',
    submenu: [
      {
        name: 'Todos Quem Somos',
        menu: 'posts',
        posttype: 'quemsomos',
        type: 'list'
      },
      {
        name: 'Novo Quem Somos',
        menu: 'posts',
        posttype: 'quemsomos',
        type: 'add'
      }
    ]
  },
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 0h48v48H0V0z" id="a"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath><path clip-path="url(#b)" d="M42 6H6c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h10v4h16v-4h10c2.21 0 3.98-1.79 3.98-4L46 10c0-2.21-1.79-4-4-4zm0 28H6V10h36v24zM32 20v4H16v-4h16z"/></svg>`,
    category: false,
    name: 'O Que fazemos',
    submenu: [
      {
        name: 'Todos O Que Fazemos',
        menu: 'posts',
        posttype: 'oquefazemos',
        type: 'list'
      },
      {
        name: 'Novo O Que Fazemos',
        menu: 'posts',
        posttype: 'oquefazemos',
        type: 'add'
      },
      {
        name: 'Todas Categorias',
        menu: 'posts',
        posttype: 'tipooquefazemos',
        type: 'list'
      },
      {
        name: 'Novo Categorias',
        menu: 'posts',
        posttype: 'tipooquefazemos',
        type: 'add'
      }
    ]
  },
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 0h48v48H0V0z" id="a"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath><path clip-path="url(#b)" d="M42 6H6c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h10v4h16v-4h10c2.21 0 3.98-1.79 3.98-4L46 10c0-2.21-1.79-4-4-4zm0 28H6V10h36v24zM32 20v4H16v-4h16z"/></svg>`,
    category: false,
    name: 'Serviços',
    submenu: [
      {
        name: 'Todos Serviços',
        menu: 'posts',
        posttype: 'servicos',
        type: 'list'
      },
      {
        name: 'Novo Serviço',
        menu: 'posts',
        posttype: 'servicos',
        type: 'add'
      }
    ]
  },
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 0h48v48H0V0z" id="a"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath><path clip-path="url(#b)" d="M42 6H6c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h10v4h16v-4h10c2.21 0 3.98-1.79 3.98-4L46 10c0-2.21-1.79-4-4-4zm0 28H6V10h36v24zM32 20v4H16v-4h16z"/></svg>`,
    category: false,
    name: 'Tipo de Serviços',
    submenu: [
      {
        name: 'Todos Tipo Serviços',
        menu: 'posts',
        posttype: 'tiposervicos',
        type: 'list'
      },
      {
        name: 'Novo Tipo Serviço',
        menu: 'posts',
        posttype: 'tiposervicos',
        type: 'add'
      }
    ]
  },
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M38 6h-8.37c-.82-2.32-3.02-4-5.63-4s-4.81 1.68-5.63 4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM24 6c1.1 0 2 .89 2 2s-.9 2-2 2-2-.89-2-2 .9-2 2-2zm0 8c3.31 0 6 2.69 6 6 0 3.32-2.69 6-6 6s-6-2.68-6-6c0-3.31 2.69-6 6-6zm12 24H12v-2.8c0-4 8-6.2 12-6.2s12 2.2 12 6.2V38z"/></svg>`,
    category: false,
    name: 'Clientes',
    submenu: [
      {
        name: 'Todos Clientes',
        menu: 'posts',
        posttype: 'clientes',
        type: 'list'
      },
      {
        name: 'Novo Clientes',
        menu: 'posts',
        posttype: 'clientes',
        type: 'add'
      }
    ]
  },
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' enable-background="new 0 0 50 50" height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="25" cy="25" fill="none" r="24" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><rect fill="none" height="50" width="50"/><path d="M29.933,35.528  c-0.146-1.612-0.09-2.737-0.09-4.21c0.73-0.383,2.038-2.825,2.259-4.888c0.574-0.047,1.479-0.607,1.744-2.818  c0.143-1.187-0.425-1.855-0.771-2.065c0.934-2.809,2.874-11.499-3.588-12.397c-0.665-1.168-2.368-1.759-4.581-1.759  c-8.854,0.163-9.922,6.686-7.981,14.156c-0.345,0.21-0.913,0.878-0.771,2.065c0.266,2.211,1.17,2.771,1.744,2.818  c0.22,2.062,1.58,4.505,2.312,4.888c0,1.473,0.055,2.598-0.091,4.21c-1.261,3.39-7.737,3.655-11.473,6.924  c3.906,3.933,10.236,6.746,16.916,6.746s14.532-5.274,15.839-6.713C37.688,39.186,31.197,38.93,29.933,35.528z" fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></svg>`,
    category: false,
    name: 'Usuários',
    submenu: [
      {
        name: 'Todos Usuários',
        menu: 'posts',
        posttype: 'users',
        type: 'list'
      },
      {
        name: 'Novo Usuário',
        menu: 'posts',
        posttype: 'users',
        type: 'add'
      }
    ]
  },
  {
    icon: `<svg class='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"/></svg>`,
    category: false,
    name: 'Opções',
    submenu: [
      {
        name: 'Todas Opções',
        menu: 'posts',
        posttype: 'options',
        type: 'list'
      },
      {
        name: 'Nova Opção',
        menu: 'posts',
        posttype: 'options',
        type: 'add'
      }
    ]
  }
];
export const Sidebar = () => {
  return (
    <>
      <button
        data-drawer-target='sidebar-multi-level-sidebar'
        data-drawer-toggle='sidebar-multi-level-sidebar'
        aria-controls='sidebar-multi-level-sidebar'
        type='button'
        class='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
      >
        <span class='sr-only'>Open sidebar</span>
        <svg
          class='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clip-rule='evenodd'
            fill-rule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
          ></path>
        </svg>
      </button>

      <aside
        id='sidebar-multi-level-sidebar'
        class='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
        aria-label='Sidebar'
      >
        <div class='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <ul class='space-y-2 font-medium'>
            {menus.map((menu, index) => (
              <>
                <li>
                  {menu?.type ? (
                    <a
                      href={menu?.type ? menu?.type : '#'}
                      class='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                    >
                      {menu.name}
                    </a>
                  ) : (
                    <button
                      type='button'
                      class='flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                      aria-controls={'dropdown-' + index}
                      data-collapse-toggle={'dropdown-' + index}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: menu.icon }}
                      ></span>
                      <span class='flex-1 ms-3 text-left rtl:text-right whitespace-nowrap'>
                        {menu.name}
                      </span>
                      <svg
                        class='w-3 h-3'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 10 6'
                      >
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='m1 1 4 4 4-4'
                        />
                      </svg>
                    </button>
                  )}
                  {menu.submenu ? (
                    <ul id={'dropdown-' + index} class='hidden py-2 space-y-2'>
                      {menu.submenu.map((submenu) => (
                        <li>
                          <a
                            href={
                              '/client/' +
                              submenu.type +
                              '?menu=' +
                              submenu.menu +
                              '&posttype=' +
                              submenu.posttype
                            }
                            class='flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                          >
                            {submenu.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ''
                  )}
                </li>
              </>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};
