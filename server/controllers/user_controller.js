const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const user_sql = require('../lib/user_sql');
const userModel = require('../models/user_model');
const url = require("../config/url");
const utils = require('../utils/utils');
const md5 = require('md5');
const codeMd = require('../utils/codeMd');
const upload_controller = require('./upload_controller');
const path = require('path');

//检查登录
exports.checkLogin = async(ctx, next) => {
    var user = ctx.session.user;
    if (!user) {
        ctx.body = {
            message: 'not login'
        }
        return;
    }
    if (!userModel.checkField(userModel.user_name.name, user.user_name)) {
        ctx.session.user = null;
        ctx.body = {
            message: 'user is illegal'
        }
        return;
    }
    await user_sql.selectUserByName(user.user_name)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                var data = res[0];

                if (data.user_password !== utils.encryption(user.user_password)) {
                    ctx.body = {
                        message: 'password error'
                    }
                    return;
                }
                ctx.body = {
                    message: 'success',
                    data: {
                        user_id: data.user_id,
                        user_name: data.user_name,
                        user_nickname: data.user_nickname,
                        user_head_img: data.user_head_img,
                        user_permission: data.user_permission,
                        user_sex: data.user_sex,
                        user_age: data.user_age,
                        user_phone: data.user_phone,
                        user_email: data.user_email,
                        user_address: data.user_address,
                        user_signature: data.user_signature
                    }
                }
            } else {
                ctx.body = {
                    message: 'failed'
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                console.log(err)
                ctx.body = {
                    message: err,
                    data: false
                }
            }
        });
}

//登录
exports.login = async(ctx, next) => {
    var user = ctx.request.body;
    if (ctx.session.user) {
        ctx.body = {
            message: 'repeat login'
        }
        return;
    }
    if (!userModel.checkField(userModel.user_name.name, user.user_name) || !userModel.checkField(userModel.user_password.name, user.user_password)) {
        ctx.body = {
            message: 'user illegal'
        }
        return;
    }
    if (typeof user.user_seven !== "boolean") {
        user.user_seven = false;
    }

    await user_sql.selectUserByName(user.user_name)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                var data = res[0];
                if (data.user_password !== md5(user.user_password)) {
                    ctx.body = {
                        message: 'failed'
                    }
                    return;
                }
                ctx.session.user = {
                    user_id: data.user_id,
                    user_name: data.user_name,
                    user_nickname: data.user_nickname,
                    user_password: utils.parserMd5(data.user_password),
                    user_seven: data.user_seven,
                    user_permission: data.user_permission,
                    user_head_img: data.user_head_img
                }
                ctx.body = {
                    message: 'success'
                }
            } else {
                ctx.body = {
                    message: 'failed'
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                console.log(err)
                ctx.body = {
                    message: err,
                    data: false
                }
            }
        });
}

//获取用户
exports.getUser = async(ctx, next) => {

    //如果id != 1抛出API 异常
    var user_id = ctx.query.user_id;
    if (typeof user_id == "undefined") {
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    await userModel.selectUserByName(user_id)
        .then(result => {

            var res = JSON.parse(JSON.stringify(result))

            if (res.length > 0) {
                ctx.body = {
                    name: res[0]['name'],
                    user_id: res[0]['id']
                }
            }
        }).catch(err => {
            ctx.body = 'false'
            console.log('error', err)

        })
}
//退出
exports.exit = async(ctx, next) => {
    ctx.session = null;
    ctx.body = {
        message: 'success'
    }
}

//用户注册
exports.signIn = async(ctx, next) => {
    var user = ctx.request.body;
    if (!userModel.checkField(userModel.user_name.name, user.user_name)) {
        ctx.body = {
            message: "name or password illegal",
            code: 1
        }
        return;
    }
    if (!userModel.checkField(userModel.user_password.name, user.user_password)) {
        ctx.body = {
            message: "name or password illegal",
            code: 1
        }
        return;
    }
    if (!user.captcha || user.captcha.split(' ').length > 1 || user.captcha !== ctx.session.captcha) {
        ctx.body = {
            message: "captcha error",
            code: 3
        }
        return;
    }
    var exsit = false;
    await user_sql.selectUserByName(user.user_name)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                ctx.body = {
                    message: "user already exsit",
                    code: 2
                }
                exsit = false;
            } else {
                exsit = true;
            }
        }).catch(err => {
            if (err) {
                throw err;
            }
        });
    if (!exsit) {
        return;
    }
    await user_sql.addUser([codeMd(user.user_password), user.user_name, md5(user.user_password), 5, userModel.user_head_img.default])
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.body = {
                    message: "success",
                    code: 0
                }
            }
        }).catch(err => {
            if (err) {
                throw err;
            }
        });
}

exports.eidtInfo = async(ctx, next) => {
    var user = ctx.request.body;
    user = {
        user_id: ctx.session.user.user_id,
        user_nickname: user.user_nickname,
        user_sex: user.user_sex - 0,
        user_age: user.user_age - 0,
        user_phone: user.user_phone,
        user_email: user.user_email,
        user_address: user.user_address,
        user_signature: user.user_signature
    }
    if (user.user_id === 0 || !user.user_id) {
        ctx.redirect("/");
    }
    if (!userModel.checkField(userModel.user_nickname.name, user.user_nickname)) {
        ctx.body = {
            message: "昵称错误！"
        }
        return;
    }
    if (!userModel.checkField(userModel.user_sex.name, user.user_sex)) {
        ctx.body = {
            message: "性别错误！"
        }
        return;
    }
    if (!userModel.checkField(userModel.user_age.name, user.user_age)) {
        ctx.body = {
            message: "年龄错误！"
        }
        return;
    }

    if (!userModel.checkField(userModel.user_phone.name, user.user_phone)) {
        ctx.body = {
            message: "手机号错误！"
        }
        return;
    }
    if (!userModel.checkField(userModel.user_email.name, user.user_email)) {
        ctx.body = {
            message: "邮箱错误！"
        }
        return;
    }

    if (!userModel.checkField(userModel.user_address.name, user.user_address)) {
        ctx.body = {
            message: "地址错误！"
        }
        return;
    }

    if (!userModel.checkField(userModel.user_signature.name, user.user_signature)) {
        ctx.body = {
            message: "个性签名错误！"
        }
        return;
    }

    await user_sql.updateUser(user.user_id, userModel.updateUser(user))
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.session.user.user_nickname = user.user_nickname;
                ctx.body = {
                    message: "success"
                }
            }
        }).catch(err => {
            ctx.response.status = 500;
            if (err) {
                throw err;
            }
        });
}

//上传头像
exports.uploadHead = async(ctx, next) => {
    if (!ctx.session.user) {
        ctx.body = {
            message: "not login!"
        }
        return;
    }
    if (ctx.request.body) {
        const file = ctx.request.body.files.file;
        const user = ctx.session.user;
        var imgPath = user.user_head_img;
        var basename = path.basename(imgPath);
        if (basename == "default.jpg") {
            basename = "head_" + Date.now() + path.extname(file.name);
            imgPath = path.join("/upload/head/", basename);
        }
        var savePath = path.join(url.webApp, "/upload/head");
        var writeState = "";
        await upload_controller.upload(file, {
            writePath: savePath,
            fileType: ["image/jpeg", "image/png"],
            fileName: basename,
            maxSize: 500
        }).then(resolve => {
            if (resolve == "success") {
                writeState = "success";
            } else {
                writeState = resolve;
            }
        }).catch(err => {
            ctx.response.status = 500;
            console.log(err);
            ctx.body = {
                message: err,
                data: false
            }
        });
        if (writeState !== "success") {
            ctx.body = {
                message: writeState
            }
            return;
        }
        await user_sql.updateUser(user.user_id, userModel.updateUser({ user_head_img: imgPath }))
            .then(resolve => {
                var res = JSON.parse(JSON.stringify(resolve));
                if (res.affectedRows > 0) {
                    user.user_head_img = imgPath;
                    ctx.body = {
                        message: 'success',
                        data: imgPath
                    };
                } else {
                    ctx.body = {
                        message: 'save error',
                        data: imgPath
                    };
                }
            }).catch(err => {
                console.log('error', err)
                ctx.response.status = 500;
                ctx.body = {
                    message: err,
                    data: false
                }
            });
    } else {
        ctx.body = {
            message: false
        }
    }
}