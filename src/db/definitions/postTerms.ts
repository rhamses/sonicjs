import { text, integer } from "drizzle-orm/sqlite-core";
import terms from "../schema/terms";
import posts from "../schema/posts";

export const tableName = "postTerms";
export const route = "postTerms";
export const postsTermsSchema = {
  id: text("id").primaryKey(),
  term_id: integer("term_id")
    .notNull()
    .references(() => terms.id),
  post_id: integer("post_id")
    .notNull()
    .references(() => posts.id),
  term_order: integer("term_order"),
};
