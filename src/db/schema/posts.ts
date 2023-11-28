import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";
import * as users from "./users";

export const tableName = "posts";

export const route = "posts";

export const definition = {
  id: integer("id").primaryKey(),
  post_author: text("post_author")
    .notNull()
    .references(() => users.table.id),
  post_content: text("post_content"),
  post_title: text("post_title"),
  post_slug: text("post_slug"), // = post_name on WP db
  post_excerpt: text("post_excerpt"),
  post_status: text("post_status"),
  post_type: text("post_type"),
  guid: text("guid"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});
