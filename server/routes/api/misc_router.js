const router = require('koa-router')()
const misc_controller = require("../../controllers/misc_controller");

router.get('/api/captcha', misc_controller.captcha);

module.exports = router