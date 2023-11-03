import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tableName, optionsSchema } from "../definitions/options";
import { auditSchema } from "../definitions/audit";

export default sqliteTable(tableName, {
  ...optionsSchema,
  ...auditSchema,
});
