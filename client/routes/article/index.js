const router = require("koa-router")();
const utils = require('../../utils/utils.js');
const config = require('../../config');
const axios = require('axios');

router.get("/articles", async (ctx, next) => {
	var articles = [];
	var userData = '';
	await axios({
			url: '/api/users/checkLogin',
			headers: ctx.headers
		})
		.then(function(res) {
			if (res.data.message === "success") {
				userData = res.data.data;
			}
		})
		.catch(function(err) {
			console.log(err)
			ctx.redirect("/error/500");
		});
	await axios({
			url: '/api/articles',
			headers: ctx.headers,
			data: {
				pageSize: 8,
				pageNum: 1,
				orderBy: 'article_edit_date'
			}
		})
		.then(function(res) {
			if (res.data.message == "success") {
				articles = res.data.data.articles;
			}
		})
		.catch(function(err) {
			console.error(err);
		});
	await ctx.render("./html/article/index.html", {
		"articles": JSON.stringify(articles),
		"userData": JSON.stringify(userData)
	});
});
router.get("/articles/:article_id", async (ctx, next) => {
	var article = {};
	var userData = '';
	await axios({
			url: '/api/users/checkLogin',
			headers: ctx.headers
		})
		.then(function(res) {
			if (res.data.message === "success") {
				userData = res.data.data;
			}
		})
		.catch(function(err) {
			console.log(err)
			ctx.redirect("/error/500");
		});
	await axios({
			url: '/api/articles/' + ctx.params.article_id,
			headers: ctx.headers
		})
		.then(function(res) {
			if (res.data.message == "success") {
				article = res.data.data;
				article.article_create_date = utils.dateFormat(article.article_create_date);
				article.article_edit_date = utils.dateFormat(article.article_edit_date);
				article.user_head_img = config.ctx + article.user_head_img;
				if (article.user_id == userData.user_id || userData.user_permission == 1) {
					article.isCreator = true;
				} else {
					article.isCreator = false;
				}
			}
		})
		.catch(function(err) {
			console.log(err)
			ctx.redirect("/error/500");
		});
	await ctx.render("./html/article/article.html", {
		"article": article,
		"articleData": JSON.stringify(article),
		"userData": JSON.stringify(userData)
	});
});
router.get(["/article/editor", "/article/editor/:article_id"], async (ctx, next) => {
	var isLogin = false;
	await axios({
			url: '/api/users/checkLogin',
			headers: ctx.headers
		})
		.then(function(res) {
			if (res.data.message !== "success") {
				isLogin = true;
			}
		})
		.catch(function(err) {
			console.log(err)
			ctx.redirect("/error/500");
		});
	if (isLogin) {
		await ctx.render("./html/misc/login.html");
		return false;
	}
	var article_title = ctx.params.article_id ? "编辑文章" : "创建文章";
	await ctx.render("./html/article/editArticle.html", {
		article_title: article_title,
		article_id: ctx.params.article_id
	});
});

module.exports = router;