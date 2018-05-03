const http = require('http');
const config = require('../../config');
const rp = require('request-promise');

let get = function (path,headers,data) {
   return proxy(path,'get',headers,data);
}

let post = function (path,headers,data) {
   return proxy(path,'post',headers,data);
}

let request = function (options) {
   options.uri = "http://localhost:" + config.serverPort + options.uri;
   return rp(options);
}

let proxy = function(path,method,headers,data) {
   return new Promise((resolve, reject) => {
      const options = {
         // protocol:"http:",
         host:"localhost",
         // hostname:"",
         // family:4,
         port: config.serverPort,
         // localAddress:"",
         // socketPath:"",
         method: method,
         path:path,
         headers: headers,
         // auth:"",
         // agent:"",
         // createConnection:function () {},
         timeout:10000
      };
      var req = http.request(options, (res) => {
         const {statusCode} = res;
         const contentType = res.headers['content-type'];
         let error;
         if (statusCode !== 200) {
            error = new Error('请求失败。\n' + `状态码: ${statusCode}`);
         } else if (!/^application\/json/.test(contentType)) {
            error = new Error('无效的 content-type.\n' + `期望 application/json 但获取的是 ${contentType}`);
         }
         if (error) {
            console.error(error.message);
            // 消耗响应数据以释放内存
            res.resume();
            return;
         }

         res.setEncoding('utf8');
         let rawData = '';
         res.on('data', (chunk) => {
            rawData += chunk;
         });
         res.on('end', () => {
            try {
               const parsedData = JSON.parse(rawData);
               console.log(parsedData);
               resolve(parsedData)
            } catch (e) {
               console.error(e.message);
            }
         })
      }).on('error', (e) => {
         reject(e)
         console.error(`错误: ${e.message}`);
      });

      req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
      });

      // 写入数据到请求主体
      if (data) {
         req.write(JSON.stringify(data));
      }
      req.end();

   })
}
module.exports = {
   get:get,
   post:post,
   request:request
}