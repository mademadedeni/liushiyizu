const utils = require('../../utils/utils.js');
const axios = require('axios');
const fs = require('fs');
const router = require('koa-router')();

router.prefix('/mobile');

router.get(["/games","/travelNotes"],async (ctx,next)=>{
	ctx.redirect("/");
});

router.get("/friends",async (ctx,next)=>{
	var userData = {};
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
	await ctx.render("./mobile/html/friends/friends.html",{'userData':JSON.stringify(userData)});
});

router.get("/articles",async (ctx,next)=>{
	const renderer = require('vue-server-renderer').createRenderer({
	  template: fs.readFileSync(require('path').join(__dirname,'../../dist/mobile/html/article/article.html'), 'utf-8')
	});
	require(require('path').join(__dirname,'../../dist/mobile/ssr/header/header.js'));
	const app = require(require('path').join(__dirname,'../../dist/mobile/ssr/article/article.js'));
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
	            app.articles = res.data.data.articles;
	        }
	    })
	    .catch(function(err) {
	        console.log(err.Error,err.config.url);
	    });
	// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
	renderer.renderToString(app).then(html => {
	  ctx.body = html;
	}).catch(err => {
	  console.error(err)
	});
	// await ctx.render("./mobile/html/article/article.html");
});

router.get(["/article/create","/article/edit/:articleId"],async (ctx,next)=>{
	await ctx.render("./mobile/html/article/create.html",{articleId:ctx.params.articleId});
});

router.get("/articles/:articleId",async (ctx,next)=>{
	var article = {};
	var content1 = "";
	await axios({
	      url: '/api/articles/'+ctx.params.articleId,
	      headers: ctx.headers,
	    })
	    .then(function({data}) {
	        if (data.message == "success") {
	            article = data.data;
	            article.article = JSON.stringify(article);
	            article.article = article.article.replace(/\\/g,'\\\\');
	        }
	    })
	    .catch(function(err) {
	        console.log(err.Error,err.config.url);
	    });
	await ctx.render("./mobile/html/article/read.html",{'article':article,'content1':content1});
});

module.exports = router