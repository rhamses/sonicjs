import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { auditSchema } from "./audit";
import * as users from "./users";

export const tableName = "usermeta";

export const route = "usermeta";

export const definition = {
  id: integer("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.table.id),
  meta_key: text("meta_key"),
  meta_value: text("meta_value"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});

export const relation = relations(table, ({ many }) => ({
  user_id: many(users.table),
}));
