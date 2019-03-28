var Vue = require("vue");
require("element_ui");
require("header");
require("main");
require("footer");
require("login");
var axios = require("axios");
var vuexStore = require("vuexStore");

var vm = new Vue({
    el: "#app",
    data: {
        articles: [],
        showLogin: 0,
        showUploadHead: true,
        user: {},
        userData:document.getElementById("userData").text,
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
            var articles = JSON.parse(document.getElementById("articles").text);
            if (articles) {
                this.articles = articles;
                return;
            }
            axios.get(that.$api + '/articles', {
                params: {
                    pageNum: 1,
                    pageSize: 10,
                    orderBy: "article_edit_date"
                }
            }).then(function(res) {
                if (res.data.message == 'success') {
                    that.articles = res.data.data.articles;
                }
            });
        },
        getUser: function(user) {
            this.user = user;
        },
        dateFormat: function(date) {
            return utils.dateFormat(date);
        },
        delArticle: function(articles_id, user_id) {
            var that = this;
            if (!that.user.user_id) {
                that.showLogin = 1;
                return;
            }
            if (that.user.user_id != user_id && that.user.user_id != 1) {
                that.$message.error("只能删除自己的文章！");
                return false;
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.get(that.$api + '/articles/delete/' + articles_id+'?token=1',{
                    cancelToken: vuexStore.source.token
                }).then(function(res) {
                    if (res.data.message == 'success') {
                        that.$message.success("删除成功！");
                        that.initArticles();
                    } else {
                        that.$message.success("删除失败！");
                    }
                }).catch(function(err) {
                    that.$message.success(err);
                });
            }).catch(() => {

            });
        }
    }
});