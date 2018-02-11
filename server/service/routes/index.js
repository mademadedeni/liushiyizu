const router = require('koa-router')()
const url = require('../../config/url');
const fs = require('fs');
const path = require("path");

router.get('/', async (ctx, next) => {
	await ctx.render("./dist/html/index.html");
	/*ctx.type = 'html';
	var filePath = path.join(url.webApp,"/dist/html", "index.html");
	var readH = function(path) {
		return new Promise(function(resolve, reject) {
			//Pending 进行中
			fs.readFile(path, (err, data) => {
				if (err) throw err;
				resolve(data);
			});
		})
	}
	try {
		await readH(filePath)
			.then(result => {
				if(ctx.session.user){
					var isLogin = true;
				}else{
					var isLogin = false;
				}
				ctx.body = result.toString().replace("${isLogin}",isLogin);
			}).catch(err => {
				if(err){
					console.log(1,err)
				}
			});
		console.log(2)
	} catch (err) {
		console.log(2,err);
	}*/
});

module.exports = router