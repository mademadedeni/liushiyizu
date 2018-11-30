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
        article: {
            article_id: article_id,
            article_title: '',
            article_content: '',
            user_id:undefined
        },
        showLogin: 0,
        showUploadHead: true,
        um: {},
        user:{},
    },
    mounted: function() {
        this.$nextTick(function() {
            this.init();
        });
    },
    methods: {
        init: function() {
            var that = this;
            // ��ʼ���༭��
            that.um = UE.getEditor('container', {
                toolbars: [
                    ['forecolor','bold','italic','|','inserttitle','blockquote','insertcode','insertorderedlist','insertunorderedlist','|','link','unlink','simpleupload','underline','horizontal','|','removeformat']
                ],
                zIndex: 0,
                maximumWords:5000,
                elementPathEnabled:false,
                initialFrameHeight:300
            });

            that.um.ready(function() {
                //��ȡ��������
                if (that.article.article_id) {
                    $.get('/api/articles/' + article_id, {}, function(res) {
                        if (res.message == 'success') {
                            that.article.article_id = res.data.article_id;
                            that.article.article_title = res.data.article_title;
                            that.article.article_content = res.data.article_content;
                            that.article.user_id = res.data.user_id;
                            that.um.setContent(that.article.article_content);
                        }
                    })
                }
            }, 2);
        },
        toLogin: function(i) {
            this.showLogin = i;
        },
        closeLogin: function() {
            this.showLogin = 0;
        },
        onCommit: function() {
            var that = this;
            if (that.article.article_title.length < 3 || that.article.article_title.length > 30) {
                that.$message.error("������3-30���ֵı��⣡");
            }

            that.article.article_content = that.um.getContent();

            if (that.article.article_content.length < 9 || that.article.article_content.length > 5000) {
                that.$message.error("������9-5000���ֵ����ݣ�");
            }

            if (that.article.article_id) {
                /*if (that.user.user_id !== that.article.user_id || that.user.user_permistion !== 1) {
                    that.$message.error("û��Ȩ�ޣ�");
                    return;
                }*/
                $.post('/api/articles/edit/' + that.article.article_id, that.article, function(res) {
                    if (res.message == "success") {
                        that.$message.success("����ɹ���");
                    } else {
                        that.$message.error("����ʧ��!");
                        console.log(res.message);
                    }
                });
            } else {
                $.post('/api/articles/edit', that.article, function(res) {
                    if (res.message == "success") {
                        that.$message.success("����ɹ���");
                        window.location.href = "/article";
                    } else {
                        that.$message.error("����ʧ��!");
                        console.log(res.message);
                    }
                });
            }
        },
        getUser:function (user) {
            this.user = user;
        }
    }
});