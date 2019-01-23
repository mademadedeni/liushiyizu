/**
 * @require login.css
 * @require element_ui
 */
var Vue = require("vue");
var axios = require("axios");

module.exports = Vue.component("liu-login", {
	name:"liuLogin",
	template: __inline("login.html"),
	props: {
		visible:{
			type:Number,
			default:0
		}
	},
	data: function() {
		return {
			userName:"liu",
			userPwd:"123456",
			user_seven:false,
			signInName:"",
			signInPwd:"",
			isLogin:false,
			isSignIn:false,
			captcha:"",
			ccapImg:this.$api+"/captcha?norepeat=",
			isShow:0
		}
	},
	mounted: function() {
		this.init();
	},
	watch:{
		visible:function (val) {
			this.isShow = val;
		}
	},
	methods: {
		init:function () {
			var that = this;
		},
		userExit: function() {
			var that = this;
			axios.get(that.$api+'/users/exit').then(function(res) {
				if (res.data.message == "success") {
					window.location.reload();
				} else {
					that.$message.error("退出失败！");
				}
			}).catch(function(error) {
				window.location.reload();
			});
		},
		onLogin:function () {
			var that = this;
			if (!that.isLogin) {
				that.isLogin = true;
			}
			var param = {
				user_name:that.userName,
				user_password:that.userPwd,
				user_seven:that.user_seven
			};

			if (!param.user_name || param.user_name.split(" ").length > 1) {
				that.$message.error("用户名不合法");
				that.isLogin = false;
				return;
			}
			if (!param.user_password || param.user_password.split(" ").length > 1 || param.user_password.length < 6) {
				that.$message.error("密码不合法");
				that.isLogin = false;
				return;
			}
			axios.post(that.$api+'/users/login',param).then(function(res) {
				if (res.data.message == "success") {
					window.location.reload();
				}
				that.isLogin = false;
			}).catch(function(error) {
				window.location.reload();
			});
		},
		onClose:function () {
			this.isShow = 0
			this.$emit("update:visible",0);
		},
		onShow:function (i) {
			this.isShow = i;
			this.$emit("update:visible",i);
		},
		onSeven:function () {
			this.user_seven = !this.user_seven;
		},
		//注册
		onSignIn:function () {
			var that = this;
			if (!that.isSignIn) {
				that.isSignIn = true;
			}
			var param = {
				user_name:that.signInName,
				user_password:that.signInPwd,
				captcha:that.captcha
			}

			if (!param.user_name) {
				that.$message.error("用户名不能为空！");
				that.isSignIn = false;
				return;
			}else if(param.user_name.split(" ").length > 1){
				that.$message.error("用户名不合法！");
				that.isSignIn = false;
				return;
			}
			if (!param.user_password) {
				that.$message.error("密码不能为空！");
				that.isSignIn = false;
				return;
			}else if (param.user_password.split(" ").length > 1 || param.user_password.length < 6) {
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
			axios.post(that.$api+'/users/signIn',param).then(function(res) {
				if (res.data.code == 0) {
					that.$alert('恭喜你注册成功，快去登录吧！', '提示', {
						confirmButtonText: '好的',
						callback: function(action) {
							window.location.reload();
						}
					});
				}else if (res.data.code == 1) {
					that.$message.error("用户名或密码不合法！");
				}else if(res.data.code == 2){
					that.$message.error("用户已存在！");
				}else if(res.data.code == 3){
					that.$message.error("验证码不正确！");
				}
				that.isSignIn = false;
			}).catch(function(error) {
				window.location.reload();
			});
		},
		getCaptcha:function () {
			var that = this;
			that.ccapImg = that.$api+"/captcha?norepeat=" +new Date().getTime();
		}
	}
})