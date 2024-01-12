import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { auditSchema } from "./audit";
import * as terms from "./terms";

export const tableName = "termmeta";

export const route = "termmeta";

export const definition = {
  id: integer("id").primaryKey(),
  term_id: integer("term_id")
    .notNull()
    .references(() => terms.table.id),
  meta_key: text("meta_key"),
  meta_value: text("meta_value"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});

export const relation = relations(table, ({ many }) => ({
  term_id: many(terms.table),
}));
