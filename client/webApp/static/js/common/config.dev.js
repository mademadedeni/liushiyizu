(function() {
	var Vue = require("vue");
	var ctx = "http://localhost";
	var api = "http://localhost/api";
	Vue.prototype.$ctx = ctx;
	Vue.prototype.$api = api;
})();