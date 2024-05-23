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
  function getValue(key) {
    return props.data ? props.data[key] : '';
  }
  function getTags(key, title) {
    try {
      console.log('===>key', key);
      const images = props?.data?.images;
      const postTags = props?.data?.tags
        ? JSON.parse(JSON.parse(props?.data?.tags)[0])
        : {};
      postTags['images'] = images;
      // Prepare Return
      let item = [];
      // early return
      if (!postTags[key] || postTags[key].length == 0) return item;
      item =
        postTags[key] && !Array.isArray(postTags[key])
          ? [postTags[key]]
          : postTags[key];
      console.log('===>item11', item);
      let html;
      switch (key) {
        case 'images':
          item = JSON.parse(item[0]);
          html = item.map((it) => (
            <>
              <img class='max-h-60' src={it} alt='' />
              <Input
                type='hidden'
                value={it}
                name={key + '[]'}
                id={key + '[]'}
              />
              <button
                type='button'
                class='bg-red-100 rounded-lg border border-gray p-3 mb-5 w-full'
                name='close'
                id='close'
              >
                fechar
              </button>
            </>
          ));
          break;
        case 'language':
          html = (
            <select
              name={'tags[' + key + ']'}
              id={'tags[' + key + ']'}
              class='rounded-lg border border-gray p-3 mb-5 w-full'
            >
              <option selected={item[0] === 'ptbr' ? true : false} value='ptbr'>
                Portugês
              </option>
              <option selected={item[0] === 'enUS' ? true : false} value='enUS'>
                Inglês
              </option>
            </select>
          );
          break;
        case 'videos':
          html = item.map((it) => (
            <>
              <Input
                type='text'
                cssClass='w-full'
                placeholder='Insira o conteúdo'
                name={'tags[' + key + '][]'}
                id={'tags[' + key + '][]'}
                value={it}
              />
              <button
                type='button'
                class='bg-red-100 rounded-lg border border-gray p-3 mb-5 w-full'
                name='close'
                id='close'
              >
                fechar
              </button>
            </>
          ));
          break;
        case 'fichaTecnica':
          html = item.map((it) => {
            return Object.keys(it).map((itKey: string) => (
              <>
                <Input
                  type='text'
                  cssClass='w-1/2'
                  placeholder='Insira o conteúdo'
                  name={`tags[${key}][${itKey}][]`}
                  id={`tags[${key}][${itKey}][]`}
                  value={it[itKey]}
                />
              </>
            ));
          });
          break;
        default:
          html = item.map((it) => (
            <>
              <Input
                type='text'
                cssClass='w-full'
                placeholder='Insira o conteúdo'
                name={'tags[' + key + '][]'}
                id={'tags[' + key + '][]'}
                value={it}
              />
            </>
          ));
          html += (
            <button
              type='button'
              class='bg-red-100 rounded-lg border border-gray p-3 mb-5 w-full'
              name='close'
              id='close'
            >
              fechar
            </button>
          );
          break;
      }
      return (
        <>
          <section
            class='flex justify-between flex-wrap my-5'
            id={key + '--wrapper'}
          >
            <h2 class='w-full'>{title}</h2>
            {html}
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
              {getTags('language', 'Idioma')}
              {getTags('socialMedia', 'Social Media')}
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
              <option value='socialMedia'>Social Media</option>
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
