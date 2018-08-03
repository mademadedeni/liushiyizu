const router = require('koa-router')();
const api = require('./api');
const error_router = require('./error_router.js');

router.use("/api",api.routes(), api.allowedMethods());

router.use(error_router.routes(), error_router.allowedMethods());

router.get("/", async (ctx, next) => {
	await ctx.render("./index.html");
});

module.exports = router;