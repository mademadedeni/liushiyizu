const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const testModel = require('../lib/test_sql.js');
const utils = require('../utils/utils.js');
const userModel = require('../models/user_model');

//登录
exports.login = async (ctx, next) => {
    var user = ctx.request.body;
    if (!userModel.checkField(userModel.name.name,user.name) || !userModel.checkField(userModel.password.name,user.password)) {
        ctx.body = {
            message:'user illegal'
        }
        return;
    }
    await noteSql.login(user)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.body = {
                    message : 'success',
                    data:{
                        fieldCount:res.fieldCount,
                        successCount:res.affectedRows
                    }
                };
            }else{
                ctx.body = {
                    message:'failed'
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                ctx.body = {
                    message:err,
                    data:false
                }
            }
        });
}

//获取用户
exports.getUser = async (ctx, next) => {

}

//用户注册
exports.registerUser = async (ctx, next) => {
    console.log('registerUser', ctx.request.body);
}