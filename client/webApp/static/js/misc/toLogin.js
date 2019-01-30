
var Vue = require("vue");
require("header");
require("main");
require("footer");
require("login");
var vuexStore = require("vuexStore");

var vm = new Vue({
	el: "#app",
	data: {
		
	},
	mounted:function () {
		this.$nextTick(function () {
			vuexStore.login.onShow();
		});
	},
	methods: {
        
	}
});