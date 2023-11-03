import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tableName, postsSchema } from "../definitions/posts";
import { auditSchema } from "../definitions/audit";

export default sqliteTable(tableName, {
  ...postsSchema,
  ...auditSchema,
});
