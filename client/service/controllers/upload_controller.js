var fs = require("fs");
var path = require("path");
var url = require("../../config/url");
var utils = require("../utils/utils");
const user_sql = require('../lib/user_sql');
const userModel = require('../models/user_model');

/**
 * 上传文件
 * @param  {file} file      上传的文件
 * @param  {string} writePath 写入路径
 * @param  {array} fileType  文件类型数组
 * @param  {number} maxSize   文件大小最大值 单位：kb
 * @return {}
 */
var upload = async (file, writePath, fileType, maxSize) => {
	var message = "success";
	if (typeof fileType === "string") {
		fileType = [fileType];
	}
	if (!maxSize) {
		maxSize = 500;
	}
	if (fileType.indexOf(file.type) < 0) {
		message = "The file type error";
	} else if (file.size > 1024 * maxSize) {
		message = "The file size error";
	}

	return new Promise((resolve, reject) => {
		if (message !== "success") {
			resolve(message);
			return;
		}
		const reader = fs.createReadStream(file.path);
		const writer = fs.createWriteStream(writePath);
		var writeStream = reader.pipe(writer);
		writeStream.on('finish', (chunk) => {
			resolve(message);
		});
		writeStream.on('error', (err) => {
			message = "error";
			writeStream.end();
			reject(err);
		});
	});
}

exports.uploadHead = async (ctx, next) => {
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
		if (path.basename(user.headImg) == "default.jpg") {
			imgPath = "/head/head_" + Date.now() + path.extname(file.name);
		}
		var savePath = path.join(url.upload, imgPath);
		var writeState = "";
		await upload(file, savePath, ["image/jpeg", "image/png"], 500)
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