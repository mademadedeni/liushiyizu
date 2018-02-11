const router = require('koa-router')()
const misc_controller = require("../controllers/misc_controller");

router.get('/search', async (ctx, next) => {
	await ctx.render("./dist/html/misc/search.html");
});

router.get('/img/captcha', misc_controller.captcha);

module.exports = router