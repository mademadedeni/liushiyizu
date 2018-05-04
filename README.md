# liushiyizu
koa2 vue2

##  项目结构简述
  1. client目录
    这个目录主要是客户端项目。这个目录主要内容在webapp目录大部分是页面。
  2. server目录
    这个目录是后端项目。主要提供前端的接口。所有接口地址都要以‘/api’开头，‘/head’开头为头像图片。

#安装
1. 安装fis3 npm install -g fis3
2. 安装fis3的相关插件 npm install -g fis3-hook-module fis-parser-typescript
3. ./client/server/webApp/ fis3 release -d ./dist
4. ./client/npm install
5. ./server/npm install

##  启动项目
1. 启动client服务：npm run start
2. 启动server服务： npm run start
3. 启动redis服务：redis-server.exe redis.windows.conf
4. 启动nginx：nginx.exe
5. 浏览器访问 localhost 就能看到效果了。
