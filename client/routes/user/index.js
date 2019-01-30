const router = require('koa-router')();
const axios = require('axios');

router.get("/user/private", async (ctx, next) => {
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
			console.log(err)
			ctx.redirect("/error/500");
		});

	if (!isLogin) {
		await ctx.render("./html/misc/login.html");
		return;
	}

	await ctx.render("./html/user/index.html");
});

module.exports = router