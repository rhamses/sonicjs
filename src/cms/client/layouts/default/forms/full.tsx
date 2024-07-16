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
  function btnRemover() {
    return (
      <button
        type='button'
        class='bg-red-100 rounded-lg border border-gray p-3 mb-5 w-full'
        style='justify-content: center; display: flex'
        name='close'
        id='close'
      >
        Remover
        <svg
          style='height: 20px; padding-left: 10px; justify-content: center;'
          viewBox='0 0 448 512'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z' />
        </svg>
      </button>
    );
  }
  function getTags(key, title) {
    try {
      console.log('props.data', props.data);
      const images = props?.data?.images;
      const postTags = props?.data?.tags
        ? JSON.parse(JSON.parse(props?.data?.tags)[0])
        : {};
      // console.log('postTags', postTags);
      postTags['images'] = images;
      // Prepare Return
      let item = [];
      // early return
      if (!postTags[key] || postTags[key].length == 0) return item;
      item =
        postTags[key] && !Array.isArray(postTags[key])
          ? [postTags[key]]
          : postTags[key];
      // console.log('===>item11', item);
      let html;
      switch (key) {
        case 'images':
          item = JSON.parse(item[0]);
          html = item.map((it) => (
            <div class='w-full'>
              <img class='max-h-60' src={it} alt='' />
              <Input
                type='hidden'
                value={it}
                name={key + '[]'}
                id={key + '[]'}
              />
              {btnRemover()}
            </div>
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
              <Input
                type='radio'
                cssClass='w-full !mt-0'
                placeholder='Insira o conteúdo'
                name={'tags[' + key + '_home][]'}
                id={'tags[' + key + '_home][]'}
                value={it}
                checked={it === postTags['videosHome'] ? true : false}
                label='Colocar video em destaque na home?'
              />
              {btnRemover()}
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
        case 'reel':
          html = item.map((it) => (
            <Input
              type='textarea'
              cssClass='w-full'
              placeholder='Insira o conteúdo'
              name={`tags[${key}]`}
              id={`tags[${key}]`}
              value={it}
            />
          ));
          break;
        default:
          html = item.map((it) => (
            <Input
              type='text'
              cssClass='w-full'
              placeholder='Insira o conteúdo'
              name={'tags[' + key + '][]'}
              id={'tags[' + key + '][]'}
              value={it}
            />
          ));
          html.push(btnRemover());
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
  let hasBody = true;
  if (props.posttype == 'options') {
    hasBody = false;
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
              {getTags('reel', 'Reel')}
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
              <option value='reel'>Reel</option>
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
