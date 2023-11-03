import { text, integer } from "drizzle-orm/sqlite-core";
import posts from "../schema/posts";

export const tableName = "postsMeta";
export const route = "postsMeta";
export const postsMetaSchema = {
  id: text("id").primaryKey(),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.id),
  meta_key: text("meta_key"),
  meta_value: text("meta_value"),
};
