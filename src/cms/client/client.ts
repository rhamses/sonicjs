import { Hono } from "hono";
import { Layout } from "./layouts/default/default";

const client = new Hono();

client.get("/", (ctx) => {
  return ctx.html(Layout());
});

export { client };
