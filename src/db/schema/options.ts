import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = "options";

export const route = "options";

export const definition = {
  id: integer("id").primaryKey(),
  option_name: text("option_name"),
  option_value: text("option_value"),
  autoload: text("autoload"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";

export const tableName = "options";

export const route = "options";

export const definition = {
  id: text("id").primaryKey(),
  option_name: text("option_name"),
  option_value: text("option_value"),
  autoload: text("autoload"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});
