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
		isShowLogin:{
			type:Number,
			default:0
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
			},
			login:{},
		}
	},
	mounted: function() {
		this.$nextTick(function () {
			this.init();
			var el = document.createElement("div");
			document.body.appendChild(el);
			this.login = new login();
			this.login.$mount(el);
			this.login.isShow = this.isShowLogin;
		});
	},
	methods: {
		init:function () {
			var that = this;
			axios.get(that.$api+'/users/checkLogin').then(function (res) {
				if (res.data.message == "success") {
					that.isLogin = true;
					that.user = res.data.data;
					that.$emit("get-user",that.user);
				}
			});
		},
		onExit: function() {
			axios.get(that.$api+"/users/exit").then(function (res) {
				if (res.data.message == "success") {
					window.location.reload();
				}
			});
		},
		toLoginBtn:function (i) {
			this.login.isShow = i;
		},
		onSearchBtn:function () {
			
		}
	}
})