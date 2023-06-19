<template>
    <div class="page">
      <h1>安装部署</h1>
    <div class="container">
    <div class="hadoop">
        <h2>hadoop</h2>
      <label for="HadoopVersion">Hadoop版本:</label>
      <select id="HadoopVersion">
        <option value="">请选择</option>
        <option >3.0.0</option>
        <!-- <option >000</option>
        <option >001</option>
        <option >002</option> -->
      </select>
      <br>
      <label for="JavaVersion">Java版本:</label>
      <select id="JavaVersion">
        <option value="">请选择</option>
        <option >8</option>
        <option >11</option>
        <!-- <option >000</option>
        <option >001</option>
        <option >002</option> -->
      </select>
    </div>

    <div class="zookeeper">
        <h2>zookeeper</h2>
      <label for="ZookeeperVersion">Zookeeper版本:</label>
      <select id="ZookeeperVersion">
        <option value="">请选择</option>
        <option >3.4.6</option>
      </select>
      <br>
  
    </div> 
    
      <div class="spark">
        <h2>spark</h2>
      <label for="SparkVersion">Spark版本:</label>
      <select id="SparkVersion">
        <option value="">请选择</option>
        <option >3.0.0</option>
      </select>
      <br>
    </div>

    <div class="hive">
        <h2>hive</h2>
      <label for="HiveVersion">Hive版本:</label>
      <select id="HiveVersion">
        <option value="">请选择</option>
        <option >2.3.9</option>
      </select>
      <br>
    </div>

    <div class="hbase">
        <h2>hbase</h2>
      <label for="HbaseVersion">Hbase版本:</label>
      <select id="HbaseVersion">
        <option value="">请选择</option>
        <option >2.0.6</option>
      </select>
      <br>
    </div>

    <div class="kafka">
        <h2>kafka</h2>
      <label for="KafkaVersion">Kafkas版本:</label>
      <select id="KafkaVersion">
        <option value="">请选择</option>
        <option >2.0.1</option>
      </select>
      <br>
    </div>

    </div>

      <button @click="callBackendScript" type="button" class="deploy">一键部署</button>
      <router-view></router-view>

    </div>
</template>

<script>


import axios from 'axios';
export default {
  data() {
    return {
      JavaVersion:"",
      HadoopVersion: "", // 用于绑定选择框的选中值
      SparkVersion:"",
      ZookeeperVersion:"",
      HiveVersion:"",
      HbaseVersion:"",
      KafkaVersion:"",
    };
  },
  
  methods: {
    callBackendScript() {
      // 获取各个选择框的值
      var selectBox = document.getElementById("HadoopVersion");
       var HadoopValue = selectBox.value;

       selectBox = document.getElementById("JavaVersion");
       var JavaValue = selectBox.value;

       selectBox = document.getElementById("ZookeeperVersion");
       var ZookeeperValue = selectBox.value;
      
       selectBox = document.getElementById("SparkVersion");
       var SparkValue = selectBox.value;

       selectBox = document.getElementById("HiveVersion");
       var HiveValue = selectBox.value;

       selectBox = document.getElementById("HbaseVersion");
       var HbaseValue = selectBox.value;
       
       selectBox = document.getElementById("KafkaVersion");
       var KafkaValue = selectBox.value;

       //判读选择框是否为空，为空则显示错误信息，跳出函数
      if(HadoopValue === "" || JavaValue === "" || ZookeeperValue === "" || SparkValue === "" || HiveValue === "" || HbaseValue === "" || KafkaValue === ""){
        alert("选择不能为空，请重新选择。");
        return;
      }else{
        console.log("开始部署.....");
      }
      const frontendData = {
  HADOOP_VERSION: HadoopValue,
  JAVA_VERSION:JavaValue,
  ZOOKEEPER_VERSION:ZookeeperValue,
  SPARK_VERSION:SparkValue,
  HIVE_VERSION:HiveValue,
  HBASE_VERSION:HbaseValue,
  KAFKA_VERSION:KafkaValue
};
// console.log(frontendData.HADOOP_VERSION);
      // 可以使用axios或其他库发送请求到后端API
      // 将选择的选项作为数据传递给后端
      const backendUrl = 'http://localhost:3000';
      axios.post(`${backendUrl}/api/deploy`, frontendData)
        .then(response => {
          // 处理后端脚本调用的响应
          console.log(response.data);
          console.log('API request successful'); 
               })
        .catch(error => {
          console.error(error);
        });
      }
    }
};
</script>



<style>

.container {
   position: relative;
}


.hadoop {
  position: absolute;
  margin-top: 100px;
  margin-left: 200px;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #000;
}

.zookeeper {
  position: absolute;
  margin-top: 100px;
  margin-left: 450px;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #000;
}

.spark {
  position: absolute;
  margin-top: 100px;
  margin-left: 700px;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #000;
}

.hbase {
  position: absolute;
  margin-top: 100px;
  margin-left: 950px;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #000;
}

.hive {
  position: absolute;
  margin-top: 100px;
  margin-left: 1200px;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #000;
}

.kafka {
  position: absolute;
  margin-top: 100px;
  margin-left: 1450px;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #000;
}


.deploy{
  margin-top: 500px;
  width: 100px;
  height: 50px;
}

</style>