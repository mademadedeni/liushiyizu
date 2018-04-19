const path = require("path");
const root = path.join(__dirname , "..");
var url = {
	root:root,
	config: path.join(root,"/config"),
	service:path.join(root,"/service"),
	controllers:path.join(root,"/service/controllers"),
	error:path.join(root,"/service/error"),
	lib:path.join(root,"/service/lib"),
	logs:path.join(root,"/service/logs"),
	middlewares:path.join(root,"/service/middlewares"),
	models:path.join(root,"/service/models"),
	routes:path.join(root,"/service/routes"),
	utils:path.join(root,"/service/utils"),
	webApp:path.join(root,"/service/webApp")
}
	url.dist = path.join(url.webApp,"/dist");
	url.components = path.join(url.dist,"/components");
	url.html = path.join(url.dist,"/html");
	url.static = path.join(url.dist,"/static");
	url.views = path.join(url.dist,"/views");

module.exports = url;