/**
 * @require header.css
 */
var Vue = require("vue");
module.exports = Vue.component("liu-header", {
	name:'liuHeader',
	template: __inline("header.html"),
	props: {
		active:{
			type:String,
			default:'index'
		}
	},
	data: function() {
		return {
			ctx:config.ctx,
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
	},
	mounted: function() {
		this.$nextTick(function () {
			this.init();
		});
	},
	methods: {
		init:function () {
			var that = this;
			axios.get(this.ctx+"/api/users/checkLogin").then(function (res) {
				if (res.data.message == "success") {
					that.user = res.data.data;
					that.$emit("get-user",that.user);
				}
			}).catch(function (error) {
				console.log(error);
			});
		},
		onHref:function(nav){
			this.isShowNav = false;
			window.location.href = this.ctx + nav.url;
		}
		
	}
})