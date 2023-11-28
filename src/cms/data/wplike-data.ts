import { savePassword, slugify } from "./../util/helpers";
import { insertRecord, updateRecord } from "./data";
interface metaTable {
  id: string;
  meta_key: string;
  meta_value: any;
  table: string;
}
export class WPLike {
  d1Data: object;
  kvData: object;
  constructor(d1Data, kvData) {
    this.d1Data = d1Data;
    this.kvData = kvData;
  }

  async createTerm(params) {
    let { name, term_group } = params;
    if (!term_group) {
      term_group = 0;
    }
    const slug = slugify(name);
    const data = {
      table: "terms",
      data: {
        name,
        slug,
        term_group,
      },
    };
    const term = await insertRecord(this.d1Data, this.kvData, data);
    return term;
  }

  async createUser(params) {
    let {
      login: user_login,
      email: user_email,
      password: user_pass,
      nicename: user_nicename,
      status: user_status,
    } = params;

    // user_login = sanitize(user_login);
    user_pass = savePassword(user_pass);

    if (!user_status) {
      user_status = 0;
    }
    const data = {
      table: "users",
      data: {
        user_login,
        user_email,
        user_pass,
        user_nicename,
        user_status,
      },
    };
    const response = await insertRecord(this.d1Data, this.kvData, data);
    return response;
  }

  async createMeta(params: metaTable) {
    const { id, meta_key, meta_value, table } = params;
    if (!table) {
      return null;
    }
    const idField = table.split("meta")[0] + "_id";
    const data = {
      table,
      data: {
        meta_key,
        meta_value,
      },
    };
    data.data[idField] = id;
    return await insertRecord(this.d1Data, this.kvData, data);
  }

  async createTaxonomy(params) {
    let { id, taxonomy, description, parent } = params;
    if (!id) {
      return null;
    }
    taxonomy = slugify(taxonomy);
    const data = {
      table: "taxonomy",
      data: {
        taxonomy,
        description,
        parent,
        term_id: id,
      },
    };
    return await insertRecord(this.d1Data, this.kvData, data);
  }

  async createPost(params) {
    let {
      post_author,
      post_content,
      post_title,
      post_slug,
      post_excerpt,
      post_status,
      post_type,
      guid,
    } = params;

    if (post_title) {
      post_slug = slugify(post_title);
    }
    if (!post_excerpt) {
      post_excerpt = "";
    }
    const data = {
      table: "posts",
      data: {
        post_author,
        post_content,
        post_title,
        post_slug,
        post_excerpt,
        post_status,
        post_type,
        guid,
      },
    };

    const response = await insertRecord(this.d1Data, this.kvData, data);
    return response;
  }

  async createRelTermPost(params) {
    let { term_id, post_id, term_order } = params;
    if (!term_id || !post_id) {
      return null;
    }
    if (!term_order) {
      term_order = 0;
    }
    const data = {
      table: "reltermpost",
      data: {
        term_id,
        post_id,
        term_order,
      },
    };
    return await insertRecord(this.d1Data, this.kvData, data);
  }

  async createOption(params) {
    const { option_name, option_value } = params;
    const data = {
      table: "options",
      data: {
        option_name,
        option_value,
      },
    };
    return await insertRecord(this.d1Data, this.kvData, data);
  }

  async updateUser(params) {
    let {
      login: user_login,
      email: user_email,
      password: user_pass,
      nicename: user_nicename,
      status: user_status,
      id,
    } = params;

    const data = {
      table: "users",
      id,
      data: {},
    };

    if (user_login) {
      data.data["user_login"] = user_login;
    }
    if (user_email) {
      data.data["user_email"] = user_email;
    }
    if (user_pass) {
      user_pass = savePassword(user_pass);
      data.data["user_pass"] = user_pass;
    }
    if (user_nicename) {
      data.data["user_nicename"] = user_nicename;
    }
    if (user_status) {
      data.data["user_status"] = user_status;
    }
    const response = await updateRecord(this.d1Data, this.kvData, data);
    return response;
  }
}
