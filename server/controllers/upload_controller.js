const fs = require("fs");
const path = require("path");
const utils = require("../utils/utils");
const url = require("../config/url");

/**
 * 上传文件
 * @param  {file} file      上传的文件
 * @param  {string} writePath 写入路径
 * @param  {array} fileType  文件类型
 * @param  {string} fileName  文件名称
 * @param  {number} maxSize   文件大小最大值 单位：kb
 * @return {}
 */
exports.upload = async (file,option) => {
	var config ={
		writePath:url.upload + "/images",
		fileType:["image/jpeg", "image/png"],
		fileName:new Date().getTime() + ".jpg",
		maxSize:500
	}
	var message = "success";
	// 合并配置
	Object.assign(config,option);

	if (!file) {
		message = "file is null!"
	}

	if (typeof config.fileType === "string") {
		config.fileType = [config.fileType];
	}
	if (config.fileType.indexOf(file.type) < 0) {
		message = "The file type error";
	} else if (file.size > 1024 * config.maxSize) {
		message = "The file size error";
	}

	return new Promise((resolve, reject) => {
		if (message !== "success") {
			resolve(message);
			return;
		}
		fs.access(config.writePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
		    if (!err) {
			    const reader = fs.createReadStream(file.path);
			    const writer = fs.createWriteStream(path.join(config.writePath,config.fileName));
			    var writeStream = reader.pipe(writer);
			    writeStream.on('finish', (chunk) => {
			    	resolve(message);
			    });
			    writeStream.on('error', (err) => {
			    	message = "error";
			    	console.log(err)
			    	reject(err);
			    	writeStream.end();
			    });

		    }else{
		    	console.log(path.join(config.writePath,config.fileName))
		    	reject("diratory inexistence or no access!");
		    }
		});
	});
}

