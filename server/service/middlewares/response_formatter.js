var ApiError = require('../error/ApiError');

/**
 * 在app.use(router)之前调用
 */
var response_formatter = (ctx) => {

    // 如果有返回数据，将返回数据添加到data中
    switch(ctx.response.status) {
        case 200:
            if (new RegExp("^/api/editor").test(ctx.originalUrl)) {
                return;
            }
            if (ctx.body) {
                if (ctx.body.code) {
                    ctx.body = {
                        code: ctx.body.code,
                        message: ctx.body.message,
                        data: ctx.body.data
                    }
                }else if (ctx.body.message) {
                    ctx.body = {
                        code: 0,
                        message: ctx.body.message,
                        data:ctx.body.data
                    }
                }else if(ctx.type !== "image/jpg"){ // 验证码过滤
                    ctx.body = {
                        code: 0,
                        message: 'success',
                        data: ctx.body
                    }
                }
            }else {
                ctx.body = {
                    code: 0,
                    message: 'success'
                }
            }
            break;
        case 404:
            console.log('api 404')
            ctx.redirect("/error/404");
            break;
        case 500:
            ctx.redirect("/error/500");
            break;
    }
}

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
            ctx.redirect("/error/500");
            break;
    }
}

var url_filter = (pattern) => {

    return async (ctx, next) => {

        var reg = new RegExp(pattern);
        var loginReg = new RegExp("/update$");

        try {
            //先去执行路由
            await next();
        } catch (error) {
            //如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
            if(error instanceof ApiError && reg.test(ctx.originalUrl)){
                ctx.status = 200;
                ctx.body = {
                    code: error.code,
                    message: error.message
                }
            }
            //继续抛，让外层中间件处理日志
            throw error;
        }
        
        //通过正则的url进行格式化处理
        if(reg.test(ctx.originalUrl)){
            response_formatter(ctx)
        }else{
            response_dispose(ctx);
        }
    }
}

module.exports = url_filter;