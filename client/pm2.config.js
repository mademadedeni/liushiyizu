module.exports = {
    apps: [{
        // 生产环境
        name: "client_prod",
        // 项目启动入口文件
        script: "./bin/www",
        // 项目环境变量
        env: {
            "NODE_ENV": "production",
            // "PORT": 8686
        }
    }, {
        // 测试环境
        name: "client_dev",
        script: "./bin/www",
        env: {
            "NODE_ENV": "development",
            // "PORT": 8686
        }
    }]
}