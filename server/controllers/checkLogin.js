module.exports = {
	checkLogin:function (ctx) {
		if (ctx.session.user) {
			return true;
		}else{
			return false;
		}
	}
}