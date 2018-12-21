var Vue = require("vue");
require("element_ui");
require("header");
require("main");
require("footer");
require("login");
var axios = require("axios");

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
            axios.get(that.$api+'/articles', {params:{ pageNum: 1, pageSize: 10,orderBy:"article_edit_date" }}).then(function(res) {
                if (res.data.message == 'success') {
                    that.articles = res.data.data.articles;
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
        	axios.get(that.$api+'/articles/delete/'+articles_id).then(function (res) {
                if (res.data.message == 'success') {
                    that.$message.success("删除成功！");
                    that.initArticles();
                }
            });
        }
    }
});