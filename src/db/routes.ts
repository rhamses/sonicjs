import * as user from "./definitions/users";
import * as userMeta from "./definitions/usersMeta";
import * as post from "./definitions/posts";
import * as postMeta from "./definitions/postsMeta";
import * as postTerm from "./definitions/postTerms";
import * as term from "./definitions/terms";
import * as termMeta from "./definitions/termsMeta";
import * as option from "./definitions/options";

import * as users from "./definitions/users";
import * as usersMeta from "./definitions/usersMeta";
import * as posts from "./definitions/posts";
import * as postsMeta from "./definitions/postsMeta";
import * as postsTerm from "./definitions/postTerms";
import * as terms from "./definitions/terms";
import * as termsMeta from "./definitions/termsMeta";
import * as options from "./definitions/options";

export interface ApiConfig {
  table: string;
  route: string;
}
export const apiConfig: ApiConfig[] = [];
export const tableSchemaMap = new Map();
export const tableDefinitions = [
  user,
  userMeta,
  post,
  postMeta,
  postTerm,
  term,
  termMeta,
  option,
];
export const tableSchemas = [
  users,
  usersMeta,
  posts,
  postsMeta,
  postsTerm,
  terms,
  termsMeta,
  options,
];
for (const [index, table] of tableDefinitions.entries()) {
  tableSchemaMap.set(table.tableName, tableSchemas[index].default);
  apiConfig.push({
    table: table.tableName,
    route: table.route,
  });
}
