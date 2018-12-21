var Vue = require("vue");
require("mobile-header");
require("element_ui");
var axios = require("axios");

var vm = new Vue({
    el: "#app",
    data: {
        article:article,
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
            
        },
        getUser:function (user) {
            this.user = user;
        },
        deleteArticle:function () {
            var that = this;
            if (!that.user.user_id) {
                that.showLogin = 1;
                return;
            }
            if (that.user.user_id != article.user_id && that.user.user_id != 1) {
                that.$message.error("只能删除自己的文章！");
                return false;
            }
            axios.get(that.$api+'/articles/delete/'+article.article_id).then(function (res) {
                if (res.data.message == 'success') {
                    that.$message.success("删除成功！");
                    setTimeout(function () {
                        window.location.href = that.$ctx+"/mobile/articles";
                    },1000);
                }else{
                    that.$message.success(res.data.message);
                }
            }).catch(function (error) {
                that.$message.success("删除失败！");
            });
        }
    }
});