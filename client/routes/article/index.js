const router = require("koa-router")();
const proxy = require("../../utils/proxy");

router.get("/articles", async (ctx, next) => {
	await ctx.render("./html/article/index.html");
});
router.get("/articles/:article_id", async (ctx, next) => {
	await ctx.render("./html/article/article.html",{article_id:ctx.params.article_id});
});
router.get(["/articles/editor","/articles/editor/:article_id"], async (ctx, next) => {
	var isLogin = false;
	await proxy.request({
			uri:'/api/users/checkLogin',
			headers:ctx.headers
		})
	    .then(function (res) {
	    	var data = JSON.parse(res);
	        if(data.message !== "success"){
	        	isLogin = true;
	        }
	    })
	    .catch(function (err) {
	        console.log(err)
	        ctx.redirect("/error/500");
	    });
	if (isLogin) {
		await ctx.render("./html/misc/login.html");
		return false;
	}
	var  article_title = ctx.params.article_id?"编辑文章":"创建文章";
	await ctx.render("./html/article/editArticle.html",{article_title:article_title,article_id:ctx.params.article_id});
});

module.exports = router;