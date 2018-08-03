const query = require("./mysql");

// 注册用户
let addUser = function(value) {
  let _sql = "INSERT INTO t_user(user_code, user_name, user_password, user_permission, user_head_img) VALUES(?,?,?,?,?);";
  return query(_sql, value)
}
// 通过名字查找用户
let selectUserByName = function (name) {
  let _sql = `SELECT * FROM t_user WHERE user_name="${name}"`
  return query(_sql)
}

let updateUser = function (id,value) {
	var _sql = `UPDATE t_user SET ${value} WHERE user_id=${id}`;
	return query(_sql);
}

module.exports={
	addUser,
	selectUserByName,
	updateUser
}