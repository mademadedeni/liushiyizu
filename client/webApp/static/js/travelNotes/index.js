var Vue = require("vue");
require("element_ui");
require("header");
require("main");
require("footer");
require("login");
var axios = require("axios");
var _ = require("lodash");

new Vue({
    el: "#app",
    data: {

    },
    mounted: function() {
        this.$nextTick(function() {
            this.init();
        });
    },
    methods: {
        init: function() {
            var that = this;
            axios.post(that.$api+'/travelNotes/update').then(function(res) {
                if (res.data.message == "success") {

                }
            });

            that.um = UE.getEditor('container', {
                toolbars: [
                    ['forecolor', 'bold', 'italic', '|', 'inserttitle', 'blockquote', 'insertcode', 'insertorderedlist', 'insertunorderedlist', '|', 'link', 'unlink', 'simpleupload', 'underline', 'horizontal', '|', 'removeformat']
                ],
                zIndex: 0,
                maximumWords: 5000,
                elementPathEnabled: false,
                initialFrameHeight: 300
            });
        },
        toLogin: function(i) {
            this.showLogin = i;
        },
        closeLogin: function() {
            this.showLogin = 0;
        },
        onCloseUploadHead: function() {
            this.showUploadHead = false;
        },
        onCommitHead: function() {
            this.$refs.upload.submit();
            // this.uploadHeadImg = URL.createObjectURL(file.raw);
        },
        onSuccess: function(res, file) {
            if (res.message == "success") {
                this.showUploadHead = false;
                window.location.reload();
            } else {
                this.$message("上传失败!");
            }
        },
        onChange: function(file, fileList) {
            const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png';
            const isLt2M = file.size / 1024 < 500;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
                return;
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 500KB!');
                return;
            }
            this.uploadHeadImg = file.url;
        },
        uploadHeadbtn: function() {
            this.uploadHeadImg = this.user.user_head_img;
            this.showUploadHead = true;
        },
        getUser: function(user) {
            this.user = user;
        }
    }
});