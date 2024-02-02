import { getRecords, insertRecord, updateRecord } from "../../../../data/data";
import { getHeaders } from "../../../utils/tableHeaders";
import { Layout } from "../default";
import { List } from "../pages/list";
import { AddNew } from "../pages/addnew";
import { getSchemaFromTable } from "../../../../data/d1-data";
import { SetupController } from "./setup";
import { bucketUploadFile } from "../../../../bucket/bucket";
import { FieldsController } from "./fields";

export class RouterController extends SetupController {
  constructor(ctx) {
    super(ctx);
  }
  private pageLoad() {
    return this.ctx.html(Layout(this.pageResponse));
  }
  private getPage(page) {
    return (this.pageResponse.children = page(this.viewParam));
  }
  private async prepareBody() {
    const body = await this.body;
    // console.log("post-type", this.posttype);
    // console.log("body", body["posts['post_thumbnail']"]);
    // console.log("body", JSON.stringify(body));
    const includeData = {};
    const fieldsFormat = new FieldsController(this.ctx, body);
    // prepare record
    for (const key of Object.keys(body)) {
      if (body[key] != "") {
        if (key.includes("[")) {
          const table = key.split("[")[0]; // posts['post_thumbnail'] => posts
          if (getSchemaFromTable(table)) {
            await fieldsFormat.formatData(table, key);
          }
        }
      }
    }
    // console.log("===>includeData", JSON.stringify(includeData));
    console.log("===>fieldsFormat.data()", JSON.stringify(fieldsFormat.data));
    return fieldsFormat.data;
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
    this.pageLoad();
  }
  /**
   *
   * CRUD METHODS
   *
   */
  async add() {
    try {
      if (this.ctx.req.method == "GET") {
        if (this.posttype == "posts") {
          const taxonomy = "category";
          const categories = await this.wp.getTaxonomy(taxonomy, this.posttype);
          this.viewParam.taxonomy[taxonomy] = categories;
        }
        const page = this.getPage(AddNew);
        return this.pageLoad();
      } else if (this.ctx.req.method == "POST") {
        const body = await this.prepareBody();
        let lastID = {};
        let resultResponse;
        for (const table of this.tableOrder) {
          if (table in body) {
            switch (table) {
              case "taxonomy":
                body[table]["term_id"] = lastID["terms"];
                break;
              case "postmeta":
                body[table].map(
                  (record) => (record["post_id"] = lastID["posts"])
                );
                break;
              case "reltermpost":
                body[table].map(
                  (record) => (record["post_id"] = lastID["posts"])
                );
                break;
            }
            // console.log("===>table", JSON.stringify(table));
            // console.log("===>body[table]", JSON.stringify(body[table]));
            // CHECK IF BODY IS ARRAY TO INSERT MULTIPLE TIMES
            if (Array.isArray(body[table])) {
              for (const bodyValue of body[table]) {
                const insertRecordBody = {
                  table,
                  data: bodyValue,
                };
                const response = await insertRecord(
                  this.d1Data,
                  this.KVDATA,
                  insertRecordBody
                );
                if (Array.isArray(lastID[table])) {
                  lastID[table].push(response?.data?.id);
                } else {
                  lastID[table] = [response?.data?.id];
                }
                // PREPARE RESPONSE
                resultResponse = response;
                // console.log("===>responseArr", JSON.stringify(response));
                // console.log("===>lastIDArr", JSON.stringify(lastID));
              }
            } else {
              // console.log("+++++table", table);
              // console.log("+++++body[table]", JSON.stringify(body[table]));
              const insertRecordBody = {
                table,
                data: body[table],
              };
              const response = await insertRecord(
                this.d1Data,
                this.KVDATA,
                insertRecordBody
              );
              // console.log("++++response", JSON.stringify(response));
              // PREPARE RESPONSE
              lastID[table] = response?.data?.id;
              resultResponse = response;
              // console.log("===>responseSimples", JSON.stringify(response));
              // console.log("===>lastIDSimples", JSON.stringify(lastID));
            }
          }
        }
        // console.log("=====-----FIM DO LOOP-----=======");
        const { success, data, url } = this.responseLoad({
          response: resultResponse,
          url: "/client/list",
          success: true,
        });
        // return false;
        return this.pageRedirect(url);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  async edit() {
    if (this.ctx.req.method == "GET") {
      const { data } = await getRecords(
        this.ctx,
        this.posttype,
        { id: this.pageID },
        this.posttype + "-" + this.pageID + "-edit"
      );
      if (this.posttype == "posts") {
        const taxonomy = "category";
        const categories = await this.wp.getTaxonomy(taxonomy, this.posttype);
        this.viewParam.taxonomy[taxonomy] = categories;
      }
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
        const data = await this.wp.getTaxonomy(
          this.viewParam.query.type,
          this.posttype
        );
        bodyData = data;
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
      // console.log("====>error", error);
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
      switch (this.posttype) {
        case "posts":
          await this.wp.deletePost(this.pageID);
          break;
      }
      return this.ctx.json({
        success: true,
        message: "Delete Successful",
      });
    } catch (error) {
      console.log(error);
      this.ctx.json({ success: false, message: "Problem delete", error });
    }
  }
}
