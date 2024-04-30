import Layout from './layouts/default/index';
import { Hono } from 'hono';
import { FullForm } from './layouts/default/forms/full';
import { SmallForm } from './layouts/default/forms/small';
import { List } from './layouts/default/forms/list';
import {
  deleteRecord,
  getRecords,
  insertRecord,
  updateRecord
} from '../data/data';
import { Input } from './layouts/default/components/Input';

function selectForm(menu) {
  if (menu == 'category') {
    return SmallForm;
  } else {
    return FullForm;
  }
}

const client = new Hono();

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
  const { data: postData } = await getRecords(ctx, menu, {}, `${menu}-list`);
  const { data: allCategories } = await getRecords(
    ctx,
    'categories',
    {},
    `categories-list`
  );
  const result = [];
  if (postData.length > 0) {
    for (const post of postData) {
      if (post.tags.includes(posttype)) {
        const { data: postCategories } = await getRecords(
          ctx,
          'categoriesToPosts',
          {
            filters: {
              postId: {
                $eq: post.id
              }
            }
          },
          `${post.id}-categories`
        );
        // get all cat names
        post['categories'] = postCategories
          .map((postCategory) =>
            allCategories.find(
              (category) => category.id === postCategory.categoryId
            )
          )
          .map((postCategory) => postCategory.title)
          .join(', ');
        result.push(post);
      }
    }
  }
  return ctx.html(
    List({ ctx, posttype, menu, data: result, title: `List ${posttype}` })
  );
});

client.get('/add', async (ctx) => {
  const { menu, posttype } = ctx.req.query();
  const Form = selectForm(menu);
  return ctx.html(Form({ ctx, posttype, menu, title: `Add ${posttype}` }));
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
      console.log('===>postCategories', postCategories);
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
  console.log('body received =>', body);
  try {
    let result;
    const Form = selectForm(menu);
    const feedback = {
      color: 'green',
      content: 'Categoria adicionado com sucesso.'
    };
    switch (menu) {
      case 'category':
        result = await addCategory(await ctx.req.parseBody(), ctx);
        break;
      case 'posts':
        result = await addPosts(await ctx.req.parseBody(), ctx);
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
  const { posttype, menu, title, postOrder, content, postid, table } =
    await ctx.req.parseBody();
  try {
    const dataObj = { table, id: postid, data: {} };
    const Form = selectForm(menu);
    const feedback = {
      color: 'green',
      content: 'Registro atualizado com sucesso.'
    };
    if (title) dataObj.data['title'] = title;
    if (content) dataObj.data['content'] = content;

    const result = await updateRecord(ctx.env.D1DATA, ctx.env.KVDATA, dataObj, {
      data: { id: postid }
    });

    // if (menu == 'category') {
    //   result = await insertRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
    //     table: 'categories',
    //     data: {
    //       title,
    //       body: content
    //     }
    //   });
    // }
    // options table here
    //
    return ctx.html(
      Form({ ctx, posttype, menu, feedback, title: `Add ${posttype}` })
    );
  } catch (error) {
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
client.delete('/list', async (ctx) => {
  try {
    const id = ctx.req.query('id');
    if (id) {
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
    return ctx.json({ success: 1 });
  } catch (error) {
    console.log('error', error);
    return ctx.json({ err: error }, 404);
  }
});
///////
function addCategory(body, ctx) {
  const { title, content } = body;
  return insertRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
    table: 'categories',
    data: {
      title,
      body: content
    }
  });
}
export const addPosts = async (body, ctx) => {
  const {
    title,
    content,
    tags,
    postImage,
    posttype,
    menu,
    userId,
    postOrder,
    local
  } = body;
  const resultTags = { videos: [], order: 0, fichaTecnica: [] };
  let images = [];
  /**
   * GET POST IMAGES
   */
  if (body['images[]']) {
    images = body['images[]'];
    // upload image
  }
  /**
   * GET POST TAGS
   */
  if (body['tags[videos][]']) {
    resultTags.videos = body['tags[videos][]'];
  }
  if (posttype) {
    resultTags['posttype'] = posttype;
  }
  if (local) {
    resultTags['local'] = local;
  }
  if (Number(postOrder)) {
    resultTags.order = Number(postOrder);
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
  return insertRecord(ctx.env.D1DATA, ctx.env.KVDATA, {
    table: 'posts',
    data: {
      title,
      body: content,
      images,
      tags: [JSON.stringify(resultTags)],
      userId
    }
  });
};
export const addPostsCategory = async (ctx, postId, categories) => {
  let result = [];
  console.log('===>categories'), categories;
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

export { client };
