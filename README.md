# liushiyizu
koa2 vue2

##  项目结构简述
  1. client目录
    这个目录主要是客户端项目。这个目录主要内容在webapp目录大部分是页面。
  2. server目录
    这个目录是后端项目。主要提供前端的接口。所有接口地址都要以‘/api’开头。
    上传的图片以upload开头。

##  Redis配置说明
```
   // key: cookie 中存储 session-id 时的键名, 默认为 koa:sess
   // cookie: {                   // 与 cookie 相关的配置
   //     domain: 'localhost',    // 写 cookie 所在的域名
   //     path: '/',              // 写 cookie 所在的路径
   //     maxAge: 1000 * 60,      // cookie 有效时长 ms
   //     httpOnly: true,         // 是否只用于 http 请求中获取
   //     secure:false,           //是否只用于https请求中获取
   //     overwrite: false        // 是否允许重写
   //  },

   //redis 启动和使用
   //redis-server.exe redis.windows.conf
   //redis-cli.exe -h 127.0.0.1 -p 6379
   //CONFIG get requirepass
   //CONFIG set requirepass "runoob"
```
##  安装
1. 安装fis3 npm install -g fis3
2. 安装fis3的相关插件 npm install -g fis3-hook-module fis-parser-typescript fis3-postpackager-loader
3. ./client/server/webApp/ fis3 release -d ./dist
4. ./client/npm install
5. ./server/npm install

##  启动项目
1. 启动client服务：npm run start
2. 启动server服务： npm run start
3. 启动redis服务：redis-server.exe redis.windows.conf
4. 启动nginx：nginx.exe
5. 浏览器访问 localhost 就能看到效果了。


-------------重启服务器----------------
启动nginx
cd /usr/local/nginx/sbin
./nginx

启动Redis
cd /redis-4.0.9/src
pm2 start redis-server

启动client服务
cd /root/webapp/liushiyizu/client
pm2 -n client start ./bin/www
启动server服务
cd /root/webapp/liushiyizu/server
pm2 -n server start ./bin/www

#检查服务是否都启动了
ps -ef | grep nginx  //nginx 是两个进程
ps -ef | grep redis  //redis 是一个进程
service mysqld status //mysql running...

#正常状态
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────┬───────────┬──────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ cpu │ mem       │ user │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────┼───────────┼──────┼──────────┤
│ redis    │ 2  │ fork │ 19548 │ online │ 0       │ 3m     │ 0%  │ 1.9 MB    │ root │ disabled │
│ server   │ 1  │ fork │ 16507 │ online │ 0       │ 49m    │ 0%  │ 26.6 MB   │ root │ disabled │
│ www      │ 0  │ fork │ 3806  │ online │ 0       │ 3D     │ 0%  │ 41.9 MB   │ root │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────┴───────────┴──────┴──────────┘