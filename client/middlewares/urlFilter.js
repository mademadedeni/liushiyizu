const utils = require('../utils/utils.js');
var url_filter = async (ctx, next) => {

    var reg = new RegExp('/');

    try {
        var mobileFilter = new RegExp("^/mobile");
        var staticFilter = new RegExp("^/static|/api")
        if (!mobileFilter.test(ctx.originalUrl) && utils.isMobile(ctx.headers['user-agent']) && !staticFilter.test(ctx.originalUrl)) {
            ctx.redirect("/mobile"+ctx.originalUrl);
        }

        //禁止访问html文件
        if (/^\/html|\.html$/.test(ctx.originalUrl)) {
            ctx.redirect('/404');
            return false;
        }
        //先去执行路由
        await next();
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
    } catch (error) {
        console.log(error);
    }
}


module.exports = url_filter;