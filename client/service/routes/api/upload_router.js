var router = require('koa-router')();
var upload_controller = require('../../controllers/upload_controller.js')

router.post("/upload/head", upload_controller.uploadHead);


module.exports = router;