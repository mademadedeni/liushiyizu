var Vue = require("vue");
require("elementUI");
var axios = require("axios");

var vm = new Vue({
	el: "#app",
	data: {
		content: '中软国际专业领先卓越认证，屡获业界重量级殊荣。卓越品牌，万千学子信赖首选，全程技术大咖亲指面授，项目经理实训指导，完善的就业保障体系，助你一步到位成为不可替代的技术大牛报名电话：4006663775',
		images: ['http://10.0.0.126/mobile/static/images/20190403085620_1.jpg',
			'http://10.0.0.126/mobile/static/images/20190403085620_2.jpg',
			'http://10.0.0.126/mobile/static/images/20190403085620_3.jpg',
			'http://10.0.0.126/mobile/static/images/20190403085620_4.jpg',
			'http://10.0.0.126/mobile/static/images/20190403085620_5.jpg',
			'http://10.0.0.126/mobile/static/images/20190403085620_6.jpg',
			'http://10.0.0.126/mobile/static/images/20190403085620_7.jpg',
			'http://10.0.0.126/mobile/static/images/20190403085620_8.jpg',
			'http://10.0.0.126/mobile/static/images/20190403085620_9.jpg'
		],
		coverImg: '/mobile/static/images/20190403090234.jpg',
		userData:{},
	},
	mounted: function() {
		this.$nextTick(function() {
			var userData = JSON.parse(document.getElementById("userData").text);
			if (userData.user_id) {
				this.userData = userData;
			}
		});
	},
	methods: {

	}
});