const article_sql = require('../lib/article_sql.js');
const utils = require('../utils/utils.js');
const article_model = require('../models/article_model.js');
const _ = require('lodash');
const config = require('../config/index.js');

/**
 * 通过ID查询文章
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.selectArticleById = async(ctx, next) => {
    var query = ctx.params;

    if (!query.article_id && !article_model.checkField(article_model.article_id.name, query.article_id)) {
        return ctx.body = {
            message: "id error"
        }
    }

    await article_sql.selectArticleById(query.article_id)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                var article = res[0];
                ctx.body = {
                    message: 'success',
                    data: {
                        article_id: article.article_id,
                        article_title: article.article_title,
                        article_content: article.article_content,
                        article_create_date: article.article_create_date,
                        article_edit_date: article.article_edit_date,
                        user_id: article.user_id,
                        user_name: article.user_name,
                        user_nickname: article.user_nickname,
                        user_head_img: article.user_head_img,
                        user_signature: article.user_signature,
                    }
                }
            } else {
                ctx.body = {
                    message: 'not found'
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                console.log(err)
                ctx.body = {
                    message: err,
                    data: false
                }
            }
        });
}

/**
 * 查询文章
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.selectArticle = async(ctx, next) => {
    var query = ctx.request.query;
    var params = {
        where: [],
        pageSize: query.pageSize ? query.pageSize : 10, //每页条数
        pageIndex: 0, //从第几条开始取值
        orderBy: ''
    }

    if (!params.pageSize || !utils.isInteger(params.pageSize)) {
        return ctx.body = {
            message: "pageSize error"
        }
    }
    if (query.pageNum !== undefined) {
        if (query.pageNum <= 0 || !utils.isInteger(query.pageNum)) {
            return ctx.body = {
                message: "pageNum error"
            }
        } else {
            params.pageIndex = (query.pageNum - 1) * params.pageSize;
        }
    }

    if (query.title !== undefined) {
        if (article_model.checkField(article_model.article_title.name, query.article_title)) {
            params.where.push(`article_title = ${query.article_title}`);
        } else {
            return ctx.body = {
                message: "title error"
            }
        }
    }

    if (query.article_content !== undefined) {
        if (article_model.checkField(article_model.article_title.name, query.article_content)) {
            params.where.push(`content = ${query.article_content}`);
        } else {
            return ctx.body = {
                message: "title error"
            }
        }
    }

    if (query.orderBy !== undefined && query.orderBy !== '') {
        if (query.orderBy === article_model.article_edit_date.name || query.orderBy === article_model.article_create_date.name) {
            params.orderBy = `ORDER BY t_article.${query.orderBy} DESC`;
        }else{
            return ctx.body = {
                message: 'orderBy error'
            }
        }
    }

    await article_sql.selectArticle(params)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                ctx.body = {
                    message: 'success',
                    data: {
                        articles: res
                    }
                }
            } else {
                ctx.body = {
                    message: 'success',
                    data: {
                        articles: []
                    }
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                console.log(err)
                ctx.body = {
                    message: err,
                    data: false
                }
            }
        });
    // 统计
    await article_sql.countArticle()
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.length > 0) {
                ctx.body.data.totalCount = res[0]['count'];
            } else {
                ctx.body.data.totalCount = 0;
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                console.log(err)
                ctx.body = {
                    message: err,
                    data: false
                }
            }
        });
}


/**@name  编辑或创建文章
 * @description  {code:{0:success,1:not login,2:not permission,3:content error,4:unkown error}}
 * @status  {1:创建,2:更新}
 * @return {[type]}
 */
exports.editArticle = async(ctx, next) => {
    //检查登录
    var user = ctx.session.user;
    var article_id = ctx.params.article_id;
    var article = ctx.request.body;
    //验证标题和内容
    if (!user) {
        return ctx.body = {
            code: config.CODE_NOT_LOGIN,
            message: "not login",
            data: false
        }
    }

    //权限验证 是否编辑，是否编辑自己文章||是否管理员
    if (article_id && (user.user_id != article.user_id && user.user_permission !==1)) {
        return ctx.body = {
            code:config.CODE_NOT_PERMISSION,
            message:"not permission",
            data:false
        }
    }

    //如果是更新验证id
    if (article_id && !article_model.checkField(article_model.article_id.name, article_id)) {
        return ctx.body = {
            code: config.CODE_UNKNOWN_ERROR,
            message: "unkown error",
            data: false
        }
    }
    if (!article_model.checkField(article_model.article_title.name, article.article_title) || !article_model.checkField(article_model.article_content.name, article.article_content)) {
        return ctx.body = {
            code: 4,
            message: "content error",
            data: false
        }
    }

    if (article_id) {
        await article_sql.updateArticle(article_id, article_model.updateValue({
            article_title:article.article_title,
            article_content:article.article_content,
            article_edit_date:Date.now(),
        })).then(result => {
                var res = JSON.parse(JSON.stringify(result));
                if (res.affectedRows > 0) {
                    ctx.body = {
                        message: "success"
                    }
                } else {
                    ctx.body = {
                        message: "failed"
                    }
                }
            }).catch(err => {
                ctx.response.status = 500;
                if (err) {
                    throw err;
                }
            });
    } else {
        await article_sql.createArticle([user.user_id, article.article_title, article.article_content, Date.now(), Date.now()])
            .then(result => {
                var res = JSON.parse(JSON.stringify(result));
                if (res.affectedRows > 0) {
                    ctx.body = {
                        code: config.CODE_SUCCESS,
                        message: "success",
                    }
                }
            }).catch(err => {
                ctx.response.status = 500;
                if (err) {
                    throw err;
                }
            });
    }

}

exports.deleteArticle = async(ctx, next) => {
    //检查登录
    var user = ctx.session.user;
    if (!user) {
        return ctx.body = {
            code: config.CODE_NOT_LOGIN,
            message: "not login",
            data: false
        }
    }
    let article_id = ctx.params.article_id;
    if (user.user_id !== 1) {
        await article_sql.selectArticleById(article_id)
            .then(result => {
                var res = JSON.parse(JSON.stringify(result));
                if (res.length > 0) {
                    if (res[0].article_author == user.user_id) {
                        ctx.body = {
                            message: 'success'
                        }
                    } else {
                        ctx.body = {
                            message: 'You can only delete your own article.'
                        }
                    }
                } else {
                    ctx.body = {
                        message: 'not found'
                    }
                }
            }).catch(err => {
                if (err) {
                    ctx.response.status = 500;
                    console.log(err)
                    ctx.body = {
                        message: err,
                        data: false
                    }
                }
            });

        if (ctx.body.message !== 'success') {
            return ctx.body = {
                message: '没有权限'
            }
        }
    }

    await article_sql.deleteArticle(article_id)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.body = {
                    message: 'success',
                    data: {
                        fieldCount: res.fieldCount,
                        successCount: res.affectedRows
                    }
                };
            } else {
                ctx.body = {
                    message: 'failed'
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                ctx.body = {
                    message: err,
                    data: false
                }
            }
        });
}

// 删除多条文章
exports.deleteArticles = async(ctx, next) => {
    //检查登录
    var user = ctx.session.user;
    if (!user) {
        return ctx.body = {
            code: config.CODE_NOT_LOGIN,
            message: "not login",
            data: false
        }
    }
    let article_id = ctx.params.article_id;

    if (user.permission >= 3) {
        return ctx.body = {
            message: '没有权限',
            code:config.CODE_NOT_PERMISSION
        }
    }

    if (!_.isArray(article_id)) {
        return ctx.body = {
            message: 'id error',
            data: article_id
        }
    }
    _.each(article_id, function(value) {
        if (!utils.isInteger(value)) {
            return ctx.body = {
                message: 'id error',
                data: value
            }
        }
    });

    await article_sql.deleteArticle(article_id.join(','))
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            if (res.affectedRows > 0) {
                ctx.body = {
                    message: 'success',
                    data: {
                        fieldCount: res.fieldCount,
                        successCount: res.affectedRows
                    }
                };
            } else {
                ctx.body = {
                    message: 'failed'
                }
            }
        }).catch(err => {
            if (err) {
                ctx.response.status = 500;
                ctx.body = {
                    message: err,
                    data: false
                }
            }
        });
}