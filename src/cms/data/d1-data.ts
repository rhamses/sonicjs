import { drizzle } from "drizzle-orm/d1";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { tableSchemas } from "../../db/routes";

export async function getAllContent(db) {
  const { results } = await db.prepare("SELECT * FROM users").all();
  return results;
}

export async function getD1DataByTable(db, table, params) {
  const sql = generateSelectSql(table, params);
  const { results } = await db.prepare(sql).all();

  return results;
}

export function generateSelectSql(table, params) {
  var whereClause = "";
  var sortBySyntax = "";
  var limitSyntax: string = "";
  var offsetSyntax = "";

  if (params) {
    const sortDirection = params.sortDirection ?? "asc";

    sortBySyntax = params.sortBy
      ? `order by ${params.sortBy} ${sortDirection}`
      : "";

    limitSyntax = params.limit > 0 ? `limit ${params.limit}` : "";

    offsetSyntax = params.offset > 0 ? `offset ${params.offset}` : "";
    whereClause = whereClauseBuilder(params);
  }

  let sql = `SELECT *, COUNT() OVER() AS total FROM ${table} ${whereClause} ${sortBySyntax} ${limitSyntax} ${offsetSyntax}`;
  sql = sql.replace(/\s+/g, " ").trim() + ";";

  return sql;
}

export async function getD1ByTableAndId(db, table, id) {
  const { results } = await db
    .prepare(`SELECT * FROM ${table} where id = '${id}';`)
    .all();

  return results[0];
}

export async function insertD1Data(d1, kv, table, data) {
  const db = drizzle(d1);

  const now = new Date().getTime();
  data.createdOn = now;
  data.updatedOn = now;
  delete data.table;

  const schmea = getRepoFromTable(table);
  try {
    if (!schmea.id) {
      delete data.id;
    }
    let result = await db.insert(schmea).values(data).returning().get();
    return result;
  } catch (error) {
    return error;
  }
}

export async function deleteD1ByTableAndId(d1, table, id) {
  console.log("deleteD1ByTableAndId", table, id);
  const db = drizzle(d1);

  const schmea = getRepoFromTable(table);
  let sql = await db.delete(schmea).where(eq(schmea.id, id)).toSQL();

  let result = await db.delete(schmea).where(eq(schmea.id, id)).run();

  return result;
}

export async function updateD1Data(d1, table, data) {
  const db = drizzle(d1);
  const schemaTable = table ?? data.table;
  const repo = getRepoFromTable(schemaTable);
  const recordId = data.id;
  if (data.data && data.data.id) {
    delete data.data.id;
  }

  const now = new Date().getTime();
  data.data.updatedOn = now;

  let result = await db
    .update(repo)
    .set(data.data)
    .where(eq(repo.id, recordId))
    .returning({ id: repo.id })
    .values();

  const id = result && result[0] ? result[0]["0"] : undefined;

  return { id } ?? result;
}

export function getSchemaFromTable(tableName) {
  return tableSchemas[tableName]?.definition;
}

export function getRepoFromTable(tableName) {
  return tableSchemas[tableName]?.table;
}

export function whereClauseBuilder(params) {
  let whereClause = "";
  const filters = params.filters;

  if (!filters) {
    return whereClause;
  }

  if (Array.isArray(filters)) {
    filters.map((field) => {
      console.log(field);
    });
  } else {
    console.log("---filters----");
    console.log(filters);
    const field = Object.keys(filters)[0];
    console.log(field);

    whereClause = `where ${field} = `;
  }

  return whereClause;
}
