import Default from '../index';
import { MainContent } from '../partials/MainContent';
import { Input } from '../components/Input';
export const SmallForm = (props: {
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
        <form method='POST' class='flex' enctype='multipart/form-data'>
          <div class='flex-1'>
            <Input
              type='text'
              id='title'
              placeholder='nome da categoria'
              value={getValue('title')}
            />
            <h2>Conteúdo da página</h2>
            <Input
              type='text'
              placeholder='Insira aqui o conteúdo da página'
              id='content'
              value={getValue('content')}
            />
            <Input type='number' label='Ordem' id='postOrder' />
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
          <Input type='hidden' value={getValue('id')} id='postid' />
        </form>
      </MainContent>
    </Default>
  );
};
