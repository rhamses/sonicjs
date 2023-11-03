import { text, integer } from "drizzle-orm/sqlite-core";
import terms from "../schema/terms";

export const tableName = "terms";
export const route = "terms";
export const termsSchema = {
  id: text("id").primaryKey(),
  name: text("name"),
  slug: text("slug"),
  term_group: integer("term_group").references(() => terms.id),
};
