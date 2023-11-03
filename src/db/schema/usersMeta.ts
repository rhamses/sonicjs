import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tableName, usersMetaSchema } from "../definitions/usersMeta";
import { auditSchema } from "../definitions/audit";

export default sqliteTable(tableName, {
  ...usersMetaSchema,
  ...auditSchema,
});
