import { text, integer } from "drizzle-orm/sqlite-core";
import terms from "../schema/terms";

export const tableName = "termsMeta";
export const route = "termsMeta";
export const termsMetaSchema = {
  id: text("id").primaryKey(),
  term_id: integer("term_id")
    .notNull()
    .references(() => terms.id),
  meta_key: text("meta_key"),
  meta_value: text("meta_value"),
};
