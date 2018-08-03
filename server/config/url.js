const path = require("path");
const root = path.join(__dirname , "..");
var url = {
	root:root,
	config: path.join(root,"/config"),
}
	url.controllers=path.join(url.root,"/controllers");
	url.error=path.join(url.root,"/error");
	url.lib=path.join(url.root,"/lib");
	url.logs=path.join(url.root,"/logs");
	url.middlewares=path.join(url.root,"/middlewares");
	url.models=path.join(url.root,"/models");
	url.routes=path.join(url.root,"/routes");
	url.utils=path.join(url.root,"/utils");
	url.webApp=path.join(url.root,"/webApp");
	
	url.dist = path.join(url.webApp,"/dist");
	url.components = path.join(url.dist,"/components");
	url.html = path.join(url.dist,"/html");
	url.static = path.join(url.dist,"/static");
	url.views = path.join(url.dist,"/views");
	url.upload = path.join(url.webApp,"/upload");

module.exports = url;