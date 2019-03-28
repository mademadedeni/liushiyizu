window.addEventListener("load", function () {
    var axios = require("axios");
    var vuexStore = require('vuexStore');

    // 添加一个请求拦截器
    axios.interceptors.request.use(function(config) {
        if (!sessionStorage.getItem("userData")&&config.url.indexOf('token')>0) {
            vuexStore.source.cancel();
            vuexStore.login.onShow(1);
        }
        return config;
    }, function(error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // 添加一个响应拦截器
    axios.interceptors.response.use(function(response) {
        if (response.data.code == 1) {
            sessionStorage.removeItem("userData");
            vuexStore.login.onShow(1);
        }
        return response;
    }, function(error) {
        // Do something with response error
        return Promise.reject(error);
    });

});
