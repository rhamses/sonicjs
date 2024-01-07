import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { auditSchema } from "./audit";
import * as terms from "./terms";
import * as posts from "./posts";

export const tableName = "reltermpost";

export const route = "reltermpost";

export const definition = {
  id: integer("id").primaryKey(),
  term_id: integer("term_id")
    .notNull()
    .references(() => terms.table.id),
  post_id: integer("post_id")
    .notNull()
    .references(() => posts.table.id),
  term_order: integer("term_order"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});

export const relation = relations(table, ({ many }) => ({
  term_id: many(terms.table),
  post_id: many(posts.table),
}));
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { auditSchema } from "./audit";
import * as terms from "./terms";
import * as posts from "./posts";

export const tableName = "reltermpost";

export const route = "reltermpost";

export const definition = {
  id: text("id").primaryKey(),
  term_id: integer("term_id")
    .notNull()
    .references(() => terms.table.id),
  post_id: integer("post_id")
    .notNull()
    .references(() => posts.table.id),
  term_order: integer("term_order"),
};

export const table = sqliteTable(tableName, {
  ...definition,
  ...auditSchema,
});

export const relation = relations(table, ({ many }) => ({
  term_id: many(terms.table),
  post_id: many(posts.table),
}));
