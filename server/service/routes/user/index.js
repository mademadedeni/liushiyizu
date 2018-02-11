const router = require('koa-router')()

router.get("/user/private",async (ctx,next) => {
	await ctx.render("./dist/html/user/index.html");
});

module.exports = router