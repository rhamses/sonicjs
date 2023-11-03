import { Hono } from "hono";
import { Login, Recovery } from "./pages/content";
const login = new Hono();

login.get("/", async (ctx) => {
  return ctx.html(await Login());
});

login.post("/", async (ctx) => {
  const { username, password } = await ctx.req.parseBody();
  if (username === "rhamses" && password === "abc123") {
    return ctx.redirect("/admin");
  } else {
    const props = {
      isError: true,
      errorMsg:
        "Error: The username is not registered on this site. If you are unsure of your username, try your email address instead.",
    };
    return ctx.html(await Login(props));
  }
});

login.get("/recovery", async (ctx) => {
  const props = {
    errorMsg:
      "Please enter your username or email address. You will receive an email message with instructions on how to reset your password.",
  };
  return ctx.html(await Recovery(props));
});

login.post("/recovery", async (ctx) => {
  const { username } = await ctx.req.parseBody();
  let props;
  if (username) {
    props = {
      errorMsg: "Your email has been sent",
    };
  }
  return ctx.html(await Recovery(props));
});

export { login };

/*
 Login States:
 
 1- User does not exist
 <b>Error:</b> The username asdasd is not registered on this site. If you are unsure of your username, try your email address instead.

 2- Password Wrong
 Error: The password you entered for the username admin is incorrect. Lost your password?
*/
