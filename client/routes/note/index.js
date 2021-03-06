const router = require('koa-router')();
const axios = require('axios');

router.get('/notes', async (ctx, next) => {
	await axios({
			url:'/api/users/checkLogin',
			headers:ctx.headers
		})
	    .then(function (res) {
	        if(res.data.message !== "success"){
	        	ctx.redirect("/");
	        }
	    })
	    .catch(function (err) {
	        console.log(err.Error,err.config.url);
	    });
	await ctx.render("./html/note/index.html");
});

module.exports = router
