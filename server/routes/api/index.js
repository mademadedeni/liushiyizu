const router = require('koa-router')();
const user_router = require('./user_router');
const upload_router = require('./upload_router');
const note_router = require('./note_router');
const travelNotes_router = require('./travelNotes_router');
const misc_router = require('./misc_router.js');
const article_router = require('./article_router.js');

router.use('/users', user_router.routes(), user_router.allowedMethods());
router.use(upload_router.routes(), upload_router.allowedMethods());
router.use("/note", note_router.routes(), note_router.allowedMethods());
router.use(travelNotes_router.routes(), travelNotes_router.allowedMethods());
router.use(misc_router.routes(), misc_router.allowedMethods());
router.use(article_router.routes(), article_router.allowedMethods());
module.exports = router;
