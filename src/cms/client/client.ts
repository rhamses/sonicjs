import { Hono } from "hono";
import { Layout } from "./layouts/default/default";
import { List } from "./layouts/default/pages/list";
import { AddNew } from "./layouts/default/pages/addnew";
const client = new Hono();

client.get("/", (ctx) => {
  return ctx.html(Layout({}));
});

client.get("/list/:posttype", (ctx) => {
  const pageName = ctx.req.param("posttype");
  const url = ctx.req.url;
  return ctx.html(Layout({ children: List({ pageName, url }) }));
});

client.get("/add/:posttype", (ctx) => {
  const pageName = ctx.req.param("posttype");
  const url = ctx.req.url;
  return ctx.html(Layout({ children: AddNew({ pageName, url }) }));
});

client.post("/add/:posttype", async (ctx) => {
  const a = await ctx.req.parseBody();
  console.log("a", JSON.stringify(a));
  return ctx.html("<p>adasd</p>");
});

export { client };
