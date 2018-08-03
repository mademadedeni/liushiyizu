const utils = require('../utils/utils');

let t_travelNotes = {
	notes_id:{
		name:'notes_id',
		type:'int',
		isNull:false,
		length:10
	},
	notes_author:{
		name:'notes_author',
		type:'int',
		isNull:false,
		length:11
	},
	notes_title:{
		name:'notes_title',
		type:'string',
		isNull:false,
		length:30
	},
	notes_content:{
		name:'notes_content',
		type:'string',
		isNull:false,
		length:255
	},
	notes_create_date:{
		name:'notes_createDate',
		type:'string',
		isNull:true,
		length:0
	},
	notes_edit_date:{
		name:'notes_createDate',
		type:'string',
		isNull:true,
		length:0
	},
	notes_money:{
		name:'notes_money',
		type:'decimal',
		isNull:true,
		length:10,
		decimal:2
	},
	notes_label:{
		name:'notes_label',
		type:'string',
		isNull:true,
		length:0
	},
	notes_status:{
		name:'notes_status',
		type:'int',
		isNull:true,
		length:10
	},
	updateValue:function (t_travelNotes) {
		var data = "";
		for(key in t_travelNotes){
			if (key == "id") {
				continue;
			}
		    if (this[key].type === "string") {
		    	data += key + "=" + "'" + t_travelNotes[key] + "'" + ",";
		    }else{
		    	data += key + "=" + t_travelNotes[key] + ",";
		    }
		}
		return data.substring(0,data.length-1);
	}
}

module.exports = t_travelNotes;