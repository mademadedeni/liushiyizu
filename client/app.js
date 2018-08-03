const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const onerror = require('koa-onerror');
const json = require('koa-json');
const koaBody = require('koa-body');
const koastatic = require('koa-static');
const router = require('koa-router')();

const routers = require('./routes/index.js');

const urlFilter = require("./middlewares/urlFilter");
//log工具
const logUtil = require('./utils/log_util');

const index = require('./routes/index');
const permission = require('./middlewares/permission');

// error handler
onerror(app);

app.use(permission());
app.use(koastatic(__dirname + '/dist'));

const map = {
   map: {
      html: 'lodash'
   }
}
app.use(views(__dirname + '/dist', map));
//log4
app.use(logUtil.logs);
// 在app.use(router)之前调用
app.use(urlFilter);

app.use(routers.routes(), routers.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
   console.error("server error:", err);
});
module.exports = app