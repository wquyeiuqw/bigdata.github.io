<template>
    <div class="container">
      <h1 class="modify">Hadoop 组件参数调整</h1>
      <div class="component-list">
        <div v-for="component in components" :key="component.name" class="component-item">
          <h2>{{ component.name }}</h2>
          <div class="parameters">
            <div v-for="parameter in component.parameters" :key="parameter.name" class="parameter-item">
              <label class="parameter">{{ parameter.name }}</label>
              <input v-model="parameter.value" type="text">
            </div>
          </div>
        </div>
      </div>
      <button @click="saveParameters" class="save">保存</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        components: [
          {
            name: "HDFS",
            parameters: [
              { name: "dfs.replication", value: "3" },
              { name: "dfs.blocksize", value: "134217728" },
              // Add more parameters as needed
            ],
          },
          {
            name: "YARN",
            parameters: [
              { name: "yarn.nodemanager.resource.memory-mb", value: "8192" },
              { name: "yarn.scheduler.minimum-allocation-mb", value: "1024" },
              // Add more parameters as needed
            ],
          },
          // Add more components as needed
        ],
      };
    },
    methods: {
      saveParameters() {
        // Perform save operation here
        console.log("Parameters saved:", this.components);
      },
    },
  };
  </script>
  
  <style>
  /* .container {
    display: flex;
  } */
  
  .component-list {
    display: flex;
    flex-wrap: wrap;
    padding: 100px;
  }
  
  .component-item {
    flex: 1 1 300px;
    margin: 50px;
    padding: 100px;
    background-color: #f0f0f0;
  }
  
  .parameters {
    margin-top: 10px;
  }
  
  .parameter-item {
    margin-bottom: 20px;
  }
  
  .modify {
    margin-top: 10px;
    margin-left: 500px;
    width: 400px;
  }
  
  .parameter {
    display: inline-block;
    width: 200px;
  }
  
  .save {
  display: inline-block;
  padding: 10px;
  margin-left: 0px;
  border: none;
  cursor: pointer;
  width: 100px; /* 设置按钮宽度 */
  height: 40px; /* 设置按钮高度 */
  }

  </style>
  