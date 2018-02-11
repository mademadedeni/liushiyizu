const query = require("./mysql");

// 注册用户
let addUser = function(value) {
	let _sql = "insert into user(code,name,password,permission,sex,age,phone,email,address) values(?,?,?,?,?,?,?,?,?);";
	return query(_sql,value);
}

let updateNote = function (id,value) {
	var _sql = `update user set ${value} where id=${id}`;
	return query(_sql);
}

// 查找用户
let selectUser = function (type,row,value) {
	let _sql = "";
	if (type == '0') {
		_sql = `select * from user limit ${row.start},${row.end}`;
	}else{
		_sql = `select * from user where ${type} = '${value}' limit ${row.start},${row.end}`;
	}
	return query(_sql);
}

let selectPermission = function () {
	let _sql = `select id from permission`;
	return query(_sql);
}

let deleteNote = function (id) {
	let _sql = `delete from user where id in (${id})`;
	return query(_sql);
}

module.exports = {
	addUser,
	selectUser,
	selectPermission,
	deleteNote,
	updateNote
}