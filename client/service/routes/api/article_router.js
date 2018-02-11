var router = require('koa-router')();
var article_controller = require('../../controllers/article_controller.js');

router.get('/articles', user_controller.articles);

module.exports = router;