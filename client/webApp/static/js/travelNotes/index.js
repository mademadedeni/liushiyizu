var Vue = require("vue");
require("element_ui");
require("header");
require("footer");
require("login");
var $ = require("jquery");
var _ = require("lodash");

window.vm = new Vue({
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
         // $.post('/api/travelNotes/update',{},function (res) {
         //    console.log(res)
         // });

         window.um = UE.getEditor('container', {
           toolbar: [
             'image'
           ]
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