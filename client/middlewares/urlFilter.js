var ApiError = require('../error/ApiError');

/**
 * 在app.use(router)之前调用
 */
//响应处理
var response_dispose = (ctx) =>{
    var reg = new RegExp("^/css|/js|/images|/font|/upload");
    if (reg.test(ctx.originalUrl)) {return false;}
    switch(ctx.response.status) {
        case 200:
            console.log("response dispose success");
            break;
        case 404:
            console.log('all 404')
            ctx.redirect("/error/404");
            break;
        case 500:
            console.log('all 500')
            ctx.redirect("/error/500");
            break;
    }
}

var url_filter = (pattern) => {

    return async (ctx, next) => {

        var reg = new RegExp(pattern);

        try {
            //先去执行路由
            await next();
        } catch (error) {
            console.log(error);
        }
        //通过正则的url进行格式化处理
        if(reg.test(ctx.originalUrl)){
            response_dispose(ctx);
        }
    }
}

module.exports = url_filter;