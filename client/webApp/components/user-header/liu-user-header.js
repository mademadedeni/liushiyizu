/**
 * @require liu-user-header.css
 */
var Vue = require("vue");
module.exports = Vue.component("liu-user-header", {
	name:'liuUserHeader',
	template: __inline("liu-user-header.html"),
	props: {
		user:{
			type:Object,
			default:{}
		}
	},
	data: function() {
		return {
			
		}
	},
	mounted: function() {
		this.$nextTick(function () {
			
		});
	},
	methods: {
		init:function () {
			var that = this;
			
		},
	}
})