
var Vue = require("vue");
require("element_ui");
require("header");
require("main");
require("footer");
require("login");

var vm = new Vue({
	el: "#app",
	data: {
		showLogin:0
	},
	mounted:function () {
		this.$nextTick(function () {
		    // this.init();
		});
	},
	methods: {
		init:function () {
			
		},
        toLogin:function (i) {
        	this.showLogin = i;
        },
        closeLogin:function () {
        	this.showLogin = 0;
        }
	}
});