import { Taxonomy } from "./sections/taxonomy";
import { WPLike } from "../../../../data/wplike-data";

export class SetupController {
  ctx;
  d1Data;
  KVDATA;
  body;
  viewParam;
  posttype;
  pageID;
  pageResponse;
  tableOrder;
  wp;
  constructor(ctx) {
    this.tableOrder = [
      "posts",
      "postmeta",
      "reltermpost",
      "users",
      "terms",
      "taxonomy",
    ];
    this.ctx = ctx;
    this.d1Data = this.ctx.env.__D1_BETA__D1DATA
      ? this.ctx.env.__D1_BETA__D1DATA
      : this.ctx.env.D1DATA;
    this.KVDATA = this.ctx.env.KVDATA;
    this.body = this.ctx.req.parseBody();
    this.pageResponse = { children: "" };
    this.posttype = this.ctx.req.param("posttype");
    this.posttype = this.ctx.req.param("posttype");
    this.pageID = this.ctx.req.param("id");
    this.wp = new WPLike(this.d1Data, this.KVDATA);
    this.viewParam = {
      ctx: this.ctx,
      d1Data: this.d1Data,
      kvdata: this.KVDATA,
      posttype: this.posttype,
      query: this.ctx.req.query(),
      taxonomy: {},
      body: {},
    };
  }
}
