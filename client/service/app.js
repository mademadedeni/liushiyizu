const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const onerror = require('koa-onerror');
// const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const koaBody = require('koa-body');
var redisStore = require('koa-redis');
var redis = require('redis');
var session = require('koa-session-minimal');
// var MysqlStore = require('koa-mysql-session');
const logger = require('koa-logger');
const koastatic = require('koa-static');
const router = require('koa-router')();
const api = require('./routes/api');
const note = require('./routes/note');
const error_router = require('./routes/error/error');
const upload_router = require('./routes/api/upload_router');
const user = require('./routes/user/index');
const game = require('./routes/game/index');
const article = require('./routes/article/index');
const misc = require('./routes/misc');

// const test_router = require('./routes/api/test_router.js');
//log工具
const logUtil = require('./utils/log_util');

const index = require('./routes/index');
const response_formatter = require('./middlewares/response_formatter');
const permission = require('./middlewares/permission');

// error handler
onerror(app);

// middlewares
// app.use(bodyparser({
//    enableTypes: ['json', 'form', 'text']
// }));
app.use(koaBody({
   multipart: true,
   onError: function(err, context) {
      throw err;
   }
}));

// app.use(json());
// session存储配置
// const sessionMysqlConfig= {
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE,
//   host: config.database.HOST,
// }
var client = redis.createClient({password:'root'});
app.use(session({
   key: 'liushiyizu', // cookie 中存储 session-id 时的键名, 默认为 koa:sess
   // cookie: {                   // 与 cookie 相关的配置
   //     domain: 'localhost',    // 写 cookie 所在的域名
   //     path: '/',              // 写 cookie 所在的路径
   //     maxAge: 1000 * 60,      // cookie 有效时长 ms
   //     httpOnly: true,         // 是否只用于 http 请求中获取
   //     secure:false,           //是否只用于https请求中获取
   //     overwrite: false        // 是否允许重写
   //  },
   cookie: function(ctx) {
      var maxAge = 0;
      if (ctx.originalUrl == "/api/user/login" && ctx.session.user && ctx.session.user.seven) {
         maxAge = 1000 * 3600 * 24 * 7;
      }
      return {
         // domain: '10.0.0.100',
         path: '/',
         maxAge: maxAge,
         httpOnly: true,
         secure: false
      }
   },
   //redis-server.exe redis.windows.conf
   //redis-cli.exe -h 127.0.0.1 -p 6379
   //CONFIG get requirepass
   //CONFIG set requirepass "runoob"
   store: new redisStore({
      client:client
   })
   // store: new MysqlStore(sessionMysqlConfig)
}))
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

// //添加格式化处理响应结果的中间件，在添加路由之前调用
//仅对/api开头的url进行格式化处理
app.use(response_formatter('^/api'));

app.use(index.routes(), index.allowedMethods());
app.use(error_router.routes(), error_router.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use(note.routes(), note.allowedMethods());
router.use(user.routes(), user.allowedMethods());
router.use(game.routes(), game.allowedMethods());
router.use(article.routes(), article.allowedMethods());
router.use(misc.routes(), misc.allowedMethods());
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
   console.error("server error:", err);
});
module.exports = app