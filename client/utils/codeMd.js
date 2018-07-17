module.exports = function (code) {
	var pwd='';
	/*var chars = code.split('');
	var ASCIIS = [];
	var lowerCases = [];
	var upperCases = [];

	for (var i = 0; i < chars.length; i++) {
		ASCIIS.push(chars[i].charCodeAt());
		lowerCases.push(chars[i].toLowerCase());
		upperCases.push(chars[i].toUpperCase());
	}*/

	var base64 = new Buffer(code).toString('base64');
	pwd = base64.substring(3) + base64.substring(0,3);

	return pwd;
}