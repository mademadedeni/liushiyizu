const router = require('koa-router')()
const misc_controller = require("../controllers/misc_controller");

router.get('/search', async (ctx, next) => {
	await ctx.render("./html/misc/search.html");
});


module.exports = router