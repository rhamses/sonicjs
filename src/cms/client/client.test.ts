// import { WPLike } from "../data/wplike-data";
import app from '../../server';
// import { drizzle } from "drizzle-orm/d1";
// import { sql } from "drizzle-orm";
import { addPosts } from './client';
const env = getMiniflareBindings();
const { __D1_BETA__D1DATA, KVDATA } = getMiniflareBindings();
// const env = getMiniflareBindings();
// const { __D1_BETA__D1DATA, KVDATA } = getMiniflareBindings();
const ctx = {
  env: {
    __D1_BETA__D1DATA,
    KVDATA
  }
};

describe('Testing API endpoints', () => {
  it('should return 200', async () => {
    let req = new Request('http://localhost/v1/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let res = await app.fetch(req, env);
    // const db = drizzle(__D1_BETA__D1DATA);
    // const teste = await db.run(sql`SELECT * FROM "users"`);
    // // const table = await createTestTable();
    // const wp = new WPLike(__D1_BETA__D1DATA, KVDATA);
    // const result = await wp.createUser({
    //   user_login: "teste",
    //   user_email: "teste@teste.com",
    //   user_pass: "abc123",
    //   user_nicename: "sample teste",
    //   user_status: "active",
    // });
    console.log('====>>>', JSON.stringify(res));
  });
  it.only('demo post add', async () => {
    const body = {
      title: 'Titulo do Post',
      content: 'Conteúdo do Post',
      'images[]': [
        'https://placehold.it/160x160',
        'https://placehold.it/180x180'
      ],
      'tags[videos][]': ['https://vimeo.com/test', 'https://vimeo.com/test2'],
      'tags[fichtec][title][]': ['DIRETOR', 'CAMERA'],
      'tags[fichtec][content][]': ['FULANO', 'CICLANO'],
      extraContent: 'images',
      'category[]': '4f872842-fabe-4c7b-9194-f9a319008b7c',
      postImage: {
        lastModified: 1713899547106,
        name: '8F79B2FA-25EF-454C-B2C5-08EBC0B4EB4A_1_201_a.jpeg',
        type: 'image/jpeg',
        size: 6601945
      },
      'tags[order]': '2',
      posttype: 'jobs',
      menu: 'post',
      userId: '3s4xi97t2ktgntf'
    };
    console.log(await addPosts(body, ctx));
  });
});

async function createTestTable() {
  const db = drizzle(__D1_BETA__D1DATA);
  db.run(sql`SELECT * FROM "users"`);
  // db.run(sql`
  // CREATE TABLE "categories" (
  //   "id" text PRIMARY KEY NOT NULL,
  //   "title" text,
  //   "body" text,
  //   "createdOn" integer,
  //   "updatedOn" integer
  // )`);

  // db.run(sql`
  // CREATE TABLE "users" (
  //   "id" integer PRIMARY KEY NOT NULL,
  //   "user_login" text,
  //   "user_pass" text,
  //   "user_nicename" text,
  //   "user_email" text,
  //   "user_status" integer,
  //   "createdOn" integer,
  //   "updatedOn" integer
  // );
  // )`);

  // db.run(sql`
  // CREATE TABLE "comments" (
  //   "id" text PRIMARY KEY NOT NULL,
  //   "body" text,
  //   "userId" text,
  //   "postId" integer,
  //   "createdOn" integer,
  //   "updatedOn" integer
  // );
  // )`);

  // db.run(sql`
  // CREATE TABLE "posts" (
  //   "id" text PRIMARY KEY NOT NULL,
  //   "title" text,
  //   "body" text,
  //   "userId" text,
  //   "createdOn" integer,
  //   "updatedOn" integer
  // );
  // )`);

  // let res = await db.run(sql`
  // CREATE TABLE "categoriesToPosts" (
  //   "id" text NOT NULL,
  //   "postId" text NOT NULL,
  //   "categoryId" text NOT NULL,
  //   "createdOn" integer,
  //   "updatedOn" integer,
  //   FOREIGN KEY ("postId") REFERENCES "posts"("id") ON UPDATE no action ON DELETE no action,
  //   FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON UPDATE no action ON DELETE no action
  // );
  // `);

  return db;
}
