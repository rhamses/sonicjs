import Default from '../index';
import { MainContent } from '../partials/MainContent';
import { Input } from '../components/Input';
import { Aside } from './fullAside';

export const FullForm = (props: {
  ctx: any;
  menu: string;
  posttype: string;
  title: string;
  msg?: {
    success: boolean;
    content: string;
  };
  data?: any;
}) => {
  console.log('full data', props?.data);
  function getValue(key) {
    return props.data ? props.data[key] : '';
  }
  function getTags(key, title) {
    try {
      const images = props?.data?.images;
      const postTags = props?.data?.tags
        ? JSON.parse(props?.data?.tags)
        : {}
        ? JSON.parse(JSON.parse(props?.data?.tags)[0])
        : {};
      postTags['images'] = images;
      // Prepare Return
      const item =
        postTags[key] && !Array.isArray(postTags[key])
          ? [postTags[key]]
          : postTags[key];
      return (
        <>
          <section
            class='flex justify-between flex-wrap my-5'
            id={key + '--wrapper'}
          >
            <h2 class='w-full'>{title}</h2>
            {item.map((it) => {
              console.log('it', it);
              let result;
              if (typeof it === 'object') {
                result = Object.keys(it).map((itKey: string) => (
                  <Input
                    type='text'
                    cssClass='w-1/2'
                    placeholder='Insira o conteúdo'
                    name={`tags[${key}][${itKey}][]`}
                    id={`tags[${key}][${itKey}][]`}
                    value={it[itKey]}
                  />
                ));
              } else {
                result = (
                  <Input
                    type='text'
                    cssClass='w-full'
                    placeholder='Insira o conteúdo'
                    name={key + '[]'}
                    id={key + '[]'}
                    value={it}
                  />
                );
              }
              return result;
            })}
          </section>
        </>
      );
    } catch (error) {
      console.error('ERROR', error);
      return null;
    }
  }
  function addBlock() {
    return (
      <>
        <section
          class='flex justify-between flex-wrap my-5'
          id='images--wrapper'
        >
          <h2 class='w-full'>Imagens</h2>
          <input
            type='text'
            name='images[]'
            id='images[]'
            placeholder='Chave do conteúdo'
            class='rounded-lg border border-gray p-3 mb-5 w-full'
          />
        </section>
      </>
    );
  }
  return (
    <Default>
      <MainContent title={props.title}>
        <div>Item adicionado com sucesso.</div>
        <form method='POST' class='flex' enctype='multipart/form-data'>
          <div class='flex-1'>
            <Input
              type='text'
              id='title'
              placeholder='Título da página'
              value={getValue('title')}
            />
            <h2>Conteúdo da página</h2>
            <Input
              type='textarea'
              placeholder='Insira aqui o conteúdo da página'
              id='content'
              value={getValue('body')}
            />
            <section id='extraContentWrapper'>
              {getTags('videos', 'Videos')}
              {getTags('images', 'Imagens')}
              {getTags('fichaTecnica', 'Créditos')}
            </section>
            <h2>Adicionar seção</h2>
            <select
              name='extraContent'
              id='extraContent'
              class='block w-full p-2 rounded'
            >
              <option value=''>Adicione Conteúdo Extra</option>
              <option value='images'>Imagem</option>
              <option value='videos'>Video</option>
              <option value='fichaTecnica'>Créditos</option>
              <option value='language'>Idioma</option>
            </select>
          </div>
          <Aside
            ctx={props.ctx}
            menu={props.menu}
            posttype={props.posttype}
            hasCategory={true}
            hasImage={true}
            hasOrder={true}
            data={props?.data}
          />
          <Input type='hidden' value={props.posttype} id='posttype' />
          <Input type='hidden' value={props.menu} id='menu' />
          <Input
            type='hidden'
            value={props.ctx.get('user').userId}
            id='userId'
          />
        </form>
      </MainContent>
    </Default>
  );
};
