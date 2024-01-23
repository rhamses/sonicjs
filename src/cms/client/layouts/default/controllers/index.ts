import {
  deleteRecord,
  getRecords,
  insertRecord,
  updateRecord,
} from "../../../../data/data";
import { getHeaders } from "../../../utils/tableHeaders";
import { Layout } from "../default";
import { List } from "../pages/list";
import { AddNew } from "../pages/addnew";
import { getSchemaFromTable } from "../../../../data/d1-data";

export class RouterController {
  ctx;
  d1Data;
  KVDATA;
  body;
  viewParam;
  posttype;
  pageID;
  pageResponse;
  tableOrder;
  constructor(ctx) {
    this.tableOrder = ["users", "terms", "taxonomy"];
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
    this.viewParam = {
      d1Data: this.d1Data,
      posttype: this.posttype,
      query: this.ctx.req.query(),
      body: {},
    };
  }
  private pageLoad() {
    return this.ctx.html(Layout(this.pageResponse));
  }
  private getPage(page) {
    return (this.pageResponse.children = page(this.viewParam));
  }
  private async getDataHeader(data) {
    const headers = getHeaders(data);
    this.viewParam.body.headers = headers;
    this.viewParam.body.data = data;
  }
  private async prepareBody() {
    const body = await this.body;
    const includeData = {};
    // prepare record
    for (const key of Object.keys(body)) {
      if (key.includes("[")) {
        const table = key.split("[")[0];
        if (getSchemaFromTable(table)) {
          if (!includeData[table]) {
            includeData[table] = {};
          }
          const fieldKey = key.match(/'(.+)'/gim)[0].replaceAll("'", "");
          includeData[table][fieldKey] = body[key];
        }
      }
    }
    return includeData;
  }
  responseLoad(params) {
    let { response, url, success } = params;
    let { code, data, error } = response;
    url = url + "/" + this.posttype;
    if ("type" in this.viewParam.query) {
      url += "?type=" + this.viewParam.query.type;
    }
    if (!code || (code < 200 && code > 299)) {
      success = false;
      data = error;
      url += "?success=" + success;
    }
    return { success, data, url };
  }
  async pageRedirect(url) {
    const redirectUrl = url ? url : "/";
    return this.ctx.redirect(redirectUrl);
  }
  async pageEdit() {
    const { data } = await getRecords(
      this.ctx,
      this.posttype,
      { id: this.pageID },
      `user-${this.pageID}`,
      "fastest"
    );
    this.viewParam["body"] = { data };
    this.pageLoad(List);
  }
  /**
   *
   * CRUD METHODS
   *
   */
  async add() {
    if (this.ctx.req.method == "GET") {
      const page = this.getPage(AddNew);
      return this.pageLoad();
    } else if (this.ctx.req.method == "POST") {
      const body = await this.prepareBody();
      let lastID = 0;
      let resultResponse;
      for (const table of this.tableOrder) {
        if (table in body) {
          switch (table) {
            case "taxonomy":
              body[table]["term_id"] = lastID;
              break;
          }
          const insertRecordBody = {
            table,
            data: body[table],
          };
          const response = await insertRecord(
            this.d1Data,
            this.KVDATA,
            insertRecordBody
          );
          lastID = response?.data?.id;
          resultResponse = response;
        }
      }
      const { success, data, url } = this.responseLoad({
        response: resultResponse,
        url: "/client/list",
        success: true,
      });
      return this.pageRedirect(url);
    }
  }
  async edit() {
    if (this.ctx.req.method == "GET") {
      const { data } = await getRecords(
        this.ctx,
        this.posttype,
        { id: this.pageID },
        this.posttype + "-edit"
      );
      const headers = getHeaders(data);
      this.viewParam.body.headers = headers;
      this.viewParam.body.data = data;
      this.pageResponse.children = this.getPage(AddNew);
    } else if (this.ctx.req.method == "POST") {
      const body = await this.prepareBody();
      const updatedBody = {
        id: this.pageID,
        table: this.posttype,
        data: body[this.posttype],
      };
      const response = await updateRecord(
        this.d1Data,
        this.KVDATA,
        updatedBody
      );
      const { success, data, url } = this.responseLoad({
        response,
        url: "/client/list",
        success: true,
      });
      return this.pageRedirect(url);
    }
    return this.pageLoad();
  }
  async list() {
    try {
      let bodyData = [{}];
      if ("type" in this.viewParam.query) {
        const sql = `SELECT t.* FROM terms as t INNER JOIN taxonomy as x ON x.term_id = t.id WHERE x.taxonomy = "${this.viewParam.query.type}"`;
        const { results } = await this.d1Data.prepare(sql).all();
        bodyData = results;
      } else {
        const { data } = await getRecords(
          this.ctx,
          this.posttype,
          {},
          this.posttype + "-list"
        );
        bodyData = data;
      }
      const headers = getHeaders(bodyData);
      this.viewParam.body.headers = headers;
      this.viewParam.body.data = bodyData;
      this.pageResponse.children = this.getPage(List);
      return this.pageLoad();
    } catch (error) {
      console.log("====>error", error);
    }
  }
  async update() {
    const body = await this.body;
    body["id"] = this.pageID;
    const result = await updateRecord(this.d1Data, this.KVDATA, body);
    this.responseLoad(result);
  }
  async delete() {
    try {
      const data = await deleteRecord(this.d1Data, this.KVDATA, {
        id: this.pageID,
        table: this.posttype,
      });
      return this.ctx.json({
        success: true,
        message: "Delete Successful",
        data,
      });
    } catch (error) {
      console.log(error);
      this.ctx.json({ success: false, message: "Problem delete", error });
    }
  }
}
