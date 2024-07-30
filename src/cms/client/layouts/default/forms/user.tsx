import Default from '../index';
import { MainContent } from '../partials/MainContent';
import { Input } from '../components/Input';
export const UserForm = (props: {
  ctx: any;
  menu: string;
  posttype: string;
  title: string;
  feedback?: {
    color: string;
    content: string;
  };
  data: any;
}) => {
  function getValue(key) {
    return props.data ? props?.data[key] : '';
  }
  return (
    <Default>
      <MainContent feedback={props.feedback} title={props.title}>
        <form method='POST' class='flex'>
          <div class='flex-1'>
            <Input
              type='text'
              id='firstName'
              placeholder='Nome do usuário'
              value={getValue('firstName')}
            />
            <Input
              type='text'
              id='lastName'
              placeholder='Sobrenome do usuário'
              value={getValue('lastName')}
            />
            <Input
              type='email'
              id='email'
              placeholder='Email do usuário'
              value={getValue('email')}
            />
            <Input
              type='password'
              id='password'
              placeholder='Senha do usuário'
              value={getValue('password')}
            />
            <Input type='hidden' id='role' value='admin' />
          </div>
          <aside class='basis-4/12 px-8'>
            <article class='my-5'>
              <h3 class='font-bold text-gray-500'>Dados da publicação</h3>
              <button
                type='submit'
                class='bg-blue-800 text-white rounded-xl px-5 py-2 my-5 w-full'
              >
                Salvar Novo
              </button>
            </article>
          </aside>
          <Input type='hidden' value={props.posttype} id='posttype' />
          <Input type='hidden' value={props.menu} id='menu' />
          <Input type='hidden' value={getValue('id')} id='id' />
        </form>
      </MainContent>
    </Default>
  );
};
