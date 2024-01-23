import { Hono } from "hono";
import { RouterController } from "./layouts/default/controllers";

const client = new Hono();
/**
 * LIST ROUTES
 */
client.get("/", async (ctx) => await new RouterController(ctx).list());
client.get(
  "/list/:posttype",
  async (ctx) => await new RouterController(ctx).list()
);
/**
 * ADD ROUTES
 */
client.get(
  "/add/:posttype",
  async (ctx) => await new RouterController(ctx).add()
);
client.post(
  "/add/:posttype",
  async (ctx) => await new RouterController(ctx).add()
);
/**
 * EDIT ROUTES
 */
client.get(
  "/edit/:posttype/:id",
  async (ctx) => await new RouterController(ctx).edit()
);
client.post(
  "/edit/:posttype/:id",
  async (ctx) => await new RouterController(ctx).edit()
);
/**
 * DELETE ROUTES
 */
client.delete(
  "/list/:posttype/:id",
  async (ctx) => await new RouterController(ctx).delete()
);
export { client };
