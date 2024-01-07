import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";
import * as posts from "./posts";

export const tableName = "postmeta";

export const route = "postmeta";

export const definition = {
  id: text("id").primaryKey(),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.table.id),
  meta_key: text("meta_key"),
  meta_value: text("meta_value"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";
import * as posts from "./posts";

export const tableName = "postmeta";

export const route = "postmeta";

export const definition = {
  id: integer("id").primaryKey(),
  post_id: integer("post_id")
    .notNull()
    .references(() => posts.table.id),
  meta_key: text("meta_key"),
  meta_value: text("meta_value"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});
