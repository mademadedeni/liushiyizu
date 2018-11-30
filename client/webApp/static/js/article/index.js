var Vue = require("vue");
require("element_ui");
require("header");
require("main");
require("footer");
require("login");
var $ = require("jquery");

var vm = new Vue({
    el: "#app",
    data: {
        articles: [],
        showLogin: 0,
        showUploadHead: true,
        user:{}
    },
    mounted: function() {
        this.$nextTick(function() {
            this.initArticles();
        });
    },
    methods: {
        init: function() {

        },
        toLogin: function(i) {
            this.showLogin = i;
        },
        closeLogin: function() {
            this.showLogin = 0;
        },
        initArticles: function() {
            var that = this;
            $.get('/api/articles', { pageNum: 1, pageSize: 10,orderBy:"article_edit_date" }, function(res) {
                if (res.message == 'success') {
                    that.articles = res.data.articles;
                }
            });
        },
        getUser:function (user) {
        	this.user = user;
        },
        dateFormat:function (date) {
        	return utils.dateFormat(date);
        },
        delArticle:function (articles_id,user_id) {
        	var that = this;
        	if (!that.user.user_id) {
        		that.showLogin = 1;
        		return;
        	}
        	if (that.user.user_id != user_id && that.user.user_id != 1) {
        		that.$message.error("只能删除自己的文章！");
        		return false;
        	}
        	$.get('/api/articles/delete/'+articles_id,{},function (res) {
        		if (res.message == 'success') {
        			that.$message.success("删除成功！");
        			that.initArticles();
        		}
        	});
        }
    }
});