const router = require('koa-router')()
const article_router = require('./article/index.js');
const error_router = require('./error/index.js');
const game_router = require('./game/index.js');
const note_router = require('./note/index.js');
const travelNotes_router = require('./travelNotes/index.js');
const user_router = require('./user/index.js');
const misc_router = require('./misc.js');
const proxy = require('../utils/proxy.js');
const utils = require('../utils/utils.js');

router.use(article_router.routes(), article_router.allowedMethods());
router.use(error_router.routes(), error_router.allowedMethods());
router.use(game_router.routes(), game_router.allowedMethods());
router.use(note_router.routes(), note_router.allowedMethods());
router.use(travelNotes_router.routes(), travelNotes_router.allowedMethods());
router.use(user_router.routes(), user_router.allowedMethods());
router.use(misc_router.routes(), misc_router.allowedMethods());

router.get('/', async(ctx, next) => {
    var articles = [];
    await proxy.request({
            uri: '/api/articles',
            headers: ctx.headers,
            qs: {
                pageSize: 8,
                pageNum: 1,
                orderBy: 'article_edit_date'
            },
            json: true
        })
        .then(function(res) {
            if (res.message == "success") {
                articles = res.data.articles;
            }
        })
        .catch(function(err) {
            console.log(err)
        });

    await ctx.render("./html/index.html", {"articles":articles,"dateFormat":utils.dateFormat});
});

module.exports = router