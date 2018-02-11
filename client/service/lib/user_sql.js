const query = require("./mysql");

// 注册用户
let addUser = function(value) {
  let _sql = "insert into user(code,name,password,permission,headImg) values(?,?,?,?,?);";
  return query(_sql, value)
}
// 通过名字查找用户
let selectUserByName = function (name) {
  let _sql = `select * from user where name="${name}"`
  return query(_sql)
}

let updateUser = function (id,value) {
	var _sql = `update user set ${value} where id=${id}`;
	return query(_sql);
}

module.exports={
	addUser,
	selectUserByName,
	updateUser
}