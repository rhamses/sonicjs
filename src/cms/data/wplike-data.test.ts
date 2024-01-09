import { drizzle } from "drizzle-orm/d1";
import { sql } from "drizzle-orm";
import { insertRecord, getRecords, updateRecord } from "./data";
import { WPLike } from "./wplike-data";
import { slugify } from "../util/helpers";
const env = getMiniflareBindings();
const { __D1_BETA__D1DATA, KVDATA } = getMiniflareBindings();
const ctx = {
  env: { KVDATA: env.KVDATA, D1DATA: env.__D1_BETA__D1DATA },
};
// console.log("env", env);

it("should load env vars", async () => {
  expect(__D1_BETA__D1DATA).toBeDefined();
  expect(KVDATA).toBeDefined();
});

describe("Testing TERMS Tables", () => {
  beforeAll(async () => {
    const db = drizzle(__D1_BETA__D1DATA);
    // create the term table
    db.run(sql`CREATE TABLE "terms" (
      "id" integer PRIMARY KEY,
      "name" text,
      "slug" text,
      "term_group" integer,
      "createdOn" integer,
      "updatedOn" integer
    )`);
    // create term meta table
    db.run(sql`CREATE TABLE "termmeta" (
      "id" integer PRIMARY KEY NOT NULL,
      "term_id" integer NOT NULL,
      "meta_key" text,
      "meta_value" text,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON UPDATE no action ON DELETE no action
    )`);
  });

  describe("Testing Terms Table", () => {
    it("add default category", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      const data = {
        name: "Uncategorized",
      };
      const newRecord = await wpDefault.createTerm(data);
      // test get records

      const d1Result = await getRecords(
        ctx,
        "terms",
        { slug: "uncategorized" },
        null
      );
      //
      expect(newRecord).toBeDefined();
      expect(newRecord.data.slug).toEqual("uncategorized");
      expect(newRecord.data.term_group).toEqual(0);
    });
    it("should edit the category name and slug", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      const data = {
        name: "Uncategorized",
      };
      const term = await wpDefault.createTerm(data);
      // EDIT DATA AND SELECT THE RESULT
      const table = "terms";
      const editData = {
        id: term.data.id,
        name: "UncategorizedEdited",
      };
      const termEdited = await wpDefault.updateTerm(editData);
      const { id } = await termEdited.data;
      const termFind = await getRecords(ctx, table, { id }, null);
      expect(termEdited.code).toEqual(200);
      expect(id).toEqual(term.data.id);
      expect(termFind.data.name).toEqual(editData.name);
      expect(termFind.data.slug).toEqual(slugify(editData.name));
    });
    it("should edit the category term_group", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      const data = {
        name: "Uncategorized",
      };
      const term = await wpDefault.createTerm(data);
      // EDIT DATA AND SELECT THE RESULT
      const table = "terms";
      const editData = {
        id: term.data.id,
        term_group: 1,
      };
      const termEdited = await wpDefault.updateTerm(editData);
      const { id } = await termEdited.data;
      const termFind = await getRecords(ctx, table, { id }, null);
      expect(termEdited.code).toEqual(200);
      expect(id).toEqual(term.data.id);
      expect(termFind.data.term_group).toEqual(editData.term_group);
    });
  });

  describe("Testing Terms Meta Table", () => {
    it("should add meta data of given term category", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // create term first
      const data = {
        name: "Uncategorized",
      };
      const term = await wpDefault.createTerm(data);
      // create term meta data
      const metaData = {
        id: term.data.id,
        meta_key: "name",
        meta_value: "Real",
        table: "termmeta",
      };
      const termmeta = await wpDefault.createMeta(metaData);
      //
      expect(term).toBeDefined();
      expect(termmeta).toBeDefined();
      expect(termmeta.data.term_id).toEqual(term.data.id);
      expect(termmeta.data.meta_value).toEqual("Real");
    });
    it("should update meta info", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      const table = "termmeta";
      // create term first
      const data = {
        name: "Uncategorized",
      };
      const term = await wpDefault.createTerm(data);
      // create term meta data
      const metaData = {
        id: term.data.id,
        meta_key: "name",
        meta_value: "Real",
        table,
      };
      const termmeta = await wpDefault.createMeta(metaData);
      // Edit Meta Data
      const editData = {
        id: termmeta.data.id,
        meta_key: "nameEdited",
        meta_value: "ValueEdited",
        table,
      };
      const termmetaEdited = await wpDefault.updateMeta(editData);
      const { id } = await termmetaEdited.data;
      const termmetaFind = await getRecords(ctx, table, { id }, null);
      expect(term).toBeDefined();
      expect(termmeta).toBeDefined();
      expect(termmetaEdited.code).toEqual(200);
      expect(termmetaFind.data.meta_value).toEqual(editData.meta_value);
      expect(termmetaFind.data.meta_key).toEqual(editData.meta_key);
    });
  });
});

describe("Testing TAXONOMY Tables", () => {
  beforeAll(async () => {
    const db = drizzle(__D1_BETA__D1DATA);
    // create the term table
    db.run(sql`CREATE TABLE "taxonomy" (
      "id" integer PRIMARY KEY,
      "term_id" integer NOT NULL,
      "taxonomy" text,
      "description" text,
      "parent" integer,
      "count" integer,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the term table
    db.run(sql`CREATE TABLE "terms" (
      "id" integer PRIMARY KEY,
      "name" text,
      "slug" text,
      "term_group" integer,
      "createdOn" integer,
      "updatedOn" integer
    )`);
  });

  describe("Testing Taxonomy Table", () => {
    it("add default taxonomy + term", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // Create Default Term
      const termData = {
        name: "Uncategorized",
      };
      const term = await wpDefault.createTerm(termData);
      // Create Default Taxonomy
      const taxonomyData = {
        taxonomy: "category",
        description: "",
        parent: 0,
        id: term.data.id,
      };
      const taxonomy = await wpDefault.createTaxonomy(taxonomyData);
      //
      expect(taxonomy).toBeDefined();
      expect(taxonomy.data.term_id).toEqual(term.data.id);
    });
    it("update default taxonomy + term", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // Create Default Term
      const termData = {
        name: "Uncategorized",
      };
      const term = await wpDefault.createTerm(termData);
      // Create Default Taxonomy
      const taxonomyData = {
        taxonomy: "category",
        description: "",
        parent: 0,
        id: term.data.id,
      };
      const taxonomy = await wpDefault.createTaxonomy(taxonomyData);
      // Update Category
      const updatedData = {
        table: "taxonomy",
        id: taxonomy.data.id,
        data: {
          taxonomy: "category2",
        },
      };
      const updatedCategory = await updateRecord(
        __D1_BETA__D1DATA,
        KVDATA,
        updatedData
      );
      const { id } = await updatedCategory.data;
      const taxonomyFind = await getRecords(ctx, "taxonomy", { id }, null);
      expect(updatedCategory).toBeDefined();
      expect(updatedCategory.code).toEqual(200);
      expect(taxonomyFind.data.taxonomy).toEqual(updatedData.data.taxonomy);
    });
  });
});

describe("Testing USERS Tables", () => {
  beforeAll(async () => {
    // create the testing table
    const db = drizzle(__D1_BETA__D1DATA);
    db.run(sql`CREATE TABLE "users" (
      "id" integer PRIMARY KEY,
      "user_login" text,
      "user_pass" text,
      "user_nicename" text,
      "user_email" text,
      "user_status" integer,
      "createdOn" integer,
      "updatedOn" integer
    )`);
    // create the usermeta table
    db.run(sql`CREATE TABLE "usermeta" (
      "id" integer PRIMARY KEY,
      "user_id" integer NOT NULL,
      "meta_key" text,
      "meta_value" text,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON UPDATE no action ON DELETE no action
    )`);
  });

  describe("Testing Users Table", () => {
    it("should add default user", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      const data = {
        login: "admin",
        email: "admin@example.com",
        nicename: "The Admin",
        password: "abc123",
      };
      const newRecord = await wpDefault.createUser(data);
      expect(newRecord).toBeDefined();
      expect(newRecord.data.createdOn).toBeDefined();
      expect(newRecord.data.updatedOn).toBeDefined();
    });

    it("should update default user", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // add user to manipulate
      const data = {
        login: "admin",
        email: "admin@example.com",
        nicename: "The Admin",
        password: "abc123",
      };
      const user = await wpDefault.createUser(data);
      // Update user data
      const updateData = {
        id: user.data.id,
        login: "adminUpdated",
        email: "adminupdated@example.com",
        nicename: "The Admin Update",
        password: "123abc",
      };
      const userUpdate = await wpDefault.updateUser(updateData);
      const { id } = await userUpdate.data;
      const userFind = await getRecords(ctx, "users", { id }, null);
      //
      expect(user).toBeDefined();
      expect(userUpdate.code).toEqual(200);
      expect(updateData.login).toEqual(userFind.data.user_login);
      expect(updateData.email).toEqual(userFind.data.user_email);
      expect(updateData.nicename).toEqual(userFind.data.user_nicename);
      expect(updateData.password).not.toEqual(userFind.data.user_password);
    });

    it("should update default user with only one field", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // add user to manipulate
      const data = {
        login: "admin",
        email: "admin@example.com",
        nicename: "The Admin",
        password: "abc123",
      };
      const user = await wpDefault.createUser(data);
      // Update user data
      const updateData = {
        id: user.data.id,
        login: "adminUpdated",
      };
      const userUpdate = await wpDefault.updateUser(updateData);
      const { id } = await userUpdate.data;
      const userFind = await getRecords(ctx, "users", { id }, null);
      //
      expect(user).toBeDefined();
      expect(userUpdate.code).toEqual(200);
      expect(data.email).toEqual(userFind.data.user_email);
    });
    // it("should salt password", async () => {
    //   const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
    //   const data = {
    //     login: "admin",
    //     email: "admin@example.com",
    //     nicename: "The Admin",
    //     password: "abc123",
    //   };
    //   const newRecord = await wpDefault.createUser(data);
    //   expect(newRecord).toBeDefined();
    //   expect(newRecord.data.user_pass).not.toEqual("abc123");
    // });

    // it.todo("add user stripping tags", async () => {
    //   const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
    //   const data = {
    //     login: "admin<script>teste</script>",
    //     email: "admin@example.com",
    //     nicename: "The Admin",
    //     password: "abc123",
    //   };
    //   const newRecord = await wpDefault.createUser(data);
    //   console.log("newRecord", newRecord);
    //   expect(newRecord).toBeDefined();
    //   expect(newRecord.data.login).toEqual("admin");
    //   expect(newRecord.data.createdOn).toBeDefined();
    //   expect(newRecord.data.updatedOn).toBeDefined();
    // });
  });

  describe("Testing Users Meta Table", () => {
    it("should add capabilities info", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // creating the user first
      const userData = {
        login: "admin",
        email: "admin@example.com",
        nicename: "The Admin",
        password: "abc123",
      };
      const user = await wpDefault.createUser(userData);
      // adding the metadata
      const userMetaData = {
        id: user.data.id,
        meta_key: "capabilites",
        meta_value: JSON.stringify(["administrator"]),
        table: "usermeta",
      };
      const usermeta = await wpDefault.createMeta(userMetaData);
      //
      expect(user).toBeDefined();
      expect(usermeta).toBeDefined();
      expect(usermeta.data.meta_value).toStrictEqual(
        JSON.stringify(["administrator"])
      );
      expect(usermeta.data.user_id).toStrictEqual(user.data.id);
    });

    it("should add 2 meta infos - capabilities AND first name", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // creating the user first
      const userData = {
        login: "admin",
        email: "admin@example.com",
        nicename: "The Admin",
        password: "abc123",
      };
      const user = await wpDefault.createUser(userData);
      // adding the metadata
      const userMetaData = [
        {
          id: user.data.id,
          meta_key: "capabilites",
          meta_value: JSON.stringify(["administrator"]),
          table: "usermeta",
        },
        {
          id: user.data.id,
          meta_key: "first_name",
          meta_value: "TEST NAME",
          table: "usermeta",
        },
      ];
      const results = [];
      for (const meta of userMetaData) {
        results.push(await wpDefault.createMeta(meta));
      }
      expect(results).toHaveLength(2);
      expect(results[0].data.user_id).toStrictEqual(user.data.id);
      expect(results[1].data.user_id).toStrictEqual(user.data.id);
    });
  });
});

describe("Testing POSTS Tables", () => {
  beforeAll(async () => {
    const db = drizzle(__D1_BETA__D1DATA);
    // create the USER table
    db.run(sql`CREATE TABLE "users" (
      "id" integer PRIMARY KEY,
      "user_login" text,
      "user_pass" text,
      "user_nicename" text,
      "user_email" text,
      "user_status" integer,
      "createdOn" integer,
      "updatedOn" integer
    )`);
    // create the POST table
    db.run(sql`CREATE TABLE "posts" (
      "id" integer PRIMARY KEY,
      "post_author" text NOT NULL,
      "post_content" text,
      "post_title" text,
      "post_slug" text,
      "post_excerpt" text,
      "post_status" text,
      "post_type" text,
      "guid" text,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("post_author") REFERENCES "users"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the POST META table
    db.run(sql`CREATE TABLE "postmeta" (
        "id" integer PRIMARY KEY,
        "post_id" integer NOT NULL,
        "meta_key" text,
        "meta_value" text,
        "createdOn" integer,
        "updatedOn" integer,
        FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON UPDATE no action ON DELETE no action
      )`);
  });

  describe("Test Post Table", () => {
    it("should add default post", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // Add User Author
      const userData = {
        login: "admin",
        email: "admin@example.com",
        nicename: "The Admin",
        password: "abc123",
      };
      const user = await wpDefault.createUser(userData);
      // Add Post Content
      const data = {
        post_author: user.data.id,
        post_content: `<!-- wp:paragraph -->
<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>
<!-- /wp:paragraph -->`,
        post_title: "Hello World!",
        post_status: "publish",
        post_type: "post",
        guid: "http://localhost/",
      };
      const newRecord = await wpDefault.createPost(data);
      expect(newRecord).toBeDefined();
      expect(newRecord.data.createdOn).toBeDefined();
      expect(newRecord.data.updatedOn).toBeDefined();
    });
  });

  describe("Test Post Meta Table", () => {
    it("should add post meta table", async () => {
      const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
      // creating the author
      const userData = {
        login: "admin",
        email: "admin@example.com",
        nicename: "The Admin",
        password: "abc123",
      };
      const user = await wpDefault.createUser(userData);
      // creating the post data
      const data = {
        post_author: user.data.id,
        post_content: `<!-- wp:paragraph -->
<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>
<!-- /wp:paragraph -->`,
        post_title: "Hello World!",
        post_status: "publish",
        post_type: "post",
        guid: "http://localhost/",
      };
      const post = await wpDefault.createPost(data);
      // adding the metadata
      const postMetaData = {
        id: post.data.id,
        meta_key: "_wp_page_template",
        meta_value: "default",
        table: "postmeta",
      };
      const postmeta = await wpDefault.createMeta(postMetaData);
      //
      expect(user).toBeDefined();
      expect(post).toBeDefined();
      expect(postmeta.data.meta_value).toStrictEqual("default");
      expect(postmeta.data.post_id).toStrictEqual(post.data.id);
    });
  });
});

describe("Testing RELTERMPOST Tables", () => {
  beforeAll(async () => {
    const db = drizzle(__D1_BETA__D1DATA);
    // create the USER table
    db.run(sql`CREATE TABLE "users" (
      "id" integer PRIMARY KEY,
      "user_login" text,
      "user_pass" text,
      "user_nicename" text,
      "user_email" text,
      "user_status" integer,
      "createdOn" integer,
      "updatedOn" integer
    )`);
    // create the POST table
    db.run(sql`CREATE TABLE "posts" (
      "id" integer PRIMARY KEY,
      "post_author" text NOT NULL,
      "post_content" text,
      "post_title" text,
      "post_slug" text,
      "post_excerpt" text,
      "post_status" text,
      "post_type" text,
      "guid" text,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("post_author") REFERENCES "users"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the TERMS table
    db.run(sql`CREATE TABLE "terms" (
      "id" integer PRIMARY KEY,
      "name" text,
      "slug" text,
      "term_group" integer,
      "createdOn" integer,
      "updatedOn" integer
    )`);
    // create the RELTERMPOST TABLE
    db.run(sql`CREATE TABLE "reltermpost"(
      "id" integer PRIMARY KEY,
      "term_id" integer NOT NULL,
      "post_id" integer NOT NULL,
      "term_order" integer,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON UPDATE no action ON DELETE no action,
      FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON UPDATE no action ON DELETE no action
    )`);
  });
  it("should create the RelTermPost", async () => {
    const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
    // Add User Author
    const userData = {
      login: "admin",
      email: "admin@example.com",
      nicename: "The Admin",
      password: "abc123",
    };
    const user = await wpDefault.createUser(userData);
    // Add Term Content
    const termData = {
      name: "Uncategorized",
    };
    const term = await wpDefault.createTerm(termData);
    // Add Post Content
    const postData = {
      post_author: user.data.id,
      post_content: `<!-- wp:paragraph -->
<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>
<!-- /wp:paragraph -->`,
      post_title: "Hello World!",
      post_status: "publish",
      post_type: "post",
      guid: "http://localhost/",
    };
    const post = await wpDefault.createPost(postData);
    // Add RELTERMPOST Content
    const reltermpostData = {
      term_id: term.data.id,
      post_id: post.data.id,
    };
    const reltermpost = await wpDefault.createRelTermPost(reltermpostData);
    expect(reltermpost).toBeDefined();
    expect(reltermpost.data.term_id).toEqual(term.data.id);
    expect(reltermpost.data.post_id).toEqual(post.data.id);
  });
});

describe("Testing OPTIONS Tables", () => {
  beforeAll(async () => {
    const db = drizzle(__D1_BETA__D1DATA);
    // create the OPTIONS table
    db.run(sql`CREATE TABLE "options" (
      "id" integer PRIMARY KEY,
      "option_name" text,
      "option_value" text,
      "autoload" text,
      "createdOn" integer,
      "updatedOn" integer
    )`);
  });

  it("should add options data", async () => {
    const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
    const data = {
      option_name: "site_url",
      option_value: "https://example.com",
    };
    const option = await wpDefault.createOption(data);
    expect(option).toBeDefined();
    expect(option.data.option_name).toEqual("site_url");
    expect(option.data.option_value).toEqual("https://example.com");
    expect(option.code).toEqual(201);
  });

  it("should check if any given options exists on the table", async () => {
    const hasOnboarded = await getRecords(
      ctx,
      "options",
      {
        option_name: "has_onboarded",
      },
      null
    );
    expect(hasOnboarded.data.length).toEqual(0);
  });

  // it("should check if any given options is Boolean", async () => {
  //   const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
  //   const data = {
  //     option_name: "has_onboarded",
  //     option_value: "true",
  //   };
  //   const option = await wpDefault.createOption(data);
  //   //
  //   const hasOnboarded = await getRecords(
  //     ctx,
  //     "options",
  //     {
  //       option_name: option.data.option_name,
  //     },
  //     null
  //   );
  //   expect(hasOnboarded.data[0].option_value).toEqual("true");
  // });
});

describe("Testing the Setup Function", () => {
  beforeAll(() => {
    const db = drizzle(__D1_BETA__D1DATA);
    // create the term table
    db.run(sql`CREATE TABLE "terms" (
      "id" integer PRIMARY KEY,
      "name" text,
      "slug" text,
      "term_group" integer,
      "createdOn" integer,
      "updatedOn" integer
    )`);
    // create term meta table
    db.run(sql`CREATE TABLE "termmeta" (
      "id" integer PRIMARY KEY NOT NULL,
      "term_id" integer NOT NULL,
      "meta_key" text,
      "meta_value" text,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the taxonomy table
    db.run(sql`CREATE TABLE "taxonomy" (
      "id" integer PRIMARY KEY,
      "term_id" integer NOT NULL,
      "taxonomy" text,
      "description" text,
      "parent" integer,
      "count" integer,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the user table
    db.run(sql`CREATE TABLE "users" (
      "id" integer PRIMARY KEY,
      "user_login" text,
      "user_pass" text,
      "user_nicename" text,
      "user_email" text,
      "user_status" integer,
      "createdOn" integer,
      "updatedOn" integer
    )`);
    // create the usermeta table
    db.run(sql`CREATE TABLE "usermeta" (
      "id" integer PRIMARY KEY,
      "user_id" integer NOT NULL,
      "meta_key" text,
      "meta_value" text,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("user_id") REFERENCES "users"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the POST table
    db.run(sql`CREATE TABLE "posts" (
      "id" integer PRIMARY KEY,
      "post_author" text NOT NULL,
      "post_content" text,
      "post_title" text,
      "post_slug" text,
      "post_excerpt" text,
      "post_status" text,
      "post_type" text,
      "guid" text,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("post_author") REFERENCES "users"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the POST META table
    db.run(sql`CREATE TABLE "postmeta" (
        "id" integer PRIMARY KEY,
        "post_id" integer NOT NULL,
        "meta_key" text,
        "meta_value" text,
        "createdOn" integer,
        "updatedOn" integer,
        FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the RELTERMPOST TABLE
    db.run(sql`CREATE TABLE "reltermpost"(
      "id" integer PRIMARY KEY,
      "term_id" integer NOT NULL,
      "post_id" integer NOT NULL,
      "term_order" integer,
      "createdOn" integer,
      "updatedOn" integer,
      FOREIGN KEY ("term_id") REFERENCES "terms"("id") ON UPDATE no action ON DELETE no action,
      FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON UPDATE no action ON DELETE no action
    )`);
    // create the OPTIONS table
    db.run(sql`CREATE TABLE "options" (
      "id" integer PRIMARY KEY,
      "option_name" text,
      "option_value" text,
      "autoload" text,
      "createdOn" integer,
      "updatedOn" integer
    )`);
  });
  it("should create the default structure of the website", async () => {
    const wpDefault = new WPLike(__D1_BETA__D1DATA, KVDATA);
    const result = await wpDefault.setupDefaultValue();
    expect(result).not.toBe(null);
  });
});
