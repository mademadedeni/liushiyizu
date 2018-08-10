const utils = require('../utils/utils.js');

let t_article = {
	article_id:{
		name:'article_id',
		type:'int',
		isNull:false,
		length:10
	},
	article_author:{
		name:'article_author',
		type:'int',
		isNull:false,
		length:11
	},
	article_title:{
		name:'article_title',
		type:'string',
		isNull:false,
		length:30,
		size:{
			min:3,
			max:30
		}
	},
	article_content:{
		name:'article_content',
		type:'string',
		isNull:false,
		length:255,
		size:{
			min:9,
			max:5000
		}
	},
	article_create_date:{
		name:'article_create_date',
		type:'string',
		isNull:true,
		length:0
	},
	article_edit_date:{
		name:'article_edit_date',
		type:'string',
		isNull:true,
		length:0
	},
	updateValue:function (t_article) {
		var data = "";
		for(key in t_article){
			if (key == "id") {
				continue;
			}
		    if (this[key].type === "string") {
		    	data += key + "=" + "'" + t_article[key] + "'" + ",";
		    }else{
		    	data += key + "=" + t_article[key] + ",";
		    }
		}
		return data.substring(0,data.length-1);
	},
	/**
	* 验证字段是否合法
	* @params field:字段名称
	* @params value:字段值
	*/
	checkField:function (field,value) {
		//id
		if (field === this.article_id.name) {
			if (!value || !utils.isInteger(value) || value.toString().length > this.article_id.length) {
			    return false;
			}
			return true;
		}
		//author
		if (field === this.article_author.name) {
			if (!value || !utils.isInteger(value) || value.toString().length > this.article_author.length) {
			    return false;
			}
			return true;
		}
		// title
		if (field === this.article_title.name) {
			if (!value || value.toString().length > this.article_title.size.max || value.toString().length < this.article_title.size.min) {
			    return false;
			}
			return true;
		}
		// content
		if (field === this.article_content.name) {
			if (!value || value.toString().length > this.article_content.size.max || value.toString().length < this.article_content.size.min) {
			    return false;
			}
			return true;
		}
		
		return false;
	}
}

module.exports = t_article;