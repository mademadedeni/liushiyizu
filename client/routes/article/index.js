const router = require("koa-router")();
const utils = require('../../utils/utils.js');
const config = require('../../config');
const axios = require('axios');
const path = require('path');

router.get("/articles", async (ctx, next) => {
	var articles = {};//返回结果data.articles
	var userData = '';
	var LiuHeader = "";
	const renderer = require('vue-server-renderer').createRenderer();
	var header = new (require(path.join(__dirname, '../../dist/mobile/ssr/header.js')))();

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
			if (err) {
				console.log(err.Error,err.config.url);
			}
			ctx.redirect("/error/500");
		});
	header.user = userData;
	renderer.renderToString(header, (err, html) => {
	  LiuHeader = html;
	});
	await axios.get('/api/articles',{
			headers: ctx.headers,
			params: {
				pageSize: 10,
				pageNum: 1,
				orderBy: 'article_edit_date'
			}
		})
		.then(function(res) {
			if (res.data.message == "success") {
				articles = res.data.data;
			}
		})
		.catch(function(err) {
			console.log(err.Error,err.config.url);
		});
	await ctx.render("./html/article/index.html", {
		"data": articles,
		"userData": JSON.stringify(userData),
		"dateFormat":utils.dateFormat,
		"ctx":config.ctx,
		"LiuHeader":LiuHeader,
	});
});
router.get("/articles/:article_id", async (ctx, next) => {
	var article = {};
	var userData = '';
	var LiuHeader = "";
	const renderer = require('vue-server-renderer').createRenderer();
	var header = require(path.join(__dirname, '../../dist/mobile/ssr/header.js'));
	header = new header();
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
			console.log(err.Error,err.config.url);
		});
	header.user = userData;
	renderer.renderToString(header, (err, html) => {
	  LiuHeader = html;
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
			}else if (res.data.message == 'not found') {
				ctx.redirect("/error/404");
			}
		})
		.catch(function(err) {
			console.log(err.Error,err.config.url);
		});
	await ctx.render("./html/article/article.html", {
		"article": article,
		"articleData": JSON.stringify(article),
		"userData": JSON.stringify(userData),
		"LiuHeader": LiuHeader
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
			console.log(err.Error,err.config.url);
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