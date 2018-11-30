const router = require('koa-router')()

router.get('/games', async (ctx, next) => {
	await ctx.render("./html/game/index.html");
});
router.get('/games/gluttonousSnake', async (ctx, next) => {
	await ctx.render("./html/game/snake.html");
});


module.exports = router