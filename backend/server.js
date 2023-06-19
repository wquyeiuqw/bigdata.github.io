// server.js（Node.js后端入口文件）
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
// const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const connection = require('./module_js/data');
const loginRouter = require('./module_js/login');
const setupRegisterRoutes = require('./module_js/register');
const Deploy = require("./module_js/deploy");
const Upload = require('./module_js/upload');

const app = express();
const port = 3000;
app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:8080', 'http://192.168.75.170:8080','http://192.168.226.154:8080','http://192.168.226.166:8080','http://192.168.16.131:8080'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.listen(3000, () => {
  console.log('后端服务器已启动,监听端口3000');
});
app.use('/api/login', loginRouter);

const registerRoutes = setupRegisterRoutes();
app.use(registerRoutes);

// app.use('/api/deploy', deployRouter);
const deployRouter = Deploy();
app.use(deployRouter);

const uploadMiddleware = Upload();
app.use(uploadMiddleware);

