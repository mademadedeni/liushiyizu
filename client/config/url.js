const path = require("path");
const root = path.join(__dirname , "..");
var url = {
	root:root,
	config: path.join(root,"/config"),
	controllers:path.join(root,"/controllers"),
	error:path.join(root,"/error"),
	logs:path.join(root,"/logs"),
	middlewares:path.join(root,"/middlewares"),
	routes:path.join(root,"/routes"),
	utils:path.join(root,"/utils"),
	webApp:path.join(root,"/webApp")
}
	url.dist = path.join(url.webApp,"/dist");
	url.components = path.join(url.dist,"/components");
	url.html = path.join(url.dist,"/html");
	url.static = path.join(url.dist,"/static");
	url.views = path.join(url.dist,"/views");

module.exports = url;