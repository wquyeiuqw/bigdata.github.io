<template>
 <div class="container1">
    <nav class="sidebar">
      <button @click="showComponent('HdfsPage')" class="nav-button">Hdfs</button>
      <button @click="showComponent('YarnPage')" class="nav-button">Yarn</button>
      <button @click="showComponent('ZookeeperPage')" class="nav-button">Zookeeper</button>
    </nav>
    <div class="content">
    <nav class="topbar">
        <button @click="showComponent('SummaryPage')" class="top-button">Summary</button>
        <button @click="showComponent('ConfigPage')" class="top-button">Config</button>
        <a href="http://localhost:50070/dfshealth.html#tab-overview" target="_blank" class="link-button">hadoop-link</a>
        <a href="http://localhost:8088/" target="_blank" class="link-button">spark-link</a>
      </nav>
      <component :is="currentComponent"></component>
    </div>
 </div>
</template>

<script>
import YarnPage from './YarnPage.vue';
import HdfsPage from './HdfsPage.vue';
import ZookeeperPage from './ZookeeperPage.vue';
import SummaryPage from './HdfsPage.vue';
import ConfigPage from './ConfigPage.vue'

export default {
  data() {
    return {
      currentComponent: 'HdfsPage'
    };
  },
  methods: {
    showComponent(component) {
      if (component === 'SummaryPage' && this.currentComponent === 'SummaryPage') {
        // 当前组件已经是"SummaryPage"，不执行任何操作
        return;
      }
      this.currentComponent = component;
    }
  },
  components: {
    YarnPage,
    HdfsPage,
    ZookeeperPage,
    SummaryPage,
    ConfigPage
  }
};
</script>

<style>
.container1 {
  display: flex;
  /* flex-direction: column; */
}

.sidebar {
  width: 200px;
  background-color: #f0f0f0;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

/* .topbar{
  display: flex;
  justify-content: flex-start;
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
} */

.nav-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #fff;
  border: none;
  text-align: left;
  cursor: pointer;
}

.topbar {
  display: flex;
  justify-content: flex-start;
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 10px;
}

.top-button{
  display: inline-block;
  padding: 10px;
  margin-right: 10px;
  background-color: #fff;
  border: none;
  cursor: pointer;
}

.link-button{
  display: inline-block;
  padding: 10px;
  margin-right: 10px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.content {
  flex: 1;
  padding: 10px;
  background-color: #fff;
}

</style>