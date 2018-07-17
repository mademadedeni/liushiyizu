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
				id:null,
				name:"",
				nickname:"",
				headImg:"",
				permission:5,
				sex:2,
				age:null,
				phone:"",
				email:"",
				address:"",
				signatrue:""
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