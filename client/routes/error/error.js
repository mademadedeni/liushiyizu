var router = require('koa-router')();
var error_controller = require('../../controllers/error/error_controller');

router.get("/error/:type",error_controller.getError);

module.exports = router