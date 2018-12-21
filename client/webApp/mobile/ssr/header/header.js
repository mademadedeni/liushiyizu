var config = require(require('path').join(__dirname,"../config.js"));
var Vue = require("vue");
module.exports = Vue.component("liu-header", {
	name:'liuHeader',
	template: __inline("../../components/header/header.html"),
	props: {
		active:{
			type:String,
			default:'index'
		}
	},
	data: function() {
		return {
			isShowNav:false,
			navMap:{
				'index':{
					key:'index',
					value:'首页',
					url:"/mobile"
				},
				'game':{
					key:'game',
					value:'游戏',
					url:"/mobile/games"
				},
				'article':{
					key:'article',
					value:'文章',
					url:"/mobile/articles"
				},
				'travelNotes':{
					key:'travelNotes',
					value:'游记',
					url:"/mobile/travelNotes"
				}
			},
			user:false,
		}
	}
})