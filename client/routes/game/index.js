const router = require('koa-router')()

router.get('/game', async (ctx, next) => {
	await ctx.render("./html/game/index.html");
});
router.get('/game/gluttonousSnake', async (ctx, next) => {
	await ctx.render("./html/game/snake.html");
});


module.exports = router