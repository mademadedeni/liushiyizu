const router = require('koa-router')()


router.get('/note', async (ctx, next) => {
  await ctx.render("./dist/html/note/index.html");
});

module.exports = router
