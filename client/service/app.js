const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const onerror = require('koa-onerror');
// const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const koaBody = require('koa-body');
// var MysqlStore = require('koa-mysql-session');
const logger = require('koa-logger');
const koastatic = require('koa-static');
const router = require('koa-router')();
const note = require('./routes/note');
const error_router = require('./routes/error/error');
const user = require('./routes/user/index');
const game = require('./routes/game/index');
const article = require('./routes/article/index');
const urlFilter = require("./middlewares/urlFilter");
//log工具
const logUtil = require('./utils/log_util');

const index = require('./routes/index');
const permission = require('./middlewares/permission');

// error handler
onerror(app);

app.use(permission());
app.use(logger());
app.use(koastatic(__dirname + '/webApp/upload'));
app.use(koastatic(__dirname + '/webApp/dist'));

app.use(views(__dirname + '/webApp'), {
   map: {
      pug: 'pug',
      html: 'pug'
   }
});
//log4
app.use(async (ctx, next) => {

   //响应开始时间
   const start = new Date();
   //响应间隔时间
   var ms;
   try {
      //开始进入到下一个中间件
      await next();

      ms = new Date() - start;
      //记录响应日志
      logUtil.logResponse(ctx, ms);

   } catch (error) {

      ms = new Date() - start;
      //记录异常日志
      logUtil.logError(ctx, error, ms);
   }
});

app.use(urlFilter('/'));
app.use(index.routes(), index.allowedMethods());
app.use(error_router.routes(), error_router.allowedMethods());
router.use(note.routes(), note.allowedMethods());
router.use(user.routes(), user.allowedMethods());
router.use(game.routes(), game.allowedMethods());
router.use(article.routes(), article.allowedMethods());
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
   console.error("server error:", err);
});
module.exports = app