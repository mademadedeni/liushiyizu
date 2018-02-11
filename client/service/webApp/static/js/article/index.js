
var Vue = require("vue");
require("element_ui");
require("header");
require("footer");
require("login");
require("jquery");

var vm = new Vue({
	el: "#app",
	data: {
		articles: [],
		showLogin:0,
		showUploadHead:true,
	},
	mounted:function () {
		this.$nextTick(function () {
		    // this.init();
		});
	},
	methods: {
		init:function(){

		},
        toLogin:function (i) {
        	this.showLogin = i;
        },
        closeLogin:function () {
        	this.showLogin = 0;
        }
	}
});