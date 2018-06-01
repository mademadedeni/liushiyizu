var router = require('koa-router')();
var user_router = require('./user_router');
var upload_router = require('./upload_router');
var note_router = require('./note_router');
var travelNotes_router = require('./travelNotes_router');

router.use('/users', user_router.routes(), user_router.allowedMethods());
router.use(upload_router.routes(), upload_router.allowedMethods());
router.use("/note", note_router.routes(), note_router.allowedMethods());
router.use(travelNotes_router.routes(), travelNotes_router.allowedMethods());

module.exports = router;
