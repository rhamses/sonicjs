import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tableName, usersSchema } from "../definitions/users";
import { auditSchema } from "../definitions/audit";

export default sqliteTable(tableName, {
  ...usersSchema,
  ...auditSchema,
});
