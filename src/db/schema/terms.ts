import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";
import * as terms from "./terms";

export const tableName = "terms";

export const route = "terms";

export const definition = {
  id: integer("id").primaryKey(),
  name: text("name"),
  slug: text("slug"),
  term_group: integer("term_group"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { auditSchema } from "./audit";
import * as terms from "./terms";

export const tableName = "terms";

export const route = "terms";

export const definition = {
  id: text("id").primaryKey(),
  name: text("name"),
  slug: text("slug"),
  term_group: integer("term_group").references(() => terms.table.id),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});
