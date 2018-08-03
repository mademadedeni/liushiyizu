var url_filter = async (ctx, next) => {

    var reg = new RegExp('/');

    try {
        //先去执行路由
        await next();
    } catch (error) {
        console.log(error);
    }
    if (reg.test(ctx.originalUrl)) {
        var reg = new RegExp("^/css|/js|/images|/font|/upload");
        if (reg.test(ctx.originalUrl)) {
            return false;
        }
        switch (ctx.response.status) {
            case 200:

                break;
            case 404:
                await ctx.render("./html/error/404.html");
                break;
            case 500:
                await ctx.render("./html/error/500.html");
                break;
        }
    }
}


module.exports = url_filter;