module.exports = {
	checkLogin:function (ctx) {
		if (ctx.session.userId) {
			return true;
		}else{
			return false;
		}
	}
}