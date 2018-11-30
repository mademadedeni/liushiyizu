/**
 * @require main.css
 */
var Vue = require("vue.js");
module.exports = Vue.component("liu-main", {
	name:'liuMain',
	template: __inline("main.html"),
	props:{
		width:{
			type:String
		},
		height:{
			type:String
		}
	},
	data: function() {
		return {}
	},
	computed:{
		style:function () {
			var style = {};
			if (this.width) {
				style.width = this.width;
			}
			if(this.height){
				style.height = this.height;
			}
			return style;
		}
	},
	mounted: function() {
		this.$nextTick(function () {
			var headerHeight = document.getElementById("liuHeader");
			var footerHeight = document.getElementById("liuFooter");
			this.$el.style.minHeight = window.innerHeight - headerHeight.clientHeight - footerHeight.clientHeight + 'px';
		});
	},
	methods: {
		
	}
})
