import { RouterController } from "./index";
const env = getMiniflareBindings();
const { __D1_BETA__D1DATA, KVDATA } = getMiniflareBindings();
const ctx = {
  env: { KVDATA: env.KVDATA, D1DATA: env.__D1_BETA__D1DATA },
  body: {},
  param(key) {
    switch (key) {
      case ":posttype":
        return "post";
        break;
      case ":id":
        return "1";
        break;
    }
  },
};
describe("test", () => {
  test("test test", () => {
    const rc = new RouterController(ctx);
    console.log("rc", rc);
  });
});
