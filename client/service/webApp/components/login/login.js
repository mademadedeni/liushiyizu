/**
 * @require login.css
 */
var Vue = require("vue");
var $ = require("jquery");
module.exports = Vue.component("liu-login", {
	template: __inline("login.html"),
	props: {
		showLogin:{
			type:Number,
			default:0
		}
	},
	data: function() {
		return {
			userName:"liu",
			userPwd:"123456",
			seven:false,
			signInName:"",
			signInPwd:"",
			isLogin:false,
			isSignIn:false,
			captcha:"",
			ccapImg:"/api/captcha?norepeat="
		}
	},
	mounted: function() {
		this.init();
	},
	methods: {
		init:function () {
			var that = this;
		},
		userExit: function() {
			var that = this;
			$.get('/api/users/exit',function (res) {
				if (res.message == "success") {
					window.location.reload();
				}else{
					that.$message.error("退出失败！");
				}
			});
		},
		onLogin:function () {
			var that = this;
			if (!that.isLogin) {
				that.isLogin = true;
			}
			var param = {
				name:that.userName,
				password:that.userPwd,
				seven:that.seven
			};

			if (!param.name || param.name.split(" ").length > 1) {
				that.$message.error("用户名不合法");
				that.isLogin = true;
				return;
			}
			if (!param.password || param.password.split(" ").length > 1 || param.password.length < 6) {
				that.$message.error("密码不合法");
				that.isLogin = true;
				return;
			}
			$.post('/api/users/login',param,function (res) {
				if (res.message == "success") {
					window.location.reload();
				}
				that.isLogin = true;
			});
		},
		closeLogin:function () {
			this.$emit("close-login");
		},
		onSeven:function () {
			this.seven = !this.seven;
		},
		//注册
		onSignIn:function () {
			var that = this;
			if (!that.isSignIn) {
				that.isSignIn = true;
			}
			var param = {
				name:that.signInName,
				password:that.signInPwd,
				captcha:that.captcha
			}

			if (!param.name) {
				that.$message.error("用户名不能为空！");
				that.isSignIn = false;
				return;
			}else if(param.name.split(" ").length > 1){
				that.$message.error("用户名不合法！");
				that.isSignIn = false;
				return;
			}
			if (!param.password) {
				that.$message.error("密码不能为空！");
				that.isSignIn = false;
				return;
			}else if (param.password.split(" ").length > 1 || param.password.length < 6) {
				that.$message.error("密码不合法！");
				that.isSignIn = false;
				return;
			}
			if (!param.captcha) {
				that.$message.error("验证码不能为空！");
				that.isSignIn = false;
				return;
			}else if (param.captcha.split(" ").length > 1 || param.captcha.length < 6) {
				that.$message.error("验证码不正确！");
				that.isSignIn = false;
				that.getCaptcha();
				return;
			}
			$.post('/api/users/signIn',param,function (res) {
				if (res.code == 0) {
					that.$alert('恭喜你注册成功，快去登录吧！', '提示', {
						confirmButtonText: '好的',
						callback: action => {
							window.location.reload();
						}
					});
				}else if (res.code == 1) {
					that.$message.error("用户名或密码不合法！");
				}else if(res.code == 2){
					that.$message.error("用户已存在！");
				}else if(res.code == 3){
					that.$message.error("验证码不正确！");
				}
				that.isSignIn = false;
			});
		},
		toLogin:function (i) {
			this.$emit("to-login",i);
		},
		getCaptcha:function () {
			var that = this;
			that.ccapImg = "/api/captcha?norepeat=" +new Date().getTime();
		}
	}
})