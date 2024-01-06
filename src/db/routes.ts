import * as users from "./schema/users";
import * as usermeta from "./schema/usermeta";
import * as posts from "./schema/posts";
import * as postmeta from "./schema/postmeta";
import * as reltermpost from "./schema/reltermpost";
import * as terms from "./schema/terms";
import * as termmeta from "./schema/termmeta";
import * as options from "./schema/options";
import * as taxonomy from "./schema/taxonomy";

export interface ApiConfig {
  table: string;
  route: string;
}

export const apiConfig: ApiConfig[] = [];

export const tableSchemas = {
  users,
  usermeta,
  posts,
  postmeta,
  reltermpost,
  terms,
  termmeta,
  options,
  taxonomy,
};

for (const key of Object.keys(tableSchemas)) {
  apiConfig.push({
    table: tableSchemas[key].tableName,
    route: tableSchemas[key].route,
  });
}
