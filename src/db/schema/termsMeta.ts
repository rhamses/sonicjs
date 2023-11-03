import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tableName, termsMetaSchema } from "../definitions/termsMeta";
import { auditSchema } from "../definitions/audit";

export default sqliteTable(tableName, {
  ...termsMetaSchema,
  ...auditSchema,
});
