import { getRecords, insertRecord, updateRecord } from "../../../../data/data";
import { getHeaders } from "../../../utils/tableHeaders";
import { Layout } from "../default";
import { List } from "../pages/list";
import { AddNew } from "../pages/addnew";
import { getSchemaFromTable } from "../../../../data/d1-data";
import { SetupController } from "./setup";

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

    const includeData = {};
    // prepare record
    for (const key of Object.keys(body)) {
      if (body[key] != "") {
        if (key.includes("[")) {
          const table = key.split("[")[0];
          if (getSchemaFromTable(table)) {
            const fieldKey = key.match(/'(.+)'/)[1];
            if (!includeData[table]) {
              includeData[table] = {};
            }
            // FORMAT RELTERMPOST
            if (table.includes("reltermpost")) {
              let values = Object.values(body[key]);
              if (Array.isArray(values)) {
                values = values.map((value) => {
                  return {
                    term_id: value,
                  };
                });
                // console.log("====values1", values);
              } else {
                values = { term_id: values };
                // console.log("====values2", values);
              }
              includeData[table] = values;
            }
            // FORMAT META FIELDS
            if (table.includes("meta")) {
              // FORMAT META VALUES
              if (!Array.isArray(includeData[table])) {
                includeData[table] = [];
              }
              for (const [idx, item] of body[key].entries()) {
                if (includeData[table][idx] == undefined) {
                  includeData[table][idx] = {};
                }
                includeData[table][idx][fieldKey] = item;
              }
            }
            // FORMAT FIELDS WITH INDEXES ON THEM
            if (!fieldKey.match(/[0-9]+/)) {
              includeData[table][fieldKey] = body[key];
            } else {
              const arrIndex = fieldKey.match(/[0-9]+/)[0];
              const arrObjKey = fieldKey.replace("-" + arrIndex, "");
              if (!Array.isArray(includeData[table])) {
                includeData[table] = [];
              }
              if (includeData[table][arrIndex] == undefined) {
                includeData[table][arrIndex] = {};
              }
              includeData[table][arrIndex][arrObjKey] = body[key];
            }
          }
        }
      }
    }
    // console.log("===>includeData", JSON.stringify(includeData));
    // return false;
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
    this.pageLoad();
  }
  /**
   *
   * CRUD METHODS
   *
   */
  async add() {
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
            const insertRecordBody = {
              table,
              data: body[table],
            };
            const response = await insertRecord(
              this.d1Data,
              this.KVDATA,
              insertRecordBody
            );
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
      return this.pageRedirect(url);
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
