import { Hono } from "hono";
import { cors } from "hono/cors";
import { WPLike } from "./cms/data/wplike-data";
import { api } from "./cms/api/api";
import { Bindings } from "./cms/types/bindings";
import { client } from "./cms/client/client";
import { admin } from "./cms/admin/admin";
// import { example } from "./custom/example";
import { status } from "./cms/api/status";
import { log } from "./cms/util/logger";

const app = new Hono<{ Bindings: Bindings }>();

//CORS
app.use(
  "/v1/*",
  cors({
    origin: (origin) => {
      return origin.indexOf("localhost") > 0 || origin.endsWith(".sonicjs.com")
        ? origin
        : "https://sonicjs.com";
    },
  })
);

//request Logging
app.use("*", async (ctx, next) => {
  if (ctx.req.path.indexOf("/admin") == 0 || ctx.req.path.indexOf("/v1") == 0) {
    log(ctx, { level: "info", method: ctx.req.method, url: ctx.req.path });
  }
  await next();
});

app.onError((err, ctx) => {
  console.log(`SonicJs Error: ${err}`);
  log(ctx, { level: "error", message: err });

  return ctx.text("SonicJs Error", 500);
});

app.get("/", async (ctx) => {
  return ctx.redirect("/admin");
});

app.get("/public/*", async (ctx) => {
  return await ctx.env.ASSETS.fetch(ctx.req.raw);
});

app.get("/setup", async (ctx) => {
  const { __D1_BETA__D1DATA, KVDATA, D1DATA } = ctx.env;
  const d1 = __D1_BETA__D1DATA ? __D1_BETA__D1DATA : D1DATA;
  const wpObject = new WPLike(d1, KVDATA);
  const result = await wpObject.setupDefaultValue();
  return ctx.json(result);
});

app.route("/v1", api);
app.route("/admin", admin);
// app.route("v1/example", example);
app.route("/status", status);
app.route("/client", client);
export default app;
