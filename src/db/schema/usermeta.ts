import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { auditSchema } from "./audit";
import * as users from "./users";

export const tableName = "usermeta";

export const route = "usermeta";

export const definition = {
  id: text("id").primaryKey(),
  user_id: text("user_id")
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
