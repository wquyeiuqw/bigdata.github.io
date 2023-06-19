<template>
  <div id='building'>
    <nav>
    <div class="logo"><img src="../assets/logo.png"></div>
    <h1 id="title">大数据部署</h1>
  </nav>
  <div class="login-container">
    <div>
    <h2 class="user-register">用&nbsp;&nbsp;户&nbsp;&nbsp;注&nbsp;&nbsp;册</h2>
    <form @register.prevent="register">
      <div>
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="username" placeholder="请输入用户名" />
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" placeholder="请输入密码" />
      </div>
      <div>
        <label for="password_2">确认密码:</label>
        <input type="password" id="password_2" v-model="password_2" placeholder="请确认输入的密码" />
      </div>
      <div>
        <label for="email">邮箱:</label>
        <input type="email" id="email" v-model="email" placeholder="请输入邮箱" />
      </div>

      <!--button type="send">发送</button-->
      
      <div>
        <label for="captcha">验证码:</label>
        <input type="captcha" id="captcha" v-model="captcha" placeholder="验证码" />
      </div>
      <button class="send_button" type="send" @click="startCountdown" :disabled="isCounting">{{ isCounting ? `${countdown}秒后重新发送` : '发送验证码' }}</button>
 
      <button @click="register" class="register-button" type="register">注册</button>
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
      password: '',
      password_2 : '',
      email: '',
      captcha: '',
      countdown: 0, 
      isCounting: false,
      receiveCaptcha: '-1'
    };
  },
  methods: {
    startCountdown(event) {
    event.preventDefault(); 
      if (this.password !== this.password_2) {
    alert('两次输入的密码不一致');
    return;
  }
      var email = document.getElementById("email");
      var emailvalue = email.value; 
      if(emailvalue === '')
      {
            alert('邮箱不能为空！');
      }
      else{
      if (this.countdown > 0 || this.isCounting) {
      return; // 如果正在倒计时或者倒计时剩余时间大于0，则直接返回
     }

      this.isCounting = true; // 设置倒计时状态为开始

    // 发送验证码的逻辑代码，可以在这里调用接口发送验证码
        const backendUrl = 'http://localhost:3000';
        axios.post(`${backendUrl}/api/send`, {
        email: this.email
  })
  .then(response => {
      //alert(`${response.data}`);
      this.receiveCaptcha = response.data;
    })
    this.countdown = 60; // 设置初始倒计时秒数

    const timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(timer); // 清除定时器
        this.isCounting = false; // 设置倒计时状态为结束
      }
    }, 1000); // 每秒更新倒计时剩余秒数
  }
},
  register(event) {
    event.preventDefault(); 
    if (!this.username || !this.password || !this.password_2 || !this.email) {
    alert('请填写完整信息');
    return;
  }
     
        var captcha = document.getElementById("captcha");
        var captchavalue = captcha.value;
      // 处理后端响应
        if(`${this.receiveCaptcha}` === captchavalue)
        {    
        // 执行注册逻辑
        // alert(`${this.receiveCaptcha}`);
        // 处理登录成功或失败的情况
        const backendUrl = 'http://localhost:3000';
        axios.post(`${backendUrl}/api/register`, {
        username: this.username,
        password: this.password,
        //password_2: this.password_2,
        email: this.email,
        // captcha: this.captcha
  })
  
    .then(response => {
      // 处理后端响应
      console.log(response.data);

      if (response.data === '注册成功') {
          // 注册成功，跳转到登录页面
          // this.$router.push('/');
          const confirmLogout = confirm('注册成功！是否回到登录页面？');

    if (confirmLogout) {
      // 用户选择回到登录页面，执行相应的操作，例如：
      this.$router.push('/login'); // 假设登录页面的路由路径为 '/login'
    } else {
      // 用户选择不回到登录页面，执行相应的操作
      // ...
    }
          
        }
        else if(response.data === 'Username is existed!')
        {
          alert(`用户名已存在`);
        }
    })
    .catch(error => {
      console.error(error);
    });
  }
  else{
    alert('验证码不匹配！');
  }
},
}
};
</script>

<style scoped>
.login-container {
    width: 650px;
    height: 390px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #1442be;
    /* border : none; */
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }

.user-register{
  margin-bottom: 25px;
    font-size: 50px;
    
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  margin: 35px;
  font-weight: 700;
}
label[for='username']{
  margin:20px;
}
label[for='password']{
  margin:28px;
}
label[for='password_2']{
  margin:12px;
}
label[for='email']
{
  margin:28px;
}
label[for='captcha']
{
  margin:20px;
}
input[type="text"],
input[type="password"],
input[type="password_2"],
input[type="email"],
input[type="captcha"]
{
  padding: 5px;
  text-align: left;
}
button[type='send']
{
  padding: 2px 2px;
  background-color: #007bff;
  color: #fff;
  margin-left: 400px;
}
.send_button {
  width: 100px; /* 设置按钮宽度 */
  height: 30px; /* 设置按钮高度 */
  position: relative; /* 开启定位属性，以便后续调整位置 */
  top: -75px; /* 设置按钮相对于父容器的上偏移量 */
  left: 20px; /* 设置按钮相对于父容器的左偏移量 */
}


button{
  width:75px;
  height: 25px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 200px;
}

button:hover{
  background-color: #0056b3;
}
#building{
  background:url("../assets/backgroud1.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
#title{
    margin: 50px;
    color: #17191f;
    font-size: 100px;
}
.register-button{
  width: 100px; /* 设置按钮宽度 */
  height: 30px; /* 设置按钮高度 */
  position: relative; /* 开启定位属性，以便后续调整位置 */
  top: -10px; /* 设置按钮相对于父容器的上偏移量 */
  left: 20px; /* 设置按钮相对于父容器的左偏移量 */
}

</style>
