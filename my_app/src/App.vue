<template>
  <div id="App">
  <div>
    <top-navbar></top-navbar>
  </div>
   <router-view></router-view>
</div>
</template>


<script>
//import HelloWorld from './components/HelloWorld.vue'
//import TopNavbar from './components/TopNavBar.vue'
export default {
  name: 'App',
  components: {
    //HelloWorld,
    // eslint-disable-next-line vue/no-unused-components
    //TopNavbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>


