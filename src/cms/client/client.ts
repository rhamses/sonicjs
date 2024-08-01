import Layout from './layouts/default/index';
import { Hono } from 'hono';
import { FullForm } from './layouts/default/forms/full';
import { SmallForm } from './layouts/default/forms/small';
import { UserForm } from './layouts/default/forms/user';
import { List } from './layouts/default/forms/list';
import { bucketUploadFile, bucketGetFile } from '../bucket/bucket';
import { apiConfig, config } from '../../db/routes';
import { hasUser } from '../auth/auth-helpers';
import { deleteUser, createUser } from '../auth/lucia';
import {
  deleteRecord,
  getRecords,
  insertRecord,
  updateRecord
} from '../data/data';
import { Input } from './layouts/default/components/Input';

function selectForm(menu, posttype) {
  if (menu == 'categories') {
    return SmallForm;
  } else if (posttype == 'users') {
    return UserForm;
  } else {
    return FullForm;
  }
}

function pageTitle(posttype, menu) {
  let title;
  switch (posttype) {
    case 'jobs':
      title = 'Trabalhos';
      break;
    case 'quemsomos':
      title = 'Quem Somos';
      break;
    case 'users':
      title = 'Usuários';
      break;
    case 'options':
      title = 'Opções';
      break;
    default:
      title = posttype;
      break;
  }
  switch (menu) {
    case 'categories':
      title = 'Categorias';
      break;
    default:
      title = posttype;
      break;
  }
  return title;
}

const client = new Hono();

client.use('*', async (ctx, next) => {
  const path = ctx.req.path;
  let canUseAdmin = await config.adminAccessControl(ctx);
  if (!canUseAdmin) {
    const userExists = await hasUser(ctx);
    if (userExists && path !== '/admin/login') {
      return ctx.redirect('/admin/login', 302);
    } else if (!userExists && path !== '/admin/content/new/auth/users/setup') {
      return ctx.redirect('/admin/content/new/auth/users/setup', 302);
    }
    //redirect if not logged in
  } else if (
    canUseAdmin &&
    (path === '/admin/login' || path === '/admin/content/new/auth/users/setup')
  ) {
    //redirect if logged in
    return ctx.redirect('/client', 302);
  }
  await next();
});

client.get('/', async (ctx) => {
  return ctx.html(Layout({}));
});
client.get('/field', async (ctx) => {
  const inpt = Input({
    cssClass: 'w-1/2',
    type: 'text',
    placeholder: 'Chave do conteúdo',
    id: 'extra_key[]'
  });
  return ctx.json({ field: JSON.stringify(inpt) });
});
client.get('/list', async (ctx) => {
  const { menu, posttype } = ctx.req.query();
  const title = pageTitle(posttype, menu);
  return ctx.html(List({ ctx, posttype, menu, title: `Listar ${title}` }));
});

client.get('/add', async (ctx) => {
  const { menu, posttype } = ctx.req.query();
  const Form = selectForm(menu, posttype);
  const title = pageTitle(posttype, menu);
  return ctx.html(Form({ ctx, posttype, menu, title: `Adicionar ${title}` }));
});
client.get('/edit', async (ctx) => {
  const { menu, posttype, id, table } = ctx.req.query();
  try {
    if (!id) {
      throw 'falta id';
    }
    const { data: postData } = await getRecords(ctx, menu, { id }, `get-${id}`);
    if (menu === 'posts') {
      const { data: postCategories } = await getRecords(
        ctx,
        'categoriesToPosts',
        {
          filters: {
            postId: {
              $eq: postData.id
            }
          }
        },
        `${id}-categories`
      );
      postData['categories'] = postCategories;
    }
    const Form = selectForm(menu);
    return ctx.html(
      Form({ ctx, posttype, menu, data: postData, title: `Edit ${posttype}` })
    );
  } catch (error) {
    console.log('err', error);
    return ctx.redirect(`/client/add?menu=${menu}&posttype=${posttype}`);
  }
});
client.get('/delete', async (ctx) => {
  const { menu, posttype, id, table, redirect } = ctx.req.query();
  // const Form = selectForm(menu);
  try {
    const data = {
      id,
      table
    };
    await deleteRecord(ctx.env.D1DATA, ctx.env.KVDATA, data);
    const feedback = {
      color: 'green',
      content: 'Categoria removida com sucesso.'
    };
    return ctx.redirect(decodeURIComponent(redirect));
  } catch (error) {
    const feedback = {
      color: 'red',
      content: 'Categoria não removida. Tente novamente ou entre em contato.'
    };
    return ctx.redirect(decodeURIComponent(redirect));
  }
});
client.post('/add', async (ctx) => {
  const body = await ctx.req.parseBody();
  const { menu, posttype } = body;
  try {
    let result;
    const Form = selectForm(menu);
    const feedback = {
      color: 'green',
      content: 'Categoria adicionado com sucesso.'
    };
    switch (menu) {
      case 'categories':
        result = await addCategory(await ctx.req.parseBody(), ctx);
        break;
      case 'posts':
        let formatBody;
        if (posttype == 'users') {
          body.table = posttype;
          const result = await createUser({ ctx, content: { data: body } });
          console.log('result', result);
        } else {
          // format body
          formatBody = await formatPost(body, ctx);
          // insert data
          result = await insertRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
            table: menu,
            data: formatBody
          });
          const {
            data: { id }
          } = result;
          if (id) {
            const categories = !Array.isArray(body['category[]'])
              ? [body['category[]']]
              : body['category[]'];
            result['resultCategory'] = await addPostsCategory(
              ctx,
              id,
              categories
            );
          }
        }
        break;
    }
    //
    return ctx.html(
      Form({ ctx, posttype, menu, feedback, title: `Add ${posttype}` })
    );
  } catch (error) {
    console.log('error', error);
    const feedback = {
      color: 'red',
      content:
        'Categoria não foi adicionado. Tente novamente ou entre em contato.'
    };
    const Form = selectForm(menu);
    return ctx.html(
      Form({ ctx, posttype, feedback, menu, title: 'Add Small Form' })
    );
  }
});
client.post('/edit', async (ctx) => {
  const menu = ctx.req.query('menu');
  switch (menu) {
    case 'posts':
      return EditPost(ctx);
      break;
    case 'categories':
      return EditPost(ctx);
      break;
  }
});
client.delete('/list', async (ctx) => {
  try {
    const id = ctx.req.query('id');
    const posttype = ctx.req.query('posttype');
    if (id) {
      if (posttype && posttype == 'users') {
        const result = await deleteUser({ ctx }, id);
      } else {
        // pega post by id
        const { data: post } = await getRecords(
          ctx,
          'posts',
          { id },
          `${id}-list`
        );
        // pega todas as categorias do post
        const { data: postCategories } = await getRecords(
          ctx,
          'categoriesToPosts',
          {
            filters: {
              postId: {
                $eq: post?.id
              }
            }
          },
          null,
          'd1'
        );
        // deleta categorias por post
        for (const item of postCategories) {
          await deleteRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
            table: 'categoriesToPosts',
            id: item?.id
          });
        }
        // deleta post
        await deleteRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
          table: 'posts',
          id: post?.id
        });
      }
    }
    return ctx.json({ success: 1 });
  } catch (error) {
    console.log('error', error);
    return ctx.json({ err: error }, 404);
  }
});
///////
function addCategory(body, ctx) {
  const { title, content } = body;
  console.log('asdsad', {
    title,
    body: content
  });
  return insertRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
    table: 'categories',
    data: {
      title,
      body: content
    }
  });
}

export const formatPost = async (body, ctx) => {
  const {
    title,
    content,
    tags,
    postImage,
    postImageAdded,
    posttype,
    menu,
    userId,
    postOrder,
    createdOn,
    local
  } = body;
  console.log('====>body', body);
  const resultTags = {
    videos: null,
    videosHome: null,
    videosHomeOrder: null,
    order: 0,
    fichaTecnica: [],
    language: null,
    socialMedia: null,
    reel: null
  };
  /**
   * GET POST IMAGE
   */
  let image = '';
  if (!postImage && postImageAdded) {
    image = postImageAdded;
  } else if (postImage) {
    let pI;
    if (typeof postImage == 'string') {
      pI = postImage;
    } else {
      pI = postImage.name;
    }
    image = await bucketGetFile(ctx, pI, 'url');
  }
  /**
   * GET POST IMAGES
   */
  let images = null;
  if (body['images[]']) {
    images = [];
    if (!Array.isArray(body['images[]'])) {
      body['images[]'] = [body['images[]']];
    }
    // upload image
    for (const img of body['images[]']) {
      if (typeof img === 'string') {
        images.push(img);
      } else {
        const image = await bucketUploadFile(ctx, img);
        console.log('===>image', image);
        const imageUploadUrl = await bucketGetFile(ctx, image.name, 'url');
        console.log('===>imageUploadUrl', imageUploadUrl);
        images.push(imageUploadUrl);
      }
    }
  }
  /**
   * Transform Date
   */
  let newCreatedOn;
  if (createdOn) {
    newCreatedOn = new Date(createdOn).getTime();
  }
  /**
   * GET POST TAGS
   */
  if (posttype) {
    resultTags['posttype'] = posttype;
  }
  if (local) {
    resultTags['local'] = local;
  }
  if (Number(postOrder)) {
    resultTags.order = Number(postOrder);
  }
  if (body['tags[videos][]']) {
    resultTags.videos = body['tags[videos][]'];
  }
  if (body['tags[videos_home][]']) {
    resultTags.videosHome = body['tags[videos_home][]'];
  }
  if (body['tags[videos_home_order]']) {
    resultTags.videosHomeOrder = body['tags[videos_home_order]'];
  }
  if (body['tags[reel]']) {
    resultTags.reel = body['tags[reel]'];
  }
  if (body['tags[language]']) {
    resultTags.language = body['tags[language]'];
  }
  if (body['tags[socialMedia][]']) {
    resultTags.socialMedia = Array.isArray(body['tags[socialMedia][]'])
      ? body['tags[socialMedia][]']
      : [body['tags[socialMedia][]']];
  }
  if (body['tags[fichaTecnica][title][]']) {
    if (Array.isArray(body['tags[fichaTecnica][title][]'])) {
      for (const [index, fichTitle] of body[
        'tags[fichaTecnica][title][]'
      ].entries()) {
        resultTags.fichaTecnica.push({
          title: fichTitle,
          content: body['tags[fichaTecnica][content][]'][index]
            ? body['tags[fichaTecnica][content][]'][index]
            : ''
        });
      }
    } else {
      resultTags.fichaTecnica.push({
        title: body['tags[fichaTecnica][title][]'],
        content: body['tags[fichaTecnica][content][]']
      });
    }
  }
  return {
    title,
    body: content,
    image,
    createdOn: newCreatedOn,
    images,
    tags: [JSON.stringify(resultTags)],
    userId
  };
};
export const formatPostTag = (post) => {
  const { tags } = post;
  const tagsFormatted = JSON.parse(JSON.parse(tags)[0]);
  return { ...tagsFormatted, ...post };
};
export const addPostsCategory = async (ctx, postId, categories) => {
  let result = [];
  if (categories) {
    for (const categoryId of categories) {
      const response = await insertRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
        table: 'categoriesToPosts',
        data: {
          postId,
          categoryId
        }
      });
      result.push(response);
    }
  }
  return result;
};
export const getPostCategories = async (ctx, postId) => {
  // pega todas as categorias do post
  const { data: postCategories } = await getRecords(
    ctx,
    'categoriesToPosts',
    {
      filters: {
        postId: {
          $eq: postId
        }
      }
    },
    null,
    'd1'
  );
  console.log('===>postCategories', postCategories);
  return postCategories;
};
export const deletePostCategories = async (ctx, categories) => {
  try {
    let result = [];
    for (const category of categories) {
      const { id } = category;
      result.push(
        await deleteRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
          table: 'categoriesToPosts',
          id
        })
      );
    }
    return result;
  } catch (error) {
    console.log('===> error deletePostCategories', error);
  }
};
export const EditCategories = async (ctx) => {
  const body = await ctx.req.parseBody();
};
export const EditPost = async (ctx) => {
  const body = await ctx.req.parseBody();
  console.log('---->body', body);
  const posttype = body['posttype'];
  const menu = body['menu'];
  const categories = body['category[]']
    ? Array.isArray(body['category[]'])
      ? body['category[]']
      : [body['category[]']]
    : [];
  const postID = ctx.req.query('id');
  try {
    const feedback = {
      color: 'green',
      content: 'Registro atualizado com sucesso.'
    };
    // FORMAT BODY
    const formatBody = await formatPost(await ctx.req.parseBody(), ctx);
    console.log('--->formatBody', formatBody);
    const dataObj = { table: menu, id: postID, data: formatBody };
    // CREATE HOOK
    const { resolveInput } = apiConfig.find(
      (entry) => entry.route === menu
    ).hooks;
    dataObj.data = resolveInput.update(ctx, postID, dataObj.data);
    // UPDATE RECORD
    const result = await updateRecord(
      ctx.env.D1DATA,
      ctx.env.KVDATA,
      dataObj,
      null
    );
    // DELETE CATEGORIES ALREADY ADDED
    const categoriesSelected = await getPostCategories(ctx, postID);
    const categoriesDeleted = await deletePostCategories(
      ctx,
      categoriesSelected
    );
    // GET POST CATEGORIES
    if (categories.length > 0) {
      const categoriesAdded = await addPostsCategory(ctx, postID, categories);
    }
    // RETURN STATEMENT
    return ctx.redirect(`/client/list?menu=${menu}&posttype=${posttype}`);
  } catch (error) {
    console.log('===<error', error);
    const feedback = {
      color: 'red',
      content:
        'Categoria não foi adicionado. Tente novamente ou entre em contato.'
    };
    const Form = selectForm(menu);
    return ctx.html(
      Form({ ctx, posttype, feedback, menu, title: 'Add Small Form' })
    );
  }
};

export { client };
