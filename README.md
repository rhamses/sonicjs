# SonicJs Headless CMS

# Overview
## SonicJs: Empowering Global API Performance with Cloudflare Workers

Experience the power of SonicJs, a cutting-edge Headless CMS built on the robust Cloudflare Workers platform. SonicJs revolutionizes API performance, delivering an astounding average speed improvement of 🔥🔥🔥 6 times faster 🔥🔥🔥 than a standard node application.

Read the docs here [https://sonicjs.com]

## How Fast is "Blazingly" Fast?

| Platform      | Average Response Time | Difference |
| ----------- | ----------- | ----------- |
| Strapi      | 342.1ms       | - baseline - |
| Node + Postgres   | 320.2ms        | 1.06x Faster|
| SonicJs   | 52.7ms        | 6.4x Faster|

The details of our performance benchmark here is available at
[here](/performance-benchmarks). 

# Prerequisites
1. You will need a free Cloudflare account: [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
1. Install Wrangler CLI:
```
npm install -g wrangler
```
3. You will need to have four Cloudflare values during the first step of **Getting Started**:
    * Cloudflare account id which is your 32 character id at the end of your [https://dash.cloudflare.com/](https://dash.cloudflare.com/) url
    * For Cloudflare kv namespace id enter the following command in powershell as admin: 
      ```
      wrangler kv:namespace create sonicjs
      ```
    * Cloudflare kv namespace preview id enter the following command in powershell as admin: 
      ```
      wrangler kv:namespace create SonicJS --preview
      ```
    * Cloudflare database id enter the following command in powershell as admin: 
      ```
      wrangler d1 create SonicJS
      ```
If you receive the error:
`wrangler.ps1 cannot be loaded because running scripts is disabled on this system.`

Run this command on powershell as administrator and try running the wrangler commands from step 3:
```
Set-ExecutionPolicy RemoteSigned
```
If you already created a namespace and need to see your namespace id do:
```
wrangler kv:namespace list 
```

# Getting Started
```
npx create-sonicjs-app
```

Follow the installation script prompts to enter the required Cloudflare values.

One last step; we need to run the migration scripts to create our database tables:
```
npm run up
```

Now you're ready to fire up SonicJs!
```
npm run dev
```

Open the admin interface at:
[http://localhost:8788](http://localhost:8788)

Check out https://sonicjs.com/getting-started for next steps.

# Legacy
The legacy version of SonicJs (a Node.js based web content management system) can be found here:
[https://github.com/lane711/sonicjs/tree/legacy](https://github.com/lane711/sonicjs/tree/legacy)
