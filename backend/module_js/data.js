const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',  // 数据库主机名
    user: 'root',  // 数据库用户名
    password: '1',  // 数据库密码
    database: 'BigData'  // 数据库名称
  });
  connection.connect((err) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
      return;
    }
    console.log('Connected to the database.');
    // 在这里执行数据库操作
  });
  module.exports = connection;