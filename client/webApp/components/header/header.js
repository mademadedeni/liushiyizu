/**
 * @require header.css
 */
var Vue = require("vue");
var login = require("login");
var $ = require("jquery");
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
			searchUrl:"/search?value=",
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
			$.get('/api/users/checkLogin',function (res) {
				if (res.message == "success") {
					that.isLogin = true;
					that.user = res.data;
					that.$emit("get-user",res.data);
				}
			});
		},
		onExit: function() {
			$.get("/api/users/exit",function (res) {
				if (res.message == "success") {
					window.location.href = "/";
				}
			})
		},
		toLoginBtn:function (i) {
			this.login.isShow = i;
		},
		onSearchBtn:function () {
			
		}
	}
})