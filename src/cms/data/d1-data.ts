import { drizzle } from "drizzle-orm/d1";
import { v4 as uuidv4 } from "uuid";
import { users } from "../../db/schema";
import { DefaultLogger, LogWriter, eq } from "drizzle-orm";

export async function getAllContent(db) {
  const { results } = await db.prepare("SELECT * FROM users").all();
  return results;
}

export async function getByTable(db, table) {
  const { results } = await db.prepare(`SELECT * FROM ${table};`).all();

  return results;
}

export async function getByTableAndId(db, table, id) {
  const { results } = await db
    .prepare(`SELECT * FROM ${table} where id = '${id}';`)
    .all();

  return results[0];
}

export async function saveData(d1, table, data) {
  if (!data.id) {
    data.id = uuidv4();
    return insertData(d1, table, data);
  } else {
    return updateData(d1, table, data);
  }
}

export async function insertData(d1, table, data) {
  const db = drizzle(d1);

  console.log("inserting data", data);

  const now = new Date().getTime();
  data.created_on = now;
  data.updated_on = now;
  delete data.contentType;
  delete data.submit;
  delete data.table;

  console.log(JSON.stringify(data, null, 4));

  let result = await db
    .insert(users)
    .values(data)
    .run();

  return result;
}

export async function updateData(d1, table, data) {
  const db = drizzle(d1);

  console.log(JSON.stringify(data, null, 4));

  // data.created_at = new Date();
  // data.updated_at = new Date().getTime();
  // delete data.id;
  delete data.contentType;
  delete data.submit;
  delete data.table;

  console.log(JSON.stringify(data, null, 4));


  let result = await db
    .update(users)
    .set( data )
    .where(eq(users.id, data.id))
    // .returning({ updated: users.updatedAt })
    .values()
    
  console.log("updating data result ", result);

  return result;
}
