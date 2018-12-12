var Vue = require("vue");
require("element_ui");
require("mobile-header");

var vm = new Vue({
    // el: "#app",
    template: __inline("webApp/mobile/ssr/article/article.html"),
    data: {
        ctx:config.ctx,
        articles: [],
        pageSize:10,
        pageNum:1,
        isLoading:false,
    },
    mounted: function() {
        this.$nextTick(function() {
            this.init();
            this.initArticle();
        });
    },
    methods: {
        init: function() {
            var that = this;
        },
        initArticle: function() {
            var that = this;
            axios.get(that.ctx+'/api/articles', {params:{ pageSize: that.pageSize, pageNum: that.pageNum, orderBy: 'article_edit_date' }}).then(function(res) {
                if (res.data.message == 'success') {
                    that.articles = res.data.data.articles;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        dateFormat: function(date) {
            return utils.dateFormat(date);
        },
        loadMore:function () {
            var that = this;
            if (that.isLoading) {
                return;
            }
            that.isLoading = true;
            that.pageNum +=1;
            axios.get(that.ctx+'/api/articles', {params:{ pageSize: that.pageSize, pageNum: that.pageNum, orderBy: 'article_edit_date' }}).then(function(res) {
                if (res.data.message == 'success') {
                    var arr = that.articles.concat(res.data.data.articles);
                    that.articles = arr;
                    if (that.articles.length==res.data.data.totalCount) {
                        that.isLoading = true;
                        return;
                    }
                }
                that.isLoading = false;
            }).catch(function (error) {
                that.isLoading = false;
                console.log(error);
            });
        }
    }
});

document.getElementById('app').remove();
document.body.prepend(vm.$mount().$el);