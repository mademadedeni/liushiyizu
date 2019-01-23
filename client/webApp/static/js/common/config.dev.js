(function() {
	var Vue = require("vue");
	var ctx = "http://10.0.0.126";
	var api = "http://10.0.0.126/api";
	Vue.prototype.$ctx = ctx;
	Vue.prototype.$api = api;
})();