const router = require("koa-router")()

router.get('/travelNotes', async (ctx, next) => {
  await ctx.render("./html/travelNotes/index.html");
});

module.exports = router
