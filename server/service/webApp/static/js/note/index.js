
var Vue = require("vue");
require("element_ui");
require("header");
require("footer");
var $ = require("jquery");

window.vm = new Vue({
	el: "#app",
	data: {
		currentNote:{
			id:"",
			code:"",
			name:"",
			password:'123456',
			permission:5,
			sex:0,
			age:"",
			phone:"",
			email:"",
			address:""
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
			that.currentNote.id = "";
			that.currentNote.code = "";
			that.currentNote.name = "";
			that.currentNote.password = "123456";
			that.currentNote.permission = 5;
			that.currentNote.sex = 0;
			that.currentNote.age = "";
			that.currentNote.phone = "";
			that.currentNote.email = "";
			that.currentNote.address = "";

			that.isPwdReadonly = false;
			this.isUpdate = false;
		},
		onRadioBtn:function (i) {
			this.currentNote.sex = i;
		},
		checkField:function (user) {
			var that = this;
			if (!user.name || user.name === "") {
				that.$message.error("姓名不能为空！");
				return false;
			}else if(!user.password || user.password === ""){
				that.$message.error("密码不能为空！");
				return false;
			}else if(user.name.length > 16){
				that.$message.error("姓名长度超过16为");
				return false;
			}else if(user.password.length >16){
				that.$message.error("密码不能超过16位！");
				return false;
			}else if(user.password.length < 6){
				that.$message.error("密码不能少于6位！");
				return false;
			}else if(user.password.split(' ').length > 1){
				that.$message.error("密码不合法！");
				return false;
			}else if(that.permission.indexOf(user.permission - 0) < 0){
				that.$message.error("权限不合法！");
				return false;
			}else if(!utils.isInteger(user.sex)){
				that.$message.error("性别不合法！");
				return false;
			}else if(user.age !== "" && user.age !== null){
				if(user.age === 0 || !utils.isInteger(user.age)){
					that.$message.error("年龄不合法！");
					return false;
				}
			}
			if(user.phone !== null && user.phone !== '' && !utils.isPhone(user.phone)){
				that.$message.error("手机不合法！");
				return false;
			}else if(user.email !== null && user.email !== '' && !utils.isEmail(user.email)){
				that.$message.error("邮箱不合法！");
				return false;
			}else if(user.email !== null && user.email.length > 50){
				that.$message.error("邮箱太长，最多40字符！");
				return false;
			}else if(user.address !== null && user.address.length > 50){
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
				code :that.currentNote.code,
				name :that.currentNote.name,
				password :that.currentNote.password,
				permission :that.currentNote.permission,
				sex :that.currentNote.sex,
				age :that.currentNote.age,
				phone :that.currentNote.phone,
				email :that.currentNote.email,
				address :that.currentNote.address
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
				id:that.currentNote.id,
				code :that.currentNote.code,
				name :that.currentNote.name,
				password :that.currentNote.password,
				permission :that.currentNote.permission,
				sex :that.currentNote.sex,
				age :that.currentNote.age,
				phone :that.currentNote.phone,
				email :that.currentNote.email,
				address :that.currentNote.address
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
			if (note.id == 1) {
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
			if (note.id == 1) {
				that.$message.error("禁止删除admin账户!");
				return false;
			}
			var params = {
				id:[note.id]
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