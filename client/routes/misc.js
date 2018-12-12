const router = require('koa-router')()
const misc_controller = require("../controllers/misc_controller");

router.get('/search', async (ctx, next) => {
	await ctx.render("./html/misc/search.html");
});

router.get('/login', async (ctx, next) => {
	await ctx.render("./html/misc/login.html");
});

router.get('/mobile/login', async (ctx, next) => {
	await ctx.render("./mobile/html/misc/login.html");
});

module.exports = router