exports.getError = async (ctx,next) =>{
	switch (ctx.params.type){
		case '404':
			await ctx.render('./html/error/404.html');
			break;
		case '500':
			await ctx.render('./html/error/500.html');
			break;
	}	
}