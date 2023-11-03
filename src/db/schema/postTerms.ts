import { sqliteTable } from "drizzle-orm/sqlite-core";
import { tableName, postsTermsSchema } from "../definitions/postTerms";
import { auditSchema } from "../definitions/audit";

export default sqliteTable(tableName, {
  ...postsTermsSchema,
  ...auditSchema,
});
