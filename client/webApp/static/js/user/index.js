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
      user: {
         id: null,
         name: "",
         nickname: "",
         headImg: "",
         permission: 5,
         sex: 2,
         age: "",
         phone: "",
         email: "",
         address: "",
         signature: "你怎么这么懒，什么都没有写！"
      },
      userSex: ["男", "女", "保密"],
      articles: [],
      showLogin: 0,
      showUploadHead: false,
      uploadHeadImg: "",
      isUserEidtInfo: false,
      editUser: {
         nickname: "",
         sex: 0,
         age: "",
         phone: "",
         email: "",
         address: "",
         signature: ""
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
         this.uploadHeadImg = this.user.headImg;
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
         var param = {
            nickname: that.editUser.nickname,
            sex: that.editUser.sex,
            age: that.editUser.age,
            phone: that.editUser.phone,
            email: that.editUser.email,
            address: that.editUser.address,
            signature: that.editUser.signature
         }
         if (param.nickname !== "" && (param.nickname.toString().split(" ").length > 1 || !/[a-zA-Z0-9_\.@]/.test(param.nickname))) {
            that.nicknameError = "昵称规则2-16位中英文、数字及下划线！";
            return;
         } else {
            that.nicknameError = "";
         }
         if (param.age !== "" && (param.age.toString().split(" ").length > 1 || !utils.isInteger(param.age))) {
            that.ageError = "年龄不符合规则！";
            return;
         } else {
            that.ageError = "";
         }
         if (!utils.isPhone(param.phone)) {
            that.phoneError = "手机号不符合规则！";
            return;
         } else {
            that.phoneError = "";
         }
         if (!utils.isEmail(param.email)) {
            that.emailError = "邮箱不符合规则！";
            return;
         } else {
            that.emailError = "";
         }
         if (/\n/g.test(param.signature)) {
            that.signatureError = "个性签名不符合规则！";
            return;
         } else {
            that.signatureError = "";
         }

         $.post("/api/users/eidtInfo", param, function(res) {
            if (res.message == "success") {
               that.onCloseUserEdit();
               that.$message.success("修改成功！");
               setTimeout("window.location.reload()", 1500);
            } else {
               that.$message.success(res.message);
            }
         });
      },
      editUserInfoBtn: function() {
         this.editUser = _.clone(this.user);
         this.isUserEidtInfo = true;
      },
   }
});