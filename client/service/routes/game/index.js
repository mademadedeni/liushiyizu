const router = require('koa-router')()

router.get('/game', async (ctx, next) => {
	await ctx.render("./dist/html/game/index.html");
});

module.exports = router