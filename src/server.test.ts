import app from "./server";

describe("Test the application", () => {
  it.only("should redirect to /admin", async () => {
    const res = await app.request("http://localhost/");
    expect(res.status).toBe(302);
  });
});
