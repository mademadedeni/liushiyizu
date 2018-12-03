const router = require('koa-router')();
const proxy = require("../../utils/proxy");

router.get("/user/private", async (ctx, next) => {
	await proxy.request({
			uri:'/api/users/checkLogin',
			headers:ctx.headers
		})
	    .then(function (res) {
	    	var data = JSON.parse(res);
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