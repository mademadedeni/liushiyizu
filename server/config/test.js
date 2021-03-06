/**
 * 测试环境的配置内容
 */

module.exports = {
    env: 'test', //环境名称
    port: 3000,  //服务端口号
    sql_host: 'localhost',    //数据库地址
    sql_port: '3306',    //数据库端口
    sql_user:"root", //数据库用户名
    sql_password:"root", //数据库密码
    sql_database:"zhaikenew_oms_dev", //数据库名
    sql_timeout:30000,  //请求超时30s
    redis_url:'127.0.0.1',       //redis地址
    redis_port: '6379'      //redis端口号
}