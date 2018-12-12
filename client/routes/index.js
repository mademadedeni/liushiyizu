const router = require('koa-router')()
const article_router = require('./article/index.js');
const error_router = require('./error/index.js');
const game_router = require('./game/index.js');
const note_router = require('./note/index.js');
const travelNotes_router = require('./travelNotes/index.js');
const user_router = require('./user/index.js');
const misc_router = require('./misc.js');
const mobile_router = require('./mobile/index.js');
const utils = require('../utils/utils.js');
const axios = require('axios');

router.use(article_router.routes(), article_router.allowedMethods());
router.use(error_router.routes(), error_router.allowedMethods());
router.use(game_router.routes(), game_router.allowedMethods());
router.use(note_router.routes(), note_router.allowedMethods());
router.use(travelNotes_router.routes(), travelNotes_router.allowedMethods());
router.use(user_router.routes(), user_router.allowedMethods());
router.use(misc_router.routes(), misc_router.allowedMethods());
router.use(mobile_router.routes(), mobile_router.allowedMethods());

router.get('/', async(ctx, next) => {
    var articles = [];
    await axios({
          url: '/api/articles',
          headers: ctx.headers,
          data: {
            pageSize: 8,
            pageNum: 1,
            orderBy: 'article_edit_date'
          }
        })
        .then(function(res) {
            if (res.data.message == "success") {
                articles = res.data.data.articles;
            }
        })
        .catch(function(err) {
            console.log(err)
        });

    await ctx.render("./html/index.html", {"articles":articles,"dateFormat":utils.dateFormat});
});

router.get('/mobile', async(ctx, next) => {
    const renderer = require('vue-server-renderer').createRenderer({
      template: require('fs').readFileSync(require('path').join(__dirname,'../dist/mobile/html/index.html'), 'utf-8')
    });
    require(require('path').join(__dirname,'../dist/mobile/ssr/header/header.js'));
    const app = require(require('path').join(__dirname,'../dist/mobile/ssr/index/index.js'));
    await axios({
          url: '/api/articles',
          headers: ctx.headers,
          data: {
            pageSize: 8,
            pageNum: 1,
            orderBy: 'article_edit_date'
          }
        })
        .then(function(res) {
            if (res.data.message == "success") {
                app.articles = res.data.data.articles;
            }
        })
        .catch(function(err) {
            console.log(err)
        });
    // 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
    renderer.renderToString(app).then(html => {
      ctx.body = html;
    }).catch(err => {
      console.error(err)
    });

    // await ctx.render("./mobile/html/index.html");
});

module.exports = router