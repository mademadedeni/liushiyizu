/**
 * @require /webApp/static/js/plugin/swiper/swiper.min.css
 * @require /webApp/static/js/plugin/swiper/swiper.min.js
 */

var Vue = require("vue");
require("element_ui");
require("header");
require("main");
require("footer");
var axios = require("axios");

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
            axios.get(that.$api+'/articles', {params:{ pageSize: 8, pageNum: 1, orderBy: 'article_edit_date' }}).then(function(res) {
                if (res.data.message == 'success') {
                    that.articles = res.data.data.articles;
                }
            });
        },
        dateFormat: function(date) {
            return utils.dateFormat(date);
        }
    }
});