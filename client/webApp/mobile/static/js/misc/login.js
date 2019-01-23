var Vue = require("vue");
require("elementUI");
require("mobile-header");
var axios = require("axios");

var vm = new Vue({
	el: "#app",
	data: {
		mode: 'login',
		userName: "",
		userPassword: "",
		keepLogin: false,
	},
	mounted: function() {
		this.$nextTick(function() {

		});
	},
	methods: {
		onlogin: function() {
			var that = this;
			if (that.userName == "") {
				that.$message.error("用户名不能为空！");
				return;
			}
			if (that.userPassword == "") {
				that.$message.error("密码不能为空！");
				return;
			}
			axios.post(that.$api+'/users/login', {
				user_name: that.userName,
				user_password: that.userPassword,
				user_seven: that.keepLogin
			}).then(function(res) {
				if (res.data.message == 'success') {
					window.location.href = that.$ctx+"/mobile";
				}else{
					that.$message.error(res.data.message);
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
	}
});