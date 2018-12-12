var Vue = require("vue");
var config = require(require('path').join(__dirname,"../config.js"));
var utils = require(require('path').join(__dirname,"../../../../utils/utils.js"));
var vm = new Vue({
    template: __inline("index.html"),
    data: {
    	ctx:config.ctx,
        articles: []
    },
    methods:{
    	dateFormat:utils.dateFormat
    }
});

module.exports = vm;