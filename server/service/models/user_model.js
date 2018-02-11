const utils = require('../utils/utils');

let user = {
	id:{
		name:'id',
		type:'int',
		isNull:false,
		length:10
	},
	code:{
		name:"code",
		type:"string",
		isNull:false,
		length:16,
		default:'0'
	},
	name:{
		name:"name",
		type:"string",
		isNull:false,
		length:16
	},
	nickname:{
		name:"nickname",
		type:"string",
		isNull:true,
		length:16
	},
	password:{
		name:"password",
		type:"string",
		isNull:false,
		length:16
	},
	permission:{
		name:"permission",
		type:"int",
		isNull:false,
		length:2,
		default:5,
		enum:[1,2,3,4,5]
	},
	sex:{
		name:"sex",
		type:"int",
		isNull:true,
		length:2,
		default:2,
		enum:[0,1,2]
	},
	age:{
		name:"age",
		type:"int",
		isNull:true,
		length:3
	},
	phone:{
		name:"phone",
		type:"string",
		isNull:true,
		length:11
	},
	email:{
		name:"email",
		type:"string",
		isNull:true,
		length:40
	},
	address:{
		name:"address",
		type:"string",
		isNull:true,
		length:50
	},
	headImg:{
		name:"headImg",
		type:"string",
		isNull:true,
		default:"/static/upload/head/default.jpg",
		length:150
	},
	signature:{
		name:"signature",
		type:"string",
		isNull:true,
		length:100
	},
	/**
	 * 将user对象转成update参数字符串
	 * @param user [用户对象]
	 * @return ["key=value,key=value"形式的字符串]
	 */
	updateUser:function (user) {
		var data = "";
		for(key in user){
			if (key == "id") {
				continue;
			}
		    if (this[key].type === "string") {
		    	data += key + "=" + "'" + user[key] + "'" + ",";
		    }else{
		    	data += key + "=" + user[key] + ",";
		    }
		}
		return data.substring(0,data.length-1);
	},
	/**
	 * [user排序及默认值处理]
	 * @param 用户对象
	 * @return 数组
	 */
	addUser:function (user) {
		var data = [];
		var orderBy = ['code','name','password','permission','sex','age','phone','email','address'];
		for (var i = 0; i < orderBy.length; i++) {
			data.push(user[orderBy[i]]);
		}
		if (data[3] === '' || typeof data[3] === 'undefined') {
			data[3] = 5;
		}
		return data;
	},
	/**
	 * 判断type是否为有效字段
	 * @param  {[type]}  type [description]
	 * @return {Boolean}      [description]
	 */
	hasField:function (type) {
		if (this.name.name == type) {
			return true;
		}else if (this.permission.code == type){
			return true;
		}else if (this.sex.name == type){
			return true;
		}else if (this.age.name == type){
			return true;
		}else if (this.phone.name == type){
			return true;
		}else if (this.email.name == type){
			return true;
		}else if (this.address.name == type){
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 获取user的所有字段list
	 * @return  user字段名数组
	 */
	getColumns:function () {
		return [this.id.name,this.code.name,this.name.name,this.password.name,this.permission.name,this.sex.name,this.age.name,this.phone.name,this.email.name,this.address.name]
	},
	/**
	* 验证字段是否合法
	* @params field:字段名称
	* @params value:字段值
	*/
	checkField:function (field,value) {
		//id
		if (field === this.id.name) {
			if (!value || value == 0 || !utils.isInteger(value) || value.toString().length > this.id.length) {
			    return false;
			}
			return true;
		}
		//code
		if (field === this.code.name) {
			return true;
		}
		//name
		if (field === this.name.name) {
			if (!value || value.toString().length > this.name.length || value.split(' ').length > 1 || !/[a-zA-Z0-9_\.@]/.test(value)) {
				return false;
			}
			return true;
		}
		//nickname
		if (field === this.nickname.name) {
			if (!value || value.toString().length > this.name.length || value.split(' ').length > 1 || !/[a-zA-Z0-9_\.@]/.test(value)) {
				return false;
			}
			return true;
		}
		//password
		if (field === this.password.name) {
			if (!value || value.toString().length > this.password.length || value.toString().length < 6 || value.split(' ').length > 1) {
				return false;
			}
			return true;
		}
		// permission
		if (field === this.permission.name) {
			if (this.permission.isNull && (value === '' || value === null || typeof value === "undefined")) {
				return true;
			}else if (this.permission.enum.indexOf(value) < 0) {
				return false;
			}
			return true;
		}
		// sex
		if (field === this.sex.name) {
			if (this.sex.isNull && (value === '' || value === null || typeof value === "undefined")) {
				return true;
			}else if(this.sex.enum.indexOf(value) < 0){
				return false;
			}
			return true;
		}
		// age
		if (field === this.age.name) {
			if (this.age.isNull && (value === '' || value === null || typeof value === "undefined")) {
				return true;
			}else if(!utils.isInteger(value) || value.toString().length > this.age.length){
				return false;
			}
			return true;
		}
		// phone
		if (field === this.phone.name) {
			if (this.phone.isNull && (value === '' || value === null || typeof value === "undefined")) {
				return true;
			}else if(!utils.isPhone(value)){
				return false;
			}
			return true;
		}
		// email
		if (field === this.email.name) {
			if (this.email.isNull && (value === '' || value === null || typeof value === "undefined")) {
				return true;
			}else if(!utils.isEmail(value)){
				return false;
			}
			return true;
		}
		// address
		if (field === this.address.name) {
			if (this.email.isNull && (value === '' || value === null || typeof value === "undefined")) {
				return true;
			}else if(value.toString().length > this.address.length){
				return false;
			}
			return true;
		}
		// signature
		if (field === this.signature.name) {
			if (this.email.isNull && (value === '' || value === null || typeof value === "undefined")) {
				return true;
			}else if(value.toString().length > this.address.length){
				return false;
			}
			return true;
		}
		return false;
	}
}
module.exports = user;