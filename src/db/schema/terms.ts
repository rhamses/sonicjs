import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tableName, termsSchema } from "../definitions/terms";
import { auditSchema } from "../definitions/audit";

export default sqliteTable(tableName, {
  ...termsSchema,
  ...auditSchema,
});
