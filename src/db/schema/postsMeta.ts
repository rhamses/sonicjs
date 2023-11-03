import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tableName, postsMetaSchema } from "../definitions/postsMeta";
import { auditSchema } from "../definitions/audit";

export default sqliteTable(tableName, {
  ...postsMetaSchema,
  ...auditSchema,
});
