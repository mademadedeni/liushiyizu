/**
 * @require header.css
 */
var Vue = require("vue");
var login = require("login");
var axios = require("axios");
module.exports = Vue.component("liu-header", {
	name:'liuHeader',
	template: __inline("header.html"),
	props: {
		tabId:[String, Number],
		userData:''
	},
	data: function() {
		return {
			searchValue:"",//搜索内容
			searchUrl:this.$ctx+"/search?value=",
			user:{
				user_id:null,
				user_name:"",
				user_nickname:"",
				user_headImg:"",
				user_permission:5,
				user_sex:2,
				user_age:null,
				user_phone:"",
				user_email:"",
				user_address:"",
				user_signatrue:""
			}
		}
	},
	mounted: function() {
		this.$nextTick(function () {
			this.init();
			var el = document.createElement("div");
			document.body.appendChild(el);
			this.login = new login();
			this.login.$mount(el);
			this.toLoginBtn = this.login.onShow;
			this.onExit = this.login.userExit;
		});
	},
	methods: {
		init:function () {
			var that = this;
			var userData = document.getElementById("userData");
			if (!that.userData&&userData) {
				userData = userData.text;
			}
			if (that.userData || userData) {
				var userData = JSON.parse(that.userData||userData);
				that.user = userData;
				that.$emit("get-user",that.user);
				return;
			}else{
				axios.get(that.$api+'/users/checkLogin').then(function (res) {
					if (res.data.success) {
						that.user = res.data.data;
						sessionStorage.setItem("userData",JSON.stringify(that.user));
						that.$emit("get-user",that.user);
					}
				});
			}
			/*var userData = sessionStorage.getItem("userData");
			if (userData) {
				that.user = JSON.parse(userData);
				that.$emit("get-user",that.user);
				return;
			}*/
		},
		onSearchBtn:function () {
			
		}
	}
})