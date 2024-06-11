import { Context } from 'hono';
import { getRecords } from '../../../../data/data';
import { Input } from '../components/Input';

export const Aside = async (props: {
  ctx: Context;
  menu: string;
  posttype: string;
  hasOrder: boolean;
  hasImage: boolean;
  hasCategory: boolean;
  data?: any;
}) => {
  const { data: categories } = await getRecords(
    props.ctx,
    'categories',
    {},
    'categories'
  );
  const image = props?.data?.image;
  const postCategories = props?.data?.categories;
  const postTags = props?.data?.tags
    ? JSON.parse(JSON.parse(props?.data?.tags)[0])
    : null;
  const order = postTags?.order || '';
  function categoryExists(id, postCategories) {
    if (postCategories && postCategories.find((cat) => cat.categoryId === id))
      return true;
  }

  return (
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
      {props.hasCategory ? (
        <>
          <article>
            {props.posttype == 'jobs' ? (
              <h3 class='font-bold text-gray-500'>Categorias</h3>
            ) : (
              ''
            )}

            {props.posttype == 'jobs'
              ? categories.map((cat, index) => {
                  return (
                    <>
                      <div class='flex'>
                        <Input
                          type='checkbox'
                          label={cat.title}
                          id={cat.title + '_' + index}
                          name='category[]'
                          value={cat.id}
                          checked={categoryExists(cat.id, postCategories)}
                        />
                        <a
                          href={`/client/edit?menu=categories&posttype=${props.posttype}&id=${cat.id}&table=categories`}
                          class='flex items-center ml-3'
                        >
                          <svg
                            class='feather feather-edit stroke-blue-400 hover:stroke-cyan-900'
                            fill='none'
                            height='16'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            viewBox='0 0 24 24'
                            width='16'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
                            <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
                          </svg>
                        </a>
                        <a
                          href={`/client/delete?menu=${props.menu}&posttype=${
                            props.posttype
                          }&id=${
                            cat.id
                          }&table=categories&redirect=${encodeURIComponent(
                            props.ctx.req.url
                          )}`}
                          class='flex items-center ml-3'
                        >
                          <svg
                            class='feather feather-trash-2 stroke-red-400 hover:stroke-cyan-900'
                            fill='none'
                            height='16'
                            stroke='currentColor'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            viewBox='0 0 24 24'
                            width='16'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <polyline points='3 6 5 6 21 6' />
                            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                            <line x1='10' x2='10' y1='11' y2='17' />
                            <line x1='14' x2='14' y1='11' y2='17' />
                          </svg>
                        </a>
                      </div>
                    </>
                  );
                })
              : ''}
          </article>
        </>
      ) : (
        ''
      )}
      {props.hasImage ? (
        <article>
          <h3 class='font-bold text-gray-500'>Imagens em Destaque</h3>
          <img
            id='imagePreview'
            src={props?.data?.image ? props.data.image : ''}
            alt=''
            class='max-h-60 ml-auto mr-auto bg-slate-200'
          />
          <Input
            type='hidden'
            value={props?.data?.image ? props.data.image : ''}
            id='postImageAdded'
          />
          <Input
            type='file'
            label=''
            value={props?.data?.image ? props.data.image : ''}
            id='postImage'
          />
        </article>
      ) : (
        ''
      )}
      {props.hasOrder ? (
        <article>
          <h3 class='font-bold text-gray-500'>Ordem</h3>
          <Input type='number' label='' id='postOrder' value={order} />
        </article>
      ) : (
        ''
      )}
    </aside>
  );
};
