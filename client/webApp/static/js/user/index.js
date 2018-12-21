var Vue = require("vue");
require("element_ui");
require("header");
require("liu-user-header");
require("liu-user-nav");
require("main");
require("footer");
require("login");
var axios = require("axios");
var _ = require("lodash");

window.vm = new Vue({
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
      userSex: ["男", "女", "保密"],
      articles: [],
      showLogin: 0,
      showUploadHead: false,
      uploadHeadImg: "",
      isUserEidtInfo: false,
      editUser: {
         user_nickname: "",
         user_sex: 0,
         user_age: "",
         user_phone: "",
         user_email: "",
         user_address: "",
         user_signature: ""
      },
      nicknameError: "",
      ageError: "",
      phoneError: "",
      emailError: "",
      addressError: "",
      signatureError: "",
      imgData:{'a':1,'b':'fff'}
   },
   mounted: function() {
      this.$nextTick(function() {
         this.init();
      });
   },
   methods: {
      init: function() {

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
      },
      onCloseUserEdit: function() {
         this.isUserEidtInfo = false;
         this.editUser = {};
      },
      onCommitEidt: function() {
         var that = this;
         var param = that.editUser;
         if (param.user_nickname !== "" && (param.user_nickname.toString().split(" ").length > 1 || !/[a-zA-Z0-9_\.@]/.test(param.user_nickname))) {
            that.nicknameError = "昵称规则2-16位中英文、数字及下划线！";
            return;
         } else {
            that.nicknameError = "";
         }
         if (param.user_age !== "" && (param.user_age.toString().split(" ").length > 1 || !utils.isInteger(param.user_age))) {
            that.ageError = "年龄不符合规则！";
            return;
         } else {
            that.ageError = "";
         }
         if (!utils.isPhone(param.user_phone)) {
            that.phoneError = "手机号不符合规则！";
            return;
         } else {
            that.phoneError = "";
         }
         if (!utils.isEmail(param.user_email)) {
            that.emailError = "邮箱不符合规则！";
            return;
         } else {
            that.emailError = "";
         }
         if (/\n/g.test(param.user_signature)) {
            that.signatureError = "个性签名不符合规则！";
            return;
         } else {
            that.signatureError = "";
         }

         axios.post(that.$api+"/users/eidtInfo", param).then(function(res) {
            if (res.data.message == "success") {
               that.onCloseUserEdit();
               that.$message.success("修改成功！");
               setTimeout("window.location.reload()", 1500);
            } else {
               that.$message.success(res.data.message);
            }
         });
      },
      editUserInfoBtn: function() {
         this.editUser = _.clone(this.user);
         this.isUserEidtInfo = true;
      },
   }
});