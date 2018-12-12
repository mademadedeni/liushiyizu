/**
 * @require /webApp/static/js/plugin/swiper/swiper.min.css
 * @require /webApp/static/js/plugin/swiper/swiper.min.js
 */

var Vue = require("vue");
require("element_ui");
require("mobile-header");
var $ = require("jquery");

var vm = new Vue({
    // el: "#app",
    template: __inline("webApp/mobile/ssr/index/index.html"),
    data: {
        ctx:config.ctx,
        articles: []
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
            that.$nextTick(function() {
                new Swiper('#swiper', {
                    autoplay: 5000, //可选选项，自动滑动
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    loop: true,
                });
            });
        },
        initArticle: function() {
            var that = this;
            $.get('/api/articles', { pageSize: 8, pageNum: 1, orderBy: 'article_edit_date' }, function(res) {
                if (res.message == 'success') {
                    that.articles = res.data.articles;
                }
            });
        },
        dateFormat: function(date) {
            return utils.dateFormat(date);
        }
    }
});

document.getElementById('app').remove();
document.body.prepend(vm.$mount().$el);