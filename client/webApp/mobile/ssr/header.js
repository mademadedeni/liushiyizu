var Vue = require("vue");
var config = require(require('path').join(__dirname,"/config.js"));
module.exports = Vue.component("liu-header", {
	name:'liuHeader',
	template: "<header id=\"liuHeader\" class=\"liu_header\">\r\n\t<div class=\"content_box\">\r\n\t\t<a class=\"p_ibt logo\" :href=\"$ctx\"></a>\r\n\t\t<div class=\"p_ibt nav_box\">\r\n\t\t\t<a :class=\"{on:tabId == 1}\" class=\"p_ibt nav\" :href=\"$ctx\">首页</a>\r\n\t\t\t<a v-if=\"user.user_permission == 1\" :class=\"{on:tabId == 2}\" class=\"p_ibt nav\" :href=\"$ctx+'/notes'\">笔记</a>\r\n\t\t\t<a :class=\"{on:tabId == 3}\" class=\"p_ibt nav\" :href=\"$ctx+'/games'\">游戏</a>\r\n\t\t\t<a :class=\"{on:tabId == 4}\" class=\"p_ibt nav\" :href=\"$ctx+'/articles'\">文章</a>\r\n\t\t\t<a :class=\"{on:tabId == 5}\" class=\"p_ibt nav\" :href=\"$ctx+'/travelNotes'\">游记</a>\r\n\t\t</div>\r\n\t\t<div class=\"right\">\r\n\t\t\t<div class=\"p_ibt search_box\">\r\n\t\t\t\t<input v-model.trim=\"searchValue\" class=\"input0\" type=\"text\" name=\"search\" maxlength=\"30\" placeholder=\"你想知道什么？\">\r\n\t\t\t\t<a class=\"iconfont icon-search\" :href=\"searchUrl+searchValue\" target=\"_blank\"></a>\r\n\t\t\t</div>\r\n\t\t\t<div v-if=\"user.user_id\" class=\"p_ibt liu_header_box\">\r\n\t\t\t\t<div class=\"menu_box\">\r\n\t\t\t\t\t<a class=\"p_ibt head\" :href=\"$ctx+'/user/private'\">\r\n\t\t\t\t\t\t<img :src=\"$ctx+user.user_head_img\" :title=\"user.user_name\">\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t<div class=\"menu_conent\">\r\n\t\t\t\t\t\t<div class=\"item_box\">\r\n\t\t\t\t\t\t\t<a class=\"p_ibt item\" :href=\"$ctx+'/user/private'\">个人中心</a>\r\n\t\t\t\t\t\t\t<a class=\"p_ibt item\" :href=\"$ctx+'/article/editor'\">写好文章</a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"exit_box\">\r\n\t\t\t\t\t\t\t<a @click=\"onExit\" class=\"p_ibt exit_btn\" href=\"javascript:;\">安全退出</a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div v-if=\"!user.user_id\" class=\"p_ibt sign_box\">\r\n\t\t\t\t<a @click=\"toLoginBtn(1)\" class=\"sign_btn\" href=\"javascript:;\">登陆</a>\r\n\t\t\t\t<a @click=\"toLoginBtn(2)\" class=\"sign_btn\" href=\"javascript:;\">注册</a>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</header>",
	props: {
		tabId:[String, Number],
		userData:''
	},
	data: function() {
		return {
			searchValue:"",//搜索内容
			searchUrl:this.$ctx+"/search?value=",
			user:{
				user_id:null,
				user_name:"",
				user_nickname:"",
				user_headImg:"",
				user_permission:5,
				user_sex:2,
				user_age:null,
				user_phone:"",
				user_email:"",
				user_address:"",
				user_signatrue:""
			}
		}
	}
})

