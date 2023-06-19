const nodemailer = require('nodemailer');
const express = require('express');
const connection = require('./data.js'); 

function setupRegisterRoutes() {
    const router = express.Router();
  
    const transporter = nodemailer.createTransport({
      service: 'QQ',
      auth: {
        user: '2578832502@qq.com',
        pass: 'gxwqvsenrqkqebfh'
      }
    });
  
    router.post('/api/send', (req, res) => {
        const email = req.body.email;

        console.log(this.email);
      
        // 生成随机验证码
        const verificationCode = Math.floor(1000 + Math.random() * 9000);
        res.send(`${verificationCode}`);
        // 邮件配置
        const mailOptions = {
          from: '2578832502@qq.com',
          to: email,
          subject: 'Email Verification',
          text: `Your verification code is ${verificationCode}`
        };
      
        // 发送邮件
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send verification code' });
          } else {
            // 将验证码存储在服务器端，用于注册验证
            // ...
            res.json({ message: 'Verification code sent successfully' });
          }
        });
    });
  
    router.post('/api/register', (req, res) => {
        const { username, password, email} = req.body;
        // 在这里进行密码匹配和验证码验证的逻辑
        // if (password !== password_2) {
        //   return res.status(400).json({ message: 'Passwords do not match' });
        // }
        // 验证码验证逻辑
        // ...
      
        // 在这里进行用户注册逻辑的处理
        // ...
      
        // 假设注册成功，返回一个成功消息
        const checkQuery = 'SELECT * FROM users WHERE username = ?';
        connection.query(checkQuery, [username], (checkError, checkResults) => {
          if (checkError) {
            console.error('Error checking username:', checkError);
            res.status(500).send('Internal Server Error');
            return;
          }
      
          if (checkResults.length > 0) {
            // Username already exists
            //res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
            res.send('Username is existed!');
            return;
          }
      
        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        connection.query(query, [username, password, email], (error, results) => {
          if (error) {
            console.error('Error registering user:', error);
            res.status(500).send('Internal Server Error');
            return;
          }
      
          // 注册成功，返回成功消息
          console.log('注册成功');
          res.send('注册成功');
        });
        // res.json({ message: 'Registration successful' });
        });
    });
  
    return router;
  }
  module.exports = setupRegisterRoutes;