import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = "users";

export const route = "users";

export const definition = {
  id: text("id").primaryKey(),
  user_login: text("user_login"),
  user_pass: text("user_pass"),
  user_nicename: text("user_nicename"),
  user_email: text("user_email"),
  user_status: text("user_status"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});
