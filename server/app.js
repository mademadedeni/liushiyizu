const Koa = require('koa');
const app = new Koa();
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const koaViews = require('koa-views');
const redisStore = require('koa-redis');
const redis = require('redis');
const session = require('koa-session-minimal');
const koastatic = require('koa-static');
const router = require('./routes');
const upload_router = require('./routes/api/upload_router');

//log工具
const logUtil = require('./utils/log_util');

const urlFilter = require('./middlewares/urlFilter');
const permission = require('./middlewares/permission');

app.use(koaBody({
   // jsonLimit:'1mb',  //JSON 数据体的大小限制      String/Integer  1mb
   // formLimit:'56kb',    //限制表单请求体的大小    String / Integer 56kb
   // textLimit:'56kb',   //限制 text body 的大小   String / Integer  56kb
   // encoding:'utf-8',    //表单的默认编码         String   utf-8
   multipart: true,     //是否支持 multipart-formdate 的表单(文件上传)     Boolean  false
   // stict:true,         //严格模式,启用后不会解析 GET, HEAD, DELETE 请求   Boolean  true
   onError: function(err, context) {
      throw err;
   },
   /*formidable:{
      maxFields:1000,    //限制字段的数量   Integer  1000
      maxFieldsSize:2 * 1024 * 1024,     //限制字段的最大大小   Integer  2 * 1024 * 1024
      uploadDir:os.tmpDir(),   //文件上传的文件夹 String   os.tmpDir()
      keepExtensions:false,    //保留原来的文件后缀   Boolean  false
      hash:false,    //如果要计算文件的 hash，则可以选择 md5/sha1  String   false
      multipart:true,   //是否支持多文件上传   Boolean  true
      onFileBegin:function(name,file){}   //文件上传前的一些设置操作   Function  function(name,file){}
   }*/
}));

// session存储配置
var redisClient = redis.createClient({password:'root'});
redisClient.on("error", function (err) {
   console.log(err);
    logUtil.errorLogger.error("Error " + err);
});
redisClient.on("connect", function () {
    console.log('connect redis');
});
app.use(session({
   key: 'liushiyizu', 
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
   store: new redisStore({
      client:redisClient
   })
}))
//权限
app.use(permission());
// 静态资源
app.use(koastatic(__dirname + '/webApp'));

//HTML渲染
const map = {
   map: {
      html: 'lodash'
   }
}
app.use(koaViews(__dirname + '/webApp/html', map));

//log4 日志
app.use(logUtil.logs);

//仅对/api开头的url进行格式化处理,在添加路由之前调用
app.use(urlFilter);
//注册路由
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
   console.error("server error:", err);
});
module.exports = app