
var Vue = require("vue");
require("element_ui");
require("header");
require("footer");
require("login");
var $ = require("jquery");

var vm = new Vue({
	el: "#app",
	data: {
		article:{
			article_create_date:Date.now(),
			article_edit_date:Date.now()
		},
		showLogin:0,
	},
	mounted:function () {
		this.$nextTick(function () {
		    this.init();
		});
	},
	methods: {
		init:function(){
			var that = this;
			//获取文章内容
			if (article_id) {
				$.get('/api/articles/'+article_id,{},function (res) {
					if (res.message == 'success') {
						that.article = res.data;
					}
				})
			}
		},
        toLogin:function (i) {
        	this.showLogin = i;
        },
        closeLogin:function () {
        	this.showLogin = 0;
        },
        dateFormat:function (date) {
        	return utils.dateFormat(date);
        },
        getUser:function (user) {
        	this.user = user;
        }
	}
});