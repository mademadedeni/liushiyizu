var router = require('koa-router')();
var test_controller = require('../../controllers/test_controller.js');

router.get('/getUsers', test_controller.getUser);
router.post('/registerUsers', test_controller.registerUser);

module.exports = router;
