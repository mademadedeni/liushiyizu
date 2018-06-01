const router = require("koa-router")()

router.get('/travelNotes', async (ctx, next) => {
  await ctx.render("./dist/html/travelNotes/index.html");
});

module.exports = router
