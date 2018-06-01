const utils = require('../utils/utils');

let travelNotes = {
	id:{
		name:'id',
		type:'int',
		isNull:false,
		length:10
	},
	author:{
		name:'author',
		type:'int',
		isNull:false,
		length:11
	},
	title:{
		name:'title',
		type:'string',
		isNull:false,
		length:30
	},
	content:{
		name:'content',
		type:'string',
		isNull:false,
		length:255
	},
	createDate:{
		name:'createDate',
		type:'date',
		isNull:true,
		length:0
	},
	editDate:{
		name:'createDate',
		type:'date',
		isNull:true,
		length:0
	},
	money:{
		name:'money',
		type:'decimal',
		isNull:true,
		length:10,
		decimal:2
	},
	label:{
		name:'label',
		type:'string',
		isNull:true,
		length:0
	},
	status:{
		name:'status',
		type:'int',
		isNull:true,
		length:10
	},
	updateValue:function (travelNotes) {
		var data = "";
		for(key in travelNotes){
			if (key == "id") {
				continue;
			}
		    if (this[key].type === "string") {
		    	data += key + "=" + "'" + travelNotes[key] + "'" + ",";
		    }else{
		    	data += key + "=" + travelNotes[key] + ",";
		    }
		}
		return data.substring(0,data.length-1);
	}
}

module.exports = travelNotes;