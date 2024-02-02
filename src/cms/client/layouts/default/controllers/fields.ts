import { bucketUploadFile } from "../../../../bucket/bucket";
import { SetupController } from "./setup";

export class FieldsController {
  postBody;
  includedData;
  ctx;
  constructor(ctx, body) {
    this.ctx = ctx;
    this.postBody = body;
    this.includedData = {};
  }

  get data() {
    return this.includedData;
  }

  fieldKey(key) {
    return key.match(/'(.+)'/) ? key.match(/'(.+)'/)[1] : key; // posts['post_thumbnail'] => post_thumbnail
  }

  metaDataItem(key, value) {
    return {
      meta_key: key,
      meta_value: value,
    };
  }

  async formatData(table, key) {
    let fieldKey = this.fieldKey(key);
    let values = this.postBody[key];
    if (table.includes("reltermpost")) {
      values = this.formatRelTermPostTable(key, table);
    }
    if (table.includes("meta")) {
      values = this.formatMetaTable(key, table);
    }
    if (key.includes("post_thumbnail")) {
      table = "postmeta";
      values = await this.formatPostThumbnail(key, table);
    }
    // if (key.match(/[0-9]+/)) {
    //   fieldKey = "postmeta1";
    //   values = await this.formatNumberedFields(key);
    // }
    if (this.includedData[table] == undefined) {
      this.includedData[table] = {};
    }
    this.includedData[table][fieldKey] = values;
    return { table, fieldKey, values };
  }

  private formatNumberedFields(key) {
    const result = [];
    const arrIndex = key.match(/[0-9]+/)[0];
    const arrObjKey = key.replace("-" + arrIndex, "");
    if (result[arrIndex] == undefined) {
      result[arrIndex] = {};
    }
    result[arrIndex][arrObjKey] = this.postBody[key];
    return result;
  }

  private async formatPostThumbnail(key, table) {
    const fileToUpload = this.postBody[key];
    const file = await bucketUploadFile(this.ctx.env, fileToUpload);
    if (this.includedData[table] == undefined) {
      this.includedData[table] = [
        this.metaDataItem("_wp_attached_file", file.name),
      ];
    } else {
      this.includedData[table].push(
        this.metaDataItem("_wp_attached_file", file.name)
      );
    }
    return this.metaDataItem("_wp_attached_file", file.name);
  }
  private formatMetaTable(key, table) {
    const body = this.postBody;
    const fieldKey = this.fieldKey(key);
    for (const [idx, item] of body[key].entries()) {
      if (item) {
        if (this.includedData[table] == undefined) {
          this.includedData[table] = [];
          this.includedData[table][idx] = {};
        }
        this.includedData[table][idx][fieldKey] = item;
      }
    }
  }

  private formatRelTermPostTable(key, table) {
    const body = this.postBody;
    const fieldKey = this.fieldKey(key);
    let values = Object.values(body[key]);
    values = values.map((value) => {
      return { term_id: value };
    });
    if (this.includedData[table] == undefined) {
      this.includedData[table] = [];
    }
    this.includedData[table].push(...values);
    return values;
  }
}
