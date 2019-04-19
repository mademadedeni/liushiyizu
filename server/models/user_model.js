const utils = require('../utils/utils');
const _ = require('lodash');

let t_user = {
	user_id: {
		name: 'user_id',
		type: 'int',
		isNull: false,
		length: 10
	},
	user_code: {
		name: "user_code",
		type: "string",
		isNull: false,
		length: 16,
		default: '0'
	},
	user_name: {
		name: "user_name",
		type: "string",
		isNull: false,
		length: 16
	},
	user_nickname: {
		name: "user_nickname",
		type: "string",
		isNull: true,
		length: 16
	},
	user_password: {
		name: "user_password",
		type: "string",
		isNull: false,
		length: 16
	},
	user_permission: {
		name: "user_permission",
		type: "int",
		isNull: false,
		length: 2,
		default: 5,
		enum: [1, 2, 3, 4, 5]
	},
	user_sex: {
		name: "user_sex",
		type: "int",
		isNull: true,
		length: 2,
		default: 2,
		enum: [0, 1, 2]
	},
	user_age: {
		name: "user_age",
		type: "int",
		isNull: true,
		length: 3
	},
	user_phone: {
		name: "user_phone",
		type: "string",
		isNull: true,
		length: 11
	},
	user_email: {
		name: "user_email",
		type: "string",
		isNull: true,
		length: 40
	},
	user_address: {
		name: "user_address",
		type: "string",
		isNull: true,
		length: 50
	},
	user_head_img: {
		name: "user_head_img",
		type: "string",
		isNull: true,
		default: "/static/upload/head/default.jpg",
		length: 150
	},
	user_signature: {
		name: "user_signature",
		type: "string",
		isNull: true,
		length: 100
	},
	user_create_date: {
		name: "user_create_date",
		type: "string",
		isNull: true,
		length: 20
	},
	/**
	 * 将user对象转成update参数字符串
	 * @param user [用户对象]
	 * @return ["key=value,key=value"形式的字符串]
	 */
	updateUser: function(t_user) {
		var data = "";
		for (key in t_user) {
			if (key == "user_id") {
				continue;
			}
			if (this[key].type === "string") {
				if (_.isNil(t_user[key])) {
					t_user[key] = '';
				}
				data += `${key} = '${t_user[key]}',`;
			} else {
				if (_.isNil(t_user[key])) {
					t_user[key] = '';
				}
				data += `${key} = ${t_user[key]},`;
			}
		}
		return data.substring(0, data.length - 1);
	},
	/**
	 * [user排序及默认值处理]
	 * @param 用户对象
	 * @return 数组
	 */
	addUser: function(t_user) {
		var data = [];
		var orderBy = ['user_code', 'user_name', 'user_password', 'user_permission', 'user_sex', 'user_age', 'user_phone', 'user_email', 'user_address'];
		for (var i = 0; i < orderBy.length; i++) {
			data.push(t_user[orderBy[i]]);
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
	hasField: function(type) {
		if (this.user_name.name == type) {
			return true;
		} else if (this.user_permission.code == type) {
			return true;
		} else if (this.user_sex.name == type) {
			return true;
		} else if (this.user_age.name == type) {
			return true;
		} else if (this.user_phone.name == type) {
			return true;
		} else if (this.user_email.name == type) {
			return true;
		} else if (this.user_address.name == type) {
			return true;
		} else if (this.user_head_img.name == type) {
			return true;
		} else if (this.user_signature.name == type) {
			return true;
		} else if (this.user_createDate.name == type) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 获取user的所有字段list
	 * @return  user字段名数组
	 */
	getColumns: function() {
		return [this.user_id.name, this.user_code.name, this.user_name.name, this.user_password.name, this.user_permission.name, this.user_sex.name, this.user_age.name, this.user_phone.name, this.user_email.name, this.user_address.name, this.user_head_img.name, this.user_signature.name, this.user_create_date.name];
	},
	/**
	 * 验证字段是否合法
	 * @params field:字段名称
	 * @params value:字段值
	 */
	checkField: function(field, value) {
		//id
		if (field === this.user_id.name) {
			if (!value || value == 0 || !utils.isInteger(value) || value.toString().length > this.user_id.length) {
				return false;
			}
			return true;
		}
		//code
		if (field === this.user_code.name) {
			return true;
		}
		//name
		if (field === this.user_name.name) {
			if (!value || value.toString().length > this.user_name.length || value.split(' ').length > 1 || !/[a-zA-Z0-9_\.@]/.test(value)) {
				return false;
			}
			return true;
		}
		//password
		if (field === this.user_password.name) {
			if (!value || value.toString().length > this.user_password.length || value.toString().length < 6 || value.split(' ').length > 1) {
				return false;
			}
			return true;
		}
		//nickname
		if (field === this.user_nickname.name) {
			if (this.user_nickname.isNull && (_.isNil(value) || value === "")) {
				return true;
			}else if (value.toString().length > this.user_name.length || value.split(' ').length > 1 || !/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
				return false;
			}
			return true;
		}
		
		// permission
		if (field === this.user_permission.name) {
			if (this.user_permission.isNull && (_.isNil(value) || value === "")) {
				return true;
			} else if (this.user_permission.enum.indexOf(value) < 0) {
				return false;
			}
			return true;
		}
		// sex
		if (field === this.user_sex.name) {
			if (this.user_sex.isNull && (_.isNil(value) || value === "")) {
				return true;
			} else if (this.user_sex.enum.indexOf(value) < 0) {
				return false;
			}
			return true;
		}
		// age
		if (field === this.user_age.name) {
			if (this.user_age.isNull && (_.isNil(value) || value === "")) {
				return true;
			} else if (!utils.isInteger(value) || value.toString().length > this.user_age.length) {
				return false;
			}
			return true;
		}
		// phone
		if (field === this.user_phone.name) {
			if (this.user_phone.isNull && (_.isNil(value) || value === "")) {
				return true;
			} else if (!utils.isPhone(value)) {
				return false;
			}
			return true;
		}
		// email
		if (field === this.user_email.name) {
			if (this.user_email.isNull && (_.isNil(value) || value === "")) {
				return true;
			} else if (!utils.isEmail(value)) {
				return false;
			}
			return true;
		}
		// address
		if (field === this.user_address.name) {
			if (this.user_email.isNull && (_.isNil(value) || value === "")) {
				return true;
			} else if (value.toString().length > this.user_address.length) {
				return false;
			}
			return true;
		}
		// signature
		if (field === this.user_signature.name) {
			if (this.user_email.isNull && (_.isNil(value) || value === "")) {
				return true;
			} else if (value.toString().length > this.user_address.length) {
				return false;
			}
			return true;
		}
		return false;
	}
}
module.exports = t_user;