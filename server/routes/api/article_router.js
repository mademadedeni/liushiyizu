var router = require('koa-router')();
var article_controller = require('../../controllers/article_controller.js');

// 通过ID查询文章
router.get('/articles/:article_id', article_controller.selectArticleById);
// 查询文章
router.get('/articles', article_controller.selectArticle);
// 删除文章
router.get('/article/delete/:article_id', article_controller.deleteArticle);
//删除多条文章
router.get('/article/delete', article_controller.deleteArticles);
// 编辑/创建 文章
router.post(['/article/edit', '/article/edit/:article_id'], article_controller.editArticle);


module.exports = router;