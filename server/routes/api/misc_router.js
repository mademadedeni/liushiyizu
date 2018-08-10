const router = require('koa-router')()
const misc_controller = require("../../controllers/misc_controller");

router.get('/captcha', misc_controller.captcha);

module.exports = router