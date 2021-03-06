/**
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development_env', //环境名称
    port: 6868,         //服务端口号
    sql_host: '107.182.188.103',    //数据库地址
    sql_port: '3306',    //数据库端口
    sql_user:"admin", //数据库用户名
    sql_password:"root", //数据库密码
    sql_database:"liushiyizu", //数据库名
    sql_timeout:30000,  //请求超时30s
    redis_url:'127.0.0.1',       //redis地址
    redis_port: '6379',      //redis端口号
    sessionTimeout:1000*3600*0.5,
    reidTimeout:1000*3600*24*7,

    CODE_SUCCESS:0, //正常
    CODE_NOT_LOGIN:1,// 未登录
    CODE_NOT_PERMISSION:2,//没有权限
    CODE_FIELD_ILLEGAL:9,//字段不合法
    CODE_UNKNOWN_ERROR:10,//未知错误

}