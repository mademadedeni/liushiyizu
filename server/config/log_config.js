/**
 * log4js 配置文件
 * 
 * 日志等级由低到高
 * ALL TRACE DEBUG INFO WARN ERROR FATAL OFF. 
 * 
 * 关于log4js的appenders的配置说明
 * https://github.com/nomiddlename/log4js-node/wiki/Appenders
 */

var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;


//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

module.exports = {
    appenders: {
        errorLogger: {
            type: 'dateFile',
            filename: errorLogPath,
            alwaysIncludePattern:true,
            pattern:"-yyyy-MM.log", //pattern精确到ss(秒)就是一秒一个文件,精确到mm(分)就是一分一个文件,一次类推:hh(小时),dd(天),MM(月),yyyy(年),yy(年后两位),注意大小写!
            path:responsePath
        },
        resLogger:{
            type: 'dateFile',
            filename: responseLogPath,
            alwaysIncludePattern:true,
            pattern:"-yyyy-MM.log", //pattern是有默认配置的,默认配置是".yyyy-MM-dd"
            path:responsePath
        }
    },
    categories: {
        default: {
            appenders: ['errorLogger'],
            level: 'error'
        },
        resLogger:{
            appenders:['resLogger'],
            level:"all"
        }
    },
    // pm2: true,
    // pm2InstanceVar: 'INSTANCE_ID'
}