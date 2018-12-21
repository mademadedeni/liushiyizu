var Vue = require("vue");
require("element_ui");
require("mobile-header");
var axios = require("axios");

var vm = new Vue({
    el: "#app",
    data: {
        articleId:articleId,
        article: {
            article_title:"",
            article_content:"<p>�������پŸ��֣�</p>"
        },
        user:{}
    },
    mounted: function() {
        this.$nextTick(function() {
            this.init();
        });
    },
    methods: {
        init: function() {
            var that = this;
            if (that.articleId != "") {
                axios.get(that.$api+'/api/articles/' + that.articleId).then(function (res) {
                    if (res.data.message == "success") {
                        that.article.article_title = res.data.data.article_title;
                        that.article.article_content = res.data.data.article_content;
                    }
                }).catch(function (error) {
                    that.$message.error("ERROR!");
                    console.log(error);
                });
            }
        },
        getUser:function (user) {
            this.user = user;
        },
        commit:function (article) {
            var that = this;
            that.article_content = document.getElementById("articleContent").innerText.trim();
            if (article.article_title == "") {
                that.$message.error("�������Ʋ���Ϊ�գ�");
                return;
            }
            if (article.article_content == "") {
                that.$message.error("�������ݲ���Ϊ�գ�");
                return;
            }
            article.article_content = document.getElementById("articleContent").innerHTML;
            axios.post(that.$api+'/articles/edit', article).then(function(res) {
                if (res.data.message == "success") {
                    that.$message.success("����ɹ���");
                    window.location.href = that.$ctx+"/mobile/articles";
                } else {
                    that.$message.error(res.data.message);
                    console.log(res.data.message);
                }
            }).catch(function (error) {
                that.$message.error("ERROR!");
                console.log(error);
            });
        },
        save:function (article) {
            var that = this;
            article.article_content = document.getElementById("articleContent").innerText.trim();
            if (article.article_title == "") {
                that.$message.error("�������Ʋ���Ϊ�գ�");
                return;
            }
            if (article.article_content == "") {
                that.$message.error("�������ݲ���Ϊ�գ�");
                return;
            }
            if (!that.articleId) {
                that.$message.error("articleId is null");
                return;
            }
            if (!that.user.user_id) {
                that.$message.error("δ��¼");
                return;
            }
            article.article_content = document.getElementById("articleContent").innerHTML;
            axios.post(that.$api+'/articles/edit/' + that.articleId, {
                article_id: that.articleId,
                article_title: article.article_title,
                article_content:article.article_content,
                user_id:that.user.user_id
            }).then(function (res) {
                if (res.data.message == "success") {
                    that.$message.success("����ɹ���");
                    setTimeout(function () {
                        window.location.href = that.$ctx+"/mobile/articles";
                    },1000);
                } else {
                    that.$message.error("����ʧ��!");
                    console.log(res.data.message);
                }
            });
        }
    }
});