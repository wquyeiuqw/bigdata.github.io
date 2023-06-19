const express = require('express');
const router = express.Router();
const connection = require('./data');

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      console.log('登录成功');
      res.send('登录成功');
    } else {
      res.send('用户名或密码错误');
    }
  });
});

module.exports = router;