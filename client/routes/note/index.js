const router = require('koa-router')()

router.get('/note', async (ctx, next) => {
  await ctx.render("./html/note/index.html");
});

module.exports = router
