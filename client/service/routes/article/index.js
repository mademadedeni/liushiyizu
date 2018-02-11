const router = require("koa-router")();

router.get("/article", async (ctx,next) =>{
	await ctx.render("/dist/html/article/index.html");
});

module.exports = router;