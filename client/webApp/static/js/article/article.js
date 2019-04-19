
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
		article:{
			article_create_date:Date.now(),
			article_edit_date:Date.now()
		},
		user:{},
	},
	mounted:function () {
		this.$nextTick(function () {
		    // this.init();
		});
	},
	methods: {
		init:function(){
			var that = this;
			//获取文章内容
			if (article_id) {
				axios.get(that.$api+'/articles/'+article_id).then(function (res) {
					if (res.data.message == 'success') {
						that.article = res.data.data;
					}
				});
			}
		},
        dateFormat:function (date) {
        	return utils.dateFormat(date);
        },
        getUser:function (user) {
        	this.user = user;
        }
	}
});