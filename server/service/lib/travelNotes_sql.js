const query = require("./mysql");

// 注册用户
let addTravelNotes = function(value) {
  let _sql = "insert into travelNotes(author,title,content,createDate,editDate,money,label,status) values(?,?,?,?,?,?,?,?);";
  return query(_sql, value);
}
// 通过名字查找用户
let selectTravelNotes = function (title) {
  let _sql = `select * from travelNotes where title="${title}"`
  return query(_sql);
}

let updateTravelNotes = function (id,value) {
	var _sql = `update travelNotes set ${value} where id=${id}`;
	return query(_sql);
}

module.exports={
	addTravelNotes,
	selectTravelNotes,
	updateTravelNotes
}