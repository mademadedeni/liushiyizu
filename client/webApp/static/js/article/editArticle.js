
var Vue = require("vue");
require("element_ui");
require("header");
require("footer");
require("login");
var $ = require("jquery");

var vm = new Vue({
	el: "#app",
	data: {
		article: {
			article_id:article_id,
			article_title:'',
			article_content:''
		},
		showLogin:0,
		showUploadHead:true,
	},
	mounted:function () {
		this.$nextTick(function () {
		    this.init();
		});
	},
	methods: {
		init:function(){
			var that = this;
			// ��ʼ���༭��
			window.um = UE.getEditor('container', {
			  toolbar: [
			    'image'
			  ],
			  zIndex:0
			});

			//��ȡ��������
			if (that.article.article_id) {
				$.get('/api/articles/'+article_id,{},function (res) {
					if (res.message == 'success') {
						that.article.article_id = res.data.article_id;
						that.article.article_title = res.data.article_title;
						that.article.article_content = res.data.article_content;
						um.setContent(that.article.article_content);
					}
				})
			}
		},
        toLogin:function (i) {
        	this.showLogin = i;
        },
        closeLogin:function () {
        	this.showLogin = 0;
        },
        onCommit:function(){
        	var that = this;
        	if (that.article.article_title.length < 3 || that.article.article_title.length > 30) {
        		that.$message.error("������3-30���ֵı��⣡");
        	}

			that.article.article_content = um.getContent();

        	if (that.article.article_content.length < 9 || that.article.article_content.length > 5000) {
        		that.$message.error("������9-5000���ֵ����ݣ�");
        	}

        	if (that.article.article_id) {
        		$.post('/api/article/edit/'+that.article.article_id,that.article,function (res) {
        			if (res.message == "success") {
        				that.$message.success("����ɹ���");
        			}else{
        				that.$message.error("����ʧ��!");
        				console.log(res.message);
        			}
        		});
        	}else{
        		$.post('/api/article/edit',that.article,function (res) {
        			if (res.message == "success") {
        				that.$message.success("����ɹ���");
        				window.location.href = "/article";
        			}else{
        				that.$message.error("����ʧ��!");
        				console.log(res.message);
        			}
        		});
        	}
        }
	}
});