const router = require('koa-router')();
const axios = require('axios');

router.get("/user/private", async (ctx, next) => {
	await axios({
			url:'/api/users/checkLogin',
			headers:ctx.headers
		})
	    .then(function ({data}) {
	        if(data.message !== "success"){
	        	ctx.redirect("/");
	        }
	    })
	    .catch(function (err) {
	        console.log(err)
	        ctx.redirect("/error/500");
	    });
	await ctx.render("./html/user/index.html");
});

module.exports = router