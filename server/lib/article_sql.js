const query = require("./mysql");

// 添加文章
let createArticle = function(value) {
    let _sql = "INSERT INTO t_article(article_author, article_title, article_content, article_create_date, article_edit_date) VALUES(?,?,?,?,?);";
    return query(_sql, value);
}
//更新文章
let updateArticle = function(id, value) {
    let _sql = `UPDATE t_article SET ${value} WHERE article_id=${id}`;
    return query(_sql);
}
// 通过ID查找文章
let selectArticleById = function(id) {
    let _sql = `SELECT * FROM t_article INNER JOIN t_user ON t_article.article_author = t_user.user_id WHERE article_id=${id}`;
    return query(_sql);
}

// 查找文章
let selectArticle = function(params) {
    let _sql;
    if (params.where.length > 0) {
        _sql = `SELECT * FROM t_article INNER JOIN t_user ON t_article.article_author = t_user.user_id WHERE ${params.where.join(" AND ")} ${params.orderBy} LIMIT ${params.pageIndex},${params.pageSize}`;
    } else {
        _sql = `SELECT * FROM t_article INNER JOIN t_user ON t_article.article_author = t_user.user_id ${params.orderBy} LIMIT ${params.pageIndex},${params.pageSize}`;
    }

    return query(_sql);
}

// 统计文章总数
let countArticle = function(params) {
    let _sql;
    if (params) {
        _sql = `SELECT Count(*) AS count FROM t_article WHERE ${params}`;
    } else {
        _sql = `SELECT Count(*) AS count FROM t_article`;

    }

    return query(_sql);
}

let deleteArticle = function(id) {
    let _sql = `DELETE FROM t_article WHERE article_id IN (${id})`;
    return query(_sql);
}

module.exports = {
    createArticle,
    updateArticle,
    selectArticle,
    selectArticleById,
    countArticle,
    deleteArticle
}