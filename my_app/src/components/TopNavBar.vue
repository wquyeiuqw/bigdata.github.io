<template>

<header>
  <nav>

    <div class="logo"><img src="../assets/logo.png"></div>
    <!-- <div class="el-menu-item" href="#"></div> -->
    <!--div class="el-menu-item" href="#">首页</div-->
     <div>
    <router-link to="/" class="el-menu-item" href="#">首页</router-link>
    </div> 
    <div>
    <router-link to="/login" class="el-menu-item" href="#">登录</router-link>
    </div>
    <div>
    <router-link to="/register" class="el-menu-item" href="#">注册</router-link>
    </div>
    <div>
    <router-link to="/check" class="el-menu-item" href="#">realtime</router-link>
    </div>
    <router-view></router-view>

  </nav>
</header>

</template>
<script>
export default {
  name: "TopNavbar",
  methods: {
    goToPage() {

      this.$router.push('/');

      this.$router.push('/login');
      
      this.$router.push('/register');

      this.$router.push('/check');

    }
  }
}
</script>

<style lang="css">
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .el-menu-item {
  color: #161515;
  padding: 10px 25px;
  position: relative;
  text-align: center;
  border-bottom: transparent;
  display: flex;
  transition: 0.4s;
  font-size: larger;
  font-weight: bold;
}
nav .el-menu-item:hover {
  background-color: rgb(177, 219, 226);
  border-bottom: solid 6px;
  border-bottom-color: rgb(177, 219, 226);
  height: 50px;
}

</style>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  header {
    background: rgb(41, 131, 184);
    width: auto;
    height: 100px;
  }
</style>