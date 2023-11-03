import { text } from "drizzle-orm/sqlite-core";
import users from "../schema/users";

export const tableName = "usersMeta";
export const route = "usersMeta";
export const usersMetaSchema = {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  meta_key: text("meta_key"),
  meta_value: text("meta_value"),
};
