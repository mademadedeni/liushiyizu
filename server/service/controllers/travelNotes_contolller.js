const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const travelNotes_sql = require('../lib/travelNotes_sql');
const travelNotesModel = require('../models/travelNotes_model');

// 获取游记列表
exports.getList = async (ctx, next) => {

    var id = ctx.query.id;
    if(typeof id == "undefined"){
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    await travelNotesModel.selectUserByName(id)
        .then(result => {

            var res = JSON.parse(JSON.stringify(result))

            if (res.length > 0) {
                ctx.body = {
                	message:'success',
                    data:res
                }
            }
        }).catch(err => {
            ctx.body = 'false'
            console.log('error',err)

        })
}

//添加游记
exports.addTravelNotes = async (ctx, next) => {
    var user = ctx.session.user;
    if (!user) {
        ctx.body = {
            message:'not login'
        }
        return;
    }
    await travelNotes_sql.addTravelNotes([1,'aaa','fsdljfls','2018-05-11 17:22:31','2018-05-11 17:22:50',22,'fsjdlf',1])
        .then(result =>{
            var res = JSON.parse(JSON.stringify(result));
            console.log(res)
            if (res.affectedRows > 0) {
                ctx.body = {
                    code:1,
                    message:"success",
                    data:{
                        tId:res.insertId
                    }
                }
            }else{
                ctx.body = {
                    message:"false"
                }
                return false;
            }
        }).catch(err =>{
            console.log(err)
            if (err) {
                throw err;
            }
        });
}

// 更新游记
exports.updateTravelNotes = async (ctx, next) => {
    var user = ctx.session.user;
    if (!user) {
        ctx.body = {
            message:'not login'
        }
        return;
    }
    var tId = ctx.request.body.tId;
    // var data = ctx.request.body.data;
    var data = {
        'title':'update_'+new Date().getTime()
    }
    await travelNotes_sql.updateTravelNotes(1,travelNotesModel.updateValue(data))
        .then(result =>{
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
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

// 上传图片
exports.upload = async (ctx, next) => {
    if (!ctx.session.user) {
        ctx.body = {
            message:"not login!"
        }
        return;
    }
    if (ctx.request.body) {
        const file = ctx.request.body.files.file;
        const user = ctx.session.user;
        var imgPath = user.headImg;
        if (path.basename(imgPath) == "default.jpg") {
            imgPath = "/upload/head/head_" + Date.now() + path.extname(file.name);
        }else{
            imgPath = "/upload/head/"+path.basename(imgPath);
        }
        var savePath = path.join(url.webApp, imgPath);
        var writeState = "";
        await upload_controller.upload(file, savePath, ["image/jpeg", "image/png"], 500)
            .then(resolve => {
                if (resolve == "success") {
                    writeState = "success";
                }else{
                    writeState = resolve;
                }
            }).catch(err => {
                ctx.response.status = 500;
                console.log(err);
                ctx.body = {
                    message:err,
                    data:false
                }
            });
        if (writeState !== "success") {
            ctx.body = {
                message:writeState
            }
            return;
        }
        await user_sql.updateUser(user.id,userModel.updateUser({headImg:imgPath}))
            .then(resolve => {
                var res = JSON.parse(JSON.stringify(resolve));
                if (res.affectedRows > 0) {
                    user.headImg = imgPath;
                    ctx.body = {
                        message:'success',
                        data:imgPath
                    };
                }else{
                    ctx.body = {
                        message:'save error',
                        data:imgPath
                    };
                }
            }).catch(err => {
                console.log('error',err)
                ctx.response.status = 500;
                ctx.body = {
                    message:err,
                    data:false
                }
            });
    } else {
        ctx.body = {
            message: false
        }
    }
}