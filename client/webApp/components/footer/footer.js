/**
 * @require footer.css
 */
var Vue = require("vue.js");
module.exports = Vue.component("liu-footer", {
	name:'liuFooter',
	template: __inline("footer.html"),
	props: ["page", "status"],
	data: function() {
		return {}
	},
	mounted: function() {
		
	},
	methods: {
		userExit: function() {
			
		}
	}
})
