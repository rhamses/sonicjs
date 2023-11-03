import { text } from "drizzle-orm/sqlite-core";

export const tableName = "options";
export const route = "options";
export const optionsSchema = {
  id: text("id").primaryKey(),
  option_name: text("option_name"),
  option_value: text("option_value"),
  autoload: text("autoload"),
};
