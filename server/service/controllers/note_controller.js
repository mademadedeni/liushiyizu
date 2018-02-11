const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const noteSql = require('../lib/note_sql');
const userModel = require('../models/user_model');
const md5 = require('md5');
const utils = require('../utils/utils');
const codeMd = require('../utils/codeMd');
const _ = require('lodash');

//add note
exports.addNote = async (ctx, next) => {
    var data = ctx.request.body;
    var user = {};
    var columns = userModel.getColumns();
    for (var i = 0; i < columns.length; i++) {
        if (typeof data[columns[i]] !== 'undefined') {
            user[columns[i]] = data[columns[i]];
        }
    }
    for(key in user){
        if (userModel[key].type == "int") {
            user[key] = user[key] - 0;
        }
        if (!userModel.checkField(key,user[key])) {
            ctx.body = {
                message:"field",
                data:key + ':' + user[key]
            }
            return;
        }
    }
    
    //密码加密
    user.code = codeMd(user.password);
    user.password = md5(user.password);
    // ctx.body = 'true'
    await noteSql.addUser(userModel.addUser(user))
        .then(result => {
            console.log(result.changedRows)
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.body = 'success';
            }
        }).catch(err => {
            console.log('error',err)
            ctx.response.status = 500;
            ctx.body = {
                message:err,
                data:false
            }
        });
}
/**
* 根据id值删除记录
* ID：删除单条记录可传数字或[id]，多条记录[id,id,id]
*/
exports.deleteNote = async (ctx, next) => {
    let id = ctx.request.body.id;
    if (!_.isArray(id)) {
        id = [id];
    }
    for (var i = 0; i < id.length; i++) {
        if (!utils.isInteger(id[i])) {
            ctx.body = {
                message:'id illegal'
            }
        }
    }
    await noteSql.deleteNote(id.join(','))
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
/**
* 更新记录
* 参数为user对象，值为需要修改的字段键值对
* id值不得为空,code值随password值改变而改变
*/
exports.updateNote = async (ctx, next) => {
    var data = ctx.request.body;
    var user = {};
    var columns = userModel.getColumns();
    for (var i = 0; i < columns.length; i++) {
        if (typeof data[columns[i]] !== 'undefined') {
            user[columns[i]] = data[columns[i]];
        }
    }
    if (!user.id) {
        ctx.body ={
            message:'id is null!'        
        }
        return;
    }
    for(key in user){
        if (userModel[key].type == "int") {
            user[key] = user[key] - 0;
        }
        if (!userModel.checkField(key,user[key])) {
            ctx.body = {
                message:"failed",
                data:key + ':' + user[key]
            }
            return;
        }
    }

    if (typeof user.password !== 'undefined') {
        user.code = codeMd(user.password);
        user.password = md5(user.password);
    }else{
        if (typeof user.code !== 'undefined') {
            delete user.code;
        }
    }
    // console.log(userModel.updateUser(user))
    await noteSql.updateNote(user.id,userModel.updateUser(user))
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.body = 'success';
            }
        }).catch(err => {
            console.log('error',err)
            ctx.response.status = 500;
            ctx.body = {
                message:err,
                data:false
            }
        });
}
//获取note
exports.getNote = async (ctx, next) => {
    var type = ctx.params.type;
    var query = ctx.params.query;
    if (type  != '0' && !userModel.hasField(type)) {
        console.log("type inexistence")
        ctx.body = {message:"type inexistence"};
        return;
    }
    await noteSql.selectUser(type,{start:0,end:20},query)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                ctx.body = res;
            }else{
                ctx.body = [];
            }
        }).catch(err => {
            console.log('error',err)
            ctx.response.status = 500;
            ctx.body = {
                message:err,
                data:false
            }
        });
}

//获取note
exports.getNoteList = async (ctx, next) => {
    var type = ctx.params.type;
    var query = ctx.params.query;
    var row = ctx.params.row;
    console.log(typeof type,typeof query)
    if (type  != 0 && userModel.hasField(type)) {
        ctx.body = "type inexistence";
        return false;
    }else if (type == 0) {
        if (typeof query == "number") {
            query = number;
        }else{
            query = 20;
        }
    }
    await noteSql.selectUser(type,row,query)
        .then(result => {

            var res = JSON.parse(JSON.stringify(result));

            if (res.length > 0) {
                ctx.body = res;
            }
        }).catch(err => {
            console.log('error',err)
            ctx.body = 'false'

        });
}
// 获取权限列表
exports.getPermission = async (ctx, next) =>{
    await noteSql.selectPermission()
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                var data = [];
                for(var i=0;i<res.length;i++){
                    if (i!=0) {
                        data.push(res[i].id);
                    }
                }
                ctx.body = data;
            }
        }).catch(err => {
            console.log('error',err)
            ctx.body = 'false'

        });
}