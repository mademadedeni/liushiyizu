(function() {
	var Vue = require("vue");
	var ctx = "http://192.168.100.10";
	var api = "http://192.168.100.10/api";
	Vue.prototype.$ctx = ctx;
	Vue.prototype.$api = api;
})();