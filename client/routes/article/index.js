const router = require("koa-router")();

router.get("/article", async (ctx, next) => {
	await ctx.render("./html/article/index.html");
});
router.get("/article/:article_id", async (ctx, next) => {
	await ctx.render("./html/article/article.html",{article_id:ctx.params.article_id});
});
router.get(["/article/editor","/article/editor/:article_id"], async (ctx, next) => {
	var  article_title = ctx.params.article_id?"编辑文章":"创建文章";
	await ctx.render("./html/article/editArticle.html",{article_title:article_title,article_id:ctx.params.article_id});
});

module.exports = router;