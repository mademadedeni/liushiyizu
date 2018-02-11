const router = require('koa-router')()

router.get("/user/private",async (ctx,next) => {
	if (!ctx.session.user) {
		ctx.redirect("/");
	}
	await ctx.render("./dist/html/user/index.html");
});

module.exports = router