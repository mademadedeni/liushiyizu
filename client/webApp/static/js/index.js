/**
 * @require /webApp/static/js/plugin/swiper/swiper.min.css
 * @require /webApp/static/js/plugin/swiper/swiper.min.js
 */

var Vue = require("vue");
require("element_ui");
require("header");
require("main");
require("footer");
var $ = require("jquery");

var vm = new Vue({
    el: "#app",
    data: {
        list: [],
        showLogin: 0,
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
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
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