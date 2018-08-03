const router = require('koa-router')();
const ueditor = require('ueditor');
const path = require("path");
const url = require("../../config/url");

const upload_controller = require('../../controllers/upload_controller.js');

// router.post("/upload/head", upload_controller.uploadHead);

 
router.all('/editor/ue',async function (ctx,next) {
	//客户端上传文件设置
	var imgDir = '/travelNotes'
	 var ActionType = ctx.query.action;

	if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
	    var file_url = imgDir;//默认图片上传地址
	    const file = ctx.request.body.files.upfile;
	    var savePath = path.join(url.upload, imgDir);

	    await upload_controller.upload(file,{
	    	writePath:savePath,
	    	fileType:["image/jpeg", "image/png"],
	    	fileName:file.name,
	    	maxSize:500
	    }).then(resolve => {
            if (resolve == "success") {
                ctx.type ='text/html';
				ctx.body = {
					"url": "/upload/travelNotes/" + file.name,
					"original": file.name,
					"state": "SUCCESS"
				}
            }else{
            	ctx.type ='text/html';
                ctx.body={
                	state:resolve
                }
            }
        }).catch(err => {
            ctx.response.status = 500;
            console.log(err);
            ctx.body = {
                state:err
            }
        });
	}
	//  客户端发起图片列表请求
	else if (ctx.query.action === 'listimage') {
	    var dir_url = imgDir;
	    ctx.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
	}
	// 客户端发起其它请求
	else {
	    ctx.redirect('/upload/config.json');
	}
});

module.exports = router;