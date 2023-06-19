<template>
  <div id='building'>
    <nav>
    <div class="logo"><img src="../assets/logo.png"></div>
    <h1 id="title">大数据部署</h1>
  </nav>
    <div class="login-container">
      <div>
      <h2 class="user-login">用&nbsp;户&nbsp;登&nbsp;录</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="username" placeholder="请输入用户名" />
          &nbsp;
        </div>
        <div>
          <label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
          <input type="password" id="password" v-model="password" placeholder="请输入密码" />
          &nbsp;
        </div>
        <div>
        <!-- <button>
          <router-link to="/mainpage" type="submit">登&nbsp;&nbsp;录</router-link>
        </button> -->
        <button @click="callBackendScript" type="submit">登&nbsp;&nbsp;录</button>
        <!-- <button type="submit">登&nbsp;&nbsp;录</button> -->
        &nbsp;&nbsp;&nbsp;
        <router-link to="/register" class="el-menu-item" href="#">用户注册</router-link>
      </div>
      </form>
    </div>
    </div>
  </div>
  </template>
  
  <script>

import axios from 'axios';
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // 执行登录逻辑
        // 这里可以使用 this.username 和 this.password 获取用户名和密码
        // 处理登录成功或失败的情况
        const backendUrl = 'http://localhost:3000';
    axios.post(`${backendUrl}/api/login`, {
    username: this.username,
    password: this.password
  })
    .then(response => {
      // 处理后端响应
      console.log(response.data);
      if (response.data === '登录成功') {
          // 登录成功，跳转到主页面
         this.$router.push('/mainpage');
        }else{
          alert('用户名或密码错误');
        }
    })
    .catch(error => {
      console.error(error);
    });
}
        // if (this.username === 'admin' && this.password === 'password') {
        //   // 登录成功
        //   console.log('登录成功');
        // } else {
        //   // 登录失败
        //   console.log('用户名或密码错误');
        // }
      }
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 650px;
    height: 390px;
    margin:  auto;
    padding: 20px;
    /* border: 1px solid #ccc; */
    border : none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }

  .el-menu-item {
  color: #161515;
}
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  label {
    margin: 50px;
    font-weight: 700;
  }
  
  input[type="text"],
  input[type="password"] {
    padding: 5px;
  }
  
  button {
    width: 75px;
    height: 25px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 150px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  #building{
  background:url("../assets/backgroud.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
#title{
    margin: 50px;
    color: #fff;
    font-size: 100px;
}
.user-login{
    margin-bottom: 50px;
    font-size: 50px;
  }
  </style>
  