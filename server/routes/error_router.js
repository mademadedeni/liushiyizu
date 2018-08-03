var router = require('koa-router')();


router.get("/error/404", async (ctx, next) => {
	await ctx.render("./404.html");
});

router.get("/error/500", async (ctx, next) => {
	await ctx.render("./500.html");
});

module.exports = router;