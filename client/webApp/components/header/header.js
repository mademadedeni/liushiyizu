/**
 * @require header.css
 */
var Vue = require("vue");
var $ = require("jquery");
module.exports = Vue.component("liu-header", {
	template: __inline("header.html"),
	props: {
		tabId:[String, Number]
	},
	data: function() {
		return {
			isLogin:false,
			searchValue:"",
			isShowAsk:true,
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
			}
		}
	},
	mounted: function() {
		this.init();
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
			this.$emit("to-login",i);
		},
		onSearchInput:function () {
			if (this.searchValue !== "") {
				this.isShowAsk = false;
			}else{
				this.isShowAsk = true;
			}
		},
		onSearchBtn:function () {
			
		}
	}
})