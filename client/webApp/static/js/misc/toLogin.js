
var Vue = require("vue");
require("header");
require("main");
require("footer");
require("login");

var vm = new Vue({
	el: "#app",
	data: {
		showLogin:1,
	},
	mounted:function () {
		this.$nextTick(function () {
			
		});
	},
	methods: {
        toLogin:function (i) {
        	this.showLogin = i;
        },
        closeLogin:function () {
        	this.showLogin = 0;
        }
	}
});