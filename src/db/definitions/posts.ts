import { text, integer } from "drizzle-orm/sqlite-core";
import users from "../schema/users";
import posts from "../schema/posts";

export const tableName = "posts";
export const route = "posts";
export const postsSchema = {
  id: text("id").primaryKey(),
  post_author: text("post_author")
    .notNull()
    .references(() => users.id),
  post_content: text("post_content"),
  post_title: text("post_title"),
  post_excerpt: text("post_excerpt"),
  guid: text("guid"),
  post_type: text("post_type"),
  post_parent: integer("post_parent").references(() => posts.id),
};
