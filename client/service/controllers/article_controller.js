const user_sql = require('../lib/user_sql');
const utils = require('../utils/utils');

//检查登录
exports.articles = async (ctx, next) =>{
    
    // await user_sql.selectUserByName(user.name)
    //     .then(result => {
    //         var res = JSON.parse(JSON.stringify(result));
    //         if (res.length > 0) {
    //             var data = res[0];

    //             if (data.password !== utils.encryption(user.password)) {
    //                 ctx.body = {
    //                     message:'password error'
    //                 }
    //                 return;
    //             }
    //             ctx.body = {
    //                 message : 'success',
    //                 data:{
    //                     name:data.name,
    //                     headImg:data.headImg,
    //                     permission:data.permission
    //                 }
    //             }
    //         }else{
    //             ctx.body = {
    //                 message:'failed'
    //             }
    //         }
    //     }).catch(err => {
    //         if (err) {
    //             ctx.response.status = 500;
    //             console.log(err)
    //             ctx.body = {
    //                 message:err,
    //                 data:false
    //             }
    //         }
    //     });
}
