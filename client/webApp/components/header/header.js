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
		userData:{
			type:Object
		}
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
			if (that.userData) {
				that.user = that.userData;
				that.$emit("get-user",that.user);
				return;
			}
			var userInfo = localStorage.getItem("userInfo");
			if (userInfo) {
				that.user = JSON.parse(userInfo);
				that.$emit("get-user",that.user);
				return;
			}
			axios.get(that.$api+'/users/checkLogin').then(function (res) {
				if (res.data.message == "success") {
					that.user = res.data.data;
					localStorage.setItem("userInfo",JSON.stringify(that.user));
					that.$emit("get-user",that.user);
				}
			});
		},
		onSearchBtn:function () {
			
		}
	}
})