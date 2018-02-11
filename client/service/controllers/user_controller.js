const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const user_sql = require('../lib/user_sql');
const userModel = require('../models/user_model');
const utils = require('../utils/utils');
const md5 = require('md5');
const codeMd = require('../utils/codeMd');

//检查登录
exports.checkLogin = async (ctx, next) =>{
    var user = ctx.session.user;
    if (!user) {
        ctx.body = {
            message:'not login'
        }
        return;
    }
    if (!userModel.checkField(userModel.name.name,user.name)) {
        ctx.session.user = null;
        ctx.body = {
            message:'user is illegal'
        }
        return;
    }
    await user_sql.selectUserByName(user.name)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                var data = res[0];

                if (data.password !== utils.encryption(user.password)) {
                    ctx.body = {
                        message:'password error'
                    }
                    return;
                }
                ctx.body = {
                    message : 'success',
                    data:{
                        id:data.id,
                        name:data.name,
                        nickname:data.nickname,
                        headImg:data.headImg,
                        permission:data.permission,
                        sex:data.sex,
                        age:data.age,
                        phone:data.phone,
                        email:data.email,
                        address:data.address,
                        signature:data.signature
                    }
                }
            }else{
                ctx.body = {
                    message:'failed'
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                console.log(err)
                ctx.body = {
                    message:err,
                    data:false
                }
            }
        });
}

//登录
exports.login = async (ctx, next) => {
    var user = ctx.request.body;
    if (ctx.session.user) {
        ctx.body = {
            message:'repeat login'
        }
        return;
    }
    if (!userModel.checkField(userModel.name.name,user.name) || !userModel.checkField(userModel.password.name,user.password)) {
        ctx.body = {
            message:'user illegal'
        }
        return;
    }
    if (typeof user.seven !== "boolean") {
        user.seven = false;
    }

    await user_sql.selectUserByName(user.name)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                if (res[0].password !== md5(user.password)) {
                    ctx.body = {
                        message:'failed'
                    }
                    return;
                }
                ctx.session.user = {
                    id:res[0].id,
                    name:res[0].name,
                    nickname:res[0].nickname,
                    password:utils.parserMd5(res[0].password),
                    seven:res[0].seven,
                    permission:res[0].permission,
                    headImg:res[0].headImg
                }
                ctx.body = {
                    message : 'success'
                }
            }else{
                ctx.body = {
                    message:'failed'
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                console.log(err)
                ctx.body = {
                    message:err,
                    data:false
                }
            }
        });
}

//获取用户
exports.getUser = async (ctx, next) => {

    //如果id != 1抛出API 异常
    var id = ctx.query.id;
    if(typeof id == "undefined"){
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    await userModel.selectUserByName(id)
        .then(result => {

            var res = JSON.parse(JSON.stringify(result))

            if (res.length > 0) {
                ctx.body = {
                	name:res[0]['name'],
                	id:res[0]['id']
                }
            }
        }).catch(err => {
            ctx.body = 'false'
            console.log('error',err)

        })
}
//退出
exports.exit = async (ctx, next) => {
    ctx.session = null;
    ctx.body = {
        message:'success'
    }
}

//用户注册
exports.signIn = async (ctx, next) => {
    var user = ctx.request.body;
    if (!userModel.checkField(userModel.name.name,user.name)) {
        ctx.body = {
            message:"name or password illegal",
            code:1
        }
        return;
    }
    if (!userModel.checkField(userModel.password.name,user.password)) {
        ctx.body = {
            message:"name or password illegal",
            code:1
        }
        return;
    }
    if (!user.captcha || user.captcha.split(' ').length > 1 || user.captcha !== ctx.session.captcha) {
        ctx.body = {
            message:"captcha error",
            code:3
        }
        return;
    }
    var exsit = false;
    await user_sql.selectUserByName(user.name)
        .then(result =>{
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                ctx.body = {
                    message:"user already exsit",
                    code:2
                }
                exsit = false;
            }else{
                exsit = true;
            }
        }).catch(err =>{
            if (err) {
                throw err;
            }
        });
    if (!exsit) {
        return;
    }
    await user_sql.addUser([codeMd(user.password),user.name,md5(user.password),5,userModel.headImg.default])
        .then(result =>{
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.body = {
                    message:"success",
                    code:0
                }
            }
        }).catch(err =>{
            if (err) {
                throw err;
            }
        });
}

exports.eidtInfo = async (ctx, next) => {
    var user = ctx.request.body;
    user = {
        id:ctx.session.user.id,
        nickname:user.nickname,
        sex:user.sex - 0,
        age:user.age - 0,
        phone:user.phone,
        email:user.email,
        address:user.address,
        signature:user.signature
    }
    if (user.id === 0 || !user.id) {
        ctx.redirect("/");
    }
    if (!userModel.checkField(userModel.nickname.name,user.nickname)) {
        ctx.body = {
            message:"昵称错误！"
        }
        return;
    }
    if (!userModel.checkField(userModel.sex.name,user.sex)) {
        ctx.body = {
            message:"性别错误！"
        }
        return;
    }
    if (!userModel.checkField(userModel.age.name,user.age)) {
        ctx.body = {
            message:"年龄错误！"
        }
        return;
    }

    if (!userModel.checkField(userModel.phone.name,user.phone)) {
        ctx.body = {
            message:"手机号错误！"
        }
        return;
    }
    if (!userModel.checkField(userModel.email.name,user.email)) {
        ctx.body = {
            message:"邮箱错误！"
        }
        return;
    }

    if (!userModel.checkField(userModel.address.name,user.address)) {
        ctx.body = {
            message:"地址错误！"
        }
        return;
    }

    if (!userModel.checkField(userModel.signature.name,user.signature)) {
        ctx.body = {
            message:"个性签名错误！"
        }
        return;
    }

    await user_sql.updateUser(user.id,userModel.updateUser(user))
        .then(result =>{
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.session.user.nickname = user.nickname;
                ctx.body = {
                    message:"success"
                }
            }
        }).catch(err =>{
            ctx.response.status = 500;
            if (err) {
                throw err;
            }
        });
}