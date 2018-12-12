/**
 * @require liu-user-nav.css
 */
var Vue = require("vue");
module.exports = Vue.component("liu-user-nav", {
	name:'liuUserNav',
	template: __inline("liu-user-nav.html"),
	props: {
		active:{
			type:String,
			default:'userInfo'
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