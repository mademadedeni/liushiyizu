const redis = require('redis');
const config = require("../../config");
var client = redis.createClient(config.redis_url, config.redis_port);

function set(key,value) {
	return client.set(key,JSON.stringify(value));
}

function get(key) {
	var data = "";
	client.get(key,function (err,reply) {
		if (err) {
			throw err;
		}
		return JSON.parse(reply);
	});
	return data;
}

function del(key) {
	return client.del(key);
}

module.exports = {
	set,
	get,
	del
}