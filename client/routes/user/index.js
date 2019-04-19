const router = require('koa-router')();
const axios = require('axios');

router.get(["/user/private","/user/userInfo"], async (ctx, next) => {
	var isLogin = true;
	await axios({
			url: '/api/users/checkLogin',
			headers: ctx.headers
		})
		.then(function({data}) {
			if (data.message !== "success") {
				isLogin = false;
			}
		})
		.catch(function(err) {
			console.log(err.Error,err.config.url);
		});

	if (!isLogin) {
		await ctx.render("./html/misc/login.html");
		return;
	}

	await ctx.render("./html/user/index.html");
});

router.get("/user/article",async (ctx, next) => {
	var isLogin = true;
	await axios({
			url: '/api/users/checkLogin',
			headers: ctx.headers
		})
		.then(function({data}) {
			if (data.message !== "success") {
				isLogin = false;
			}
		})
		.catch(function(err) {
			console.log(err.Error,err.config.url);
		});

	if (!isLogin) {
		await ctx.render("./html/misc/login.html");
		return;
	}

	await ctx.render("./html/user/article.html");
});

module.exports = router