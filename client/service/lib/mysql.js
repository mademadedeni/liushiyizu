var mysql = require('mysql');
var config = require('../../config');

var pool = mysql.createPool({
   connectionLimit:20,
   host: config.sql_host,
   user: config.sql_user,
   password: config.sql_password,
   database: config.sql_database
});

let query = function(sql, values) {

   return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
         if (err) {
            reject(err)
         } else {
            console.log("connection mysql success")
            connection.query({sql:sql, timeout:config.sql_timeout, values:values}, (err, rows) => {
               if (err) {
                  reject(err)
               } else {
                  resolve(rows)
               }
               connection.release()
            })
         }
      })
   })

}
module.exports = query