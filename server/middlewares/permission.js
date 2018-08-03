const utils = require("../utils/utils");

var permission = () => {

    return async (ctx, next) => {
        var path = ctx.originalUrl;
        var regNote = new RegExp("^/note");

        if (regNote.test(path)) {
            if (ctx.session.user && ctx.session.user.permission != 1) {
                ctx.redirect("/");
            }
        }
        await next();
    }
}
module.exports = permission;
