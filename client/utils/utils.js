let _ = require("lodash");
module.exports = {
	isPhone : function (args) {
		return /^1[3|4|5|7|8][0-9]\d{8}$/.test(args);
	},
	isEmail:function (args) {
		return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(args);
	},
	/**
	 * 日期格式化工具
	 * @param  {string} dateTime    日期字符串或时间毫秒数
	 * @param  {string} dateDivider 日期分隔符默认'-'
	 * @param  {boolean} time        是否需要时分秒
	 * @param  {string} timeDivider 时分秒分隔符默认':'
	 * @return {string}             格式化日期字符串
	 */
	dateFormat:function (dateTime,dateDivider,time,timeDivider) {
		var dateDivider = dateDivider || "-";
		var timeDivider = timeDivider || ":";
		if (typeof dateTime === "string" && typeof (dateTime-0) !== NaN) {
			dateTime = dateTime - 0;
		}
		var date = new Date(dateTime);
		var yy = date.getFullYear();
		var mm = date.getMonth()+1;
		var dd = date.getDay();
		var hh = date.getHours();
		var MM = date.getMinutes();
		var ss = date.getSeconds();
		if (time) {
			return  yy + dateDivider + mm + dateDivider + dd + " " + hh + timeDivider + MM + timeDivider + ss;
		}
		return  yy + dateDivider + mm + dateDivider + dd;
	},
	isInteger:function (value) {
		var data = value - 0;
		if (!_.isInteger(data) || data < 0) {
			return false;
		}
		return true;
	},
	parserMd5:function (pwd) {
		return pwd.substring(17) + pwd.substring(0,17);
	},
	encryption:function (pwd) {
		return pwd.substring(15) + pwd.substring(0,15);
	},
	isMobile:function (userAgent) {
		if(userAgent.match(/Android/i) || userAgent.match(/webOS/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPad/i) || userAgent.match(/iPod/i) || userAgent.match(/BlackBerry/i) || userAgent.match(/Windows Phone/i) ){
		    return true;
		}else{
			return false;
		}
	}
}