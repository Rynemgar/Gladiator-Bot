const mysql = require('mysql');

const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DB,
        multipleStatements: true
});

// reconnect stuff
module.exports = (query, args) => {
    return new Promise((resolve, reject) => {
      pool.query(query, args, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };