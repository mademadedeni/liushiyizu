
var _ = require("lodash");
var Vue = require("vue");
require("element_ui");
require("header");
require("footer");
var $ = require("jquery");

window.vm = new Vue({
	el: "#app",
	data: {
		currentNote:{
			user_id:"",
			user_code:"",
			user_name:"",
			user_password:'123456',
			user_permission:5,
			user_sex:0,
			user_age:"",
			user_phone:"",
			user_email:"",
			user_address:""
		},
		sexMap:['男','女',"未知"],
		noteList: [],
		permission:[5],
		isUpdate:false,
		// isPwdReadonly:false,
		isCommit:false,
		isDelete:false
	},
	mounted:function () {
		this.init();
	},
	methods: {
		init:function () {
			var that = this;
			$.get("/api/note/permission",function (res) {
				if (res.message == "success") {
					that.permission = res.data;
				}else{
					console.log(res.message)
				}
			});
			$.get("/api/note/getNote/0/0",function (res) {
				if (res.message == "success") {
					that.noteList = res.data;
				}else{
					console.log(res.message)
				}
			});
		},
		onResetBtn:function () {
			var that = this;
			that.currentNote.user_id = "";
			that.currentNote.user_code = "";
			that.currentNote.user_name = "";
			that.currentNote.user_password = "123456";
			that.currentNote.user_permission = 5;
			that.currentNote.user_sex = 0;
			that.currentNote.user_age = "";
			that.currentNote.user_phone = "";
			that.currentNote.user_email = "";
			that.currentNote.user_address = "";

			that.isPwdReadonly = false;
			this.isUpdate = false;
		},
		onRadioBtn:function (i) {
			this.currentNote.user_sex = i;
		},
		checkField:function (user) {
			var that = this;
			if (!user.user_name || user.user_name === "") {
				that.$message.error("姓名不能为空！");
				return false;
			}else if(!user.user_password || user.user_password === ""){
				that.$message.error("密码不能为空！");
				return false;
			}else if(user.user_name.length > 16){
				that.$message.error("姓名长度超过16为");
				return false;
			}else if(user.user_password.length >16){
				that.$message.error("密码不能超过16位！");
				return false;
			}else if(user.user_password.length < 6){
				that.$message.error("密码不能少于6位！");
				return false;
			}else if(user.user_password.split(' ').length > 1){
				that.$message.error("密码不合法！");
				return false;
			}else if(that.permission.indexOf(user.user_permission - 0) < 0){
				that.$message.error("权限不合法！");
				return false;
			}else if(!utils.isInteger(user.user_sex)){
				that.$message.error("性别不合法！");
				return false;
			}else if(user.user_age !== "" && user.user_age !== null){
				if(user.user_age === 0 || !utils.isInteger(user.user_age)){
					that.$message.error("年龄不合法！");
					return false;
				}
			}
			if(user.user_phone !== null && user.user_phone !== '' && !utils.isPhone(user.user_phone)){
				that.$message.error("手机不合法！");
				return false;
			}else if(user.user_email !== null && user.user_email !== '' && !utils.isEmail(user.user_email)){
				that.$message.error("邮箱不合法！");
				return false;
			}else if(user.user_email !== null && user.user_email.length > 50){
				that.$message.error("邮箱太长，最多40字符！");
				return false;
			}else if(user.user_address !== null && user.user_address.length > 50){
				that.$message.error("地址太长，最多50字符！");
				return false;
			}
			return true;
		},
		onCommitBtn:function () {
			var that = this;
			if (!that.isCommit) {
				that.isCommit = true;
			}else{
				return;
			}
			if (!that.checkField(that.currentNote)) {
				that.isCommit = false;
				return ;
			}

			var params = {
				user_code :that.currentNote.user_code,
				user_name :that.currentNote.user_name,
				user_password :that.currentNote.user_password,
				user_permission :that.currentNote.user_permission,
				user_sex :that.currentNote.user_sex,
				user_age :that.currentNote.user_age,
				user_phone :that.currentNote.user_phone,
				user_email :that.currentNote.user_email,
				user_address :that.currentNote.user_address
			}
			$.post("/api/note/addNote",params,function (res) {
				if (res.message == 'success') {
					console.log(res)
					$.get("/api/note/getNote/0/0",function (res) {
						if (res.message == "success") {
							that.noteList = res.data;
							that.isCommit = false;
							that.$message.success("保存成功!");
							that.onResetBtn();
						}else{
							that.$message("获取数据失败，请手动刷新页面!");
							console.log(res.message)
						}
					});
				}else{
					that.isCommit = false;
					console.log(res.message)
					that.$message.error("保存失败!");
				}
			});
		},
		onUpdateBtn:function () {
			var that = this;
			if (that.isUpdate) {
				that.isUpdate = false;
			}else{
				return;
			}
			if (!that.checkField(that.currentNote)) {
				that.isUpdate = true;
				return ;
			}
			var params = {
				user_id:that.currentNote.user_id,
				user_code :that.currentNote.user_code,
				user_name :that.currentNote.user_name,
				user_password :that.currentNote.user_password,
				user_permission :that.currentNote.user_permission,
				user_sex :that.currentNote.user_sex,
				user_age :that.currentNote.user_age,
				user_phone :that.currentNote.user_phone,
				user_email :that.currentNote.user_email,
				user_address :that.currentNote.user_address
			}
			$.post("/api/note/updateNote",params,function (res) {
				if (res.message == 'success') {
					$.get("/api/note/getNote/0/0",function (res) {
						if (res.message == "success") {
							that.noteList = res.data;
							that.isUpdate = true;
							that.$message.success("更新成功!");
						}else{
							console.log(res.message)
							that.$message("获取数据失败，请手动刷新页面!");
						}
					});
				}else{
					that.isUpdate = true;
					console.log(res.message)
					that.$message.error("更新失败!");
				}
			});
		},
		onEditBtn:function (note) {
			if (note.user_id == 1) {
				this.$message.error("禁止编辑admin账户!");
				return false;
			}
			var cloneNote = _.cloneDeep(note);
			cloneNote.password = '';
			this.currentNote = cloneNote;
			this.isPwdReadonly = true;
			this.isUpdate = true;
		},
		onDeleteBtn:function(note) {
			var that = this;
			if (!that.isDelete) {
				that.isDelete = true;
			} else {
				return;
			}
			if (note.user_id == 1) {
				that.$message.error("禁止删除admin账户!");
				return false;
			}
			var params = {
				user_id:[note.user_id]
			}
			$.post("/api/note/deleteNote",params,function (res) {
				if (res.message == 'success') {
					$.get("/api/note/getNote/0/0",function (res) {
						if (res.message == "success") {
							that.noteList = res.data;
							that.isDelete = false;
							that.$message.success("删除成功!");
						}else{
							that.$message("获取数据失败，请手动刷新页面!");
							console.log(res.message)
						}
					});
				}else{
					that.isDelete = false;
					console.log(res.message)
					that.$message.error("删除失败!");
				}
			});
		}
	}
});