var router = require('koa-router')();
var user_controller = require('../../controllers/user_controller.js');
var test_controller = require('../../controllers/test_controller.js');

router.get('/getUser', user_controller.getUser);
router.post('/signIn', user_controller.signIn);
router.post('/login', user_controller.login);
router.post('/eidtInfo', user_controller.eidtInfo);
router.get('/exit', user_controller.exit);
router.get('/checkLogin', user_controller.checkLogin);


// router.get('/getUsers', test_controller.getUser);

module.exports = router;
