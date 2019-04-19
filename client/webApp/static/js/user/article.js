var Vue = require("vue");
require("element_ui");
require("header");
require("liu-user-header");
require("liu-user-nav");
require("main");
require("footer");
require("login");
var axios = require("axios");
var vuexStore = require("vuexStore");
var _ = require("lodash");

new Vue({
   el: "#app",
   data: {
      user: {
         user_id: null,
         user_name: "",
         user_nickname: "",
         user_headImg: "",
         user_permission: 5,
         user_sex: 2,
         user_age: "",
         user_phone: "",
         user_email: "",
         user_address: "",
         user_signature: "你怎么这么懒，什么都没有写！"
      },
      articles: [],
      articles:[],
      totalCount:0,
      pageSize:20,
      pageNum:1,
   },
   mounted: function() {
      this.$nextTick(function() {
         this.initArticles();
      });
   },
   methods: {
      dateFormat:function(date) {
         return utils.dateFormat(date);
     },
      initArticles: function() {
         var that = this;
         var articleData = document.getElementById("articles")?document.getElementById("articles").text:null;
         var data = articleData?JSON.parse(articleData):{};
         if (data.articles) {
             this.articles = data.articles;
             this.totalCount = data.totalCount;
             return;
         }
         this.getArticles();
     },
     getArticles:function () {
         var that = this;
         axios.get(that.$api + '/articles', {
             params: {
                 pageNum: that.pageNum,
                 pageSize: that.pageSize,
                 orderBy: "article_edit_date"
             }
         }).then(function(res) {
             if (res.data.message == 'success') {
                 that.articles = res.data.data.articles;
                 that.totalCount = res.data.data.totalCount;
             }
         });
     },
      
      getUser: function(user) {
         this.user = user;
      },
      handleCurrentChange:function (val) {
         this.pageNum = val;
         this.getArticles();
     }
   }
});