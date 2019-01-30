var ApiError = require('../error/ApiError');
var user_controller = require('../controllers/user_controller.js');
const config = require('../config/index.js');
/**
 * 在app.use(router)之前调用
 */
var response_formatter = (ctx) => {
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
        } else if (ctx.body.message) {
            ctx.body = {
                code: config.CODE_SUCCESS,
                message: ctx.body.message,
                data: ctx.body.data
            }
        } else if (ctx.type !== "image/jpg") { // 验证码过滤
            ctx.body = {
                code: config.CODE_SUCCESS,
                message: 'success',
                data: ctx.body
            }
        }
    } else {
        ctx.body = {
            code: config.CODE_SUCCESS,
            message: 'success'
        }
    }
}

// //响应处理
var response_dispose = (ctx) => {
    var reg = new RegExp("^/css|/js|/images|/font|/upload");
    if (reg.test(ctx.originalUrl)) {
        return false;
    }
}

var url_filter = async (ctx, next) => {

    var regApi = new RegExp("/api");
    var regs = ['/api/users', '/api/note'];
    var unRegs = ['/api/users/login'];
    var isNeedLogin = false;
    for (var i = 0; i < regs.length; i++) {
        var reg = new RegExp(regs[i]);
        if (reg.test(ctx.originalUrl)) {
            isNeedLogin = true;
        }
    }
    for(var i = 0;i<unRegs.length;i++){
        var reg = new RegExp(unRegs[i]);
        if (reg.test(ctx.originalUrl)) {
            isNeedLogin = false;
            break;
        }
    }
    if (isNeedLogin) {
        await new Promise((resolve, reject) => {
            user_controller.checkLogin(ctx, next).then(function (result) {
                if (ctx.body.success == 'success') {
                    resolve(true);
                }else{
                    resolve(false);
                }
            });
        }).then(function (result) {
            if (!result) {
                return;
            }
        }).catch(function (err) {
            throw err;
        });
    }

    try {
        //先去执行路由
        await next();
    } catch (error) {
        //如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
        if (error instanceof ApiError && regApi.test(ctx.originalUrl)) {
            ctx.status = 200;
            ctx.body = {
                code: error.code,
                message: error.message
            }
        }
        //继续抛，让外层中间件处理日志
        throw error;
    }

    switch (ctx.status) {
        case 200:
            //通过正则的url进行格式化处理
            if (regApi.test(ctx.originalUrl)) {
                response_formatter(ctx)
            } else {
                response_dispose(ctx);
            }
            break;
        case 404:
            await ctx.render('./404.html');
            break;
        case 500:
            await ctx.render('./500.html');
            break;
        default:
            break;
    }
}

module.exports = url_filter;