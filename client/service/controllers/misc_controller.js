const fs = require('fs');
const path = require("path");

// 验证码
exports.captcha = async (ctx, next) => {
    ctx.type = "image/jpg";
    var randomNum = parseInt(Math.random()*10) + "";
    var filePath = path.join(__dirname,"../webApp/static/images/captcha/");
    var files = fs.readdirSync(filePath);
    ctx.session.captcha = files[randomNum].split(".")[0];
    ctx.body = fs.createReadStream(filePath+files[randomNum]);
}