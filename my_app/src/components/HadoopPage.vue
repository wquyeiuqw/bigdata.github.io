<template>
  <div>
    <ul id="nav">
 <li><a href="#">任务点1</a></li>
 <li><a href="#">任务点2</a></li>
 <li><a href="#">任务点3</a></li>
 <li><a href="#">任务点4</a></li>
 <li><a href="#">任务点5</a></li>   
 </ul>
   <div class="sidebar1">
      <div class="hadoop1">hadoop</div>
      <div class="hive1">hive</div>
      <div class="hbase1">hbase</div>
      <div class="yarn1">yarn</div>
      <div class="hdfs1">hdfs</div>
  </div>
    <div class="needs1">
      Hadoop的环境变量
      <div>
      <input placeholder="JAVA_PATH">
    </div>
    <div>
      <input placeholder="HADOOP_HOME">
    </div>
      <input placeholder="PATH">
    </div>
    <div class="needs2">
      Hadoop的配置文件
      <ul>
        <li>core-site.xml</li>
        <li>hdfs-site.xml</li>
        <li>mapred-site.xml</li>
        <li>yarn-site.xml</li>
      </ul>
      <button @click="callBackendScript" type="button">一键配置</button>
      <!-- <div v-if="showErrorMessage">
      <p>选择不能为空，请重新选择。</p>
    </div> -->
      <div v-if="response">
      响应数据：{{ response }}
    </div>
      <!-- <button>一键配置</button> -->
    </div>
    <div class="needs3">
      Hadoop的机器网络配置
      <div>
      <input placeholder="主机名">
    </div>
    <div>
      <input placeholder="IP地址">
    </div>
      <input placeholder="DNS">
    </div>
    <div class="needs4">
      Hadoop的用户组和权限管理
      <input placeholder="输入Hadoop用户组名">
      <button>创建</button>
      <input placeholder="输入Hadoop用户名">
      <select id="HadoopVersion">
        <option value="">请选择</option>
        <option >root</option>
        <option >用户1</option>
        <option >用户2</option>
        <option >用户3</option>
      </select>

    </div>
    <div class="needs5">
      MapReduce的配置
      <input placeholder="JobTracker的数量">
      <input placeholder="TaskTracker的数量">
      <input placeholder="Reduce的数量">
      <input placeholder="指定Combiner">
      <input placeholder="指定InputFormat">
      <input placeholder="指定OutputFormat">
    </div>
    <button class="back">
      <router-link to="/mainpage">back</router-link>
    </button>
  <router-view></router-view>
  </div>
</template>


<script>

import axios from 'axios';
export default {
  data() {
    return {
      HadoopVersion: "", // 用于绑定选择框的选中值
      //showErrorMessage: false // 控制是否显示错误提示
    };
  },
  
  methods: {
    callBackendScript() {
      // 获取各个选择框的值
      var selectBox = document.getElementById("HadoopVersion");
       var selectedValue = selectBox.value;

       
       //判读选择框是否为空，为空则显示错误信息，跳出函数
      if(selectedValue === ""){
        alert("选择不能为空，请重新选择。");
        // this.showErrorMessage = true;
        return;
      }else{
        // this.showErrorMessage = false;
      }


      const Version ={
      hadoop : selectedValue,
      java: 1.8
  };
      // 在这里调用后端脚本
      // 可以使用axios或其他库发送请求到后端API
      // 将选择的选项作为数据传递给后端
      const backendUrl = 'http://192.168.75.169:3000';
      alert(`${Version.hadoop}`);
      axios.post(`${backendUrl}/api/execute-script`, Version)
        .then(response => {
          // 处理后端脚本调用的响应
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>

a:link {text-decoration: none;color: white;; }
	a:visited {text-decoration: none;color: white; }
	a:active {text-decoration: none;color: white; }
	a:hover {text-decoration: none;color: white; }
#nav {
     margin: 20px ;
    height: 40px;
    background-color:cornflowerblue;
 }         
 #nav ul {
    list-style: none;
    margin-left: 50px;
 }           
 #nav li {
    display: inline;                
 }           
 #nav a {
    line-height: 40px;
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
 }           
#nav a:hover {
    border-radius: 20%;
    background-color:dodgerblue;
 }

.sidebar1{
  position: relative;
  width: 150px;
  height: 550px;
  color: white;

}
.sidebar1 .hadoop1{
  position:absolute;
  list-style: none;
  font-family: 'icomoon';
  width: 120px;
  height: 120px;
  font-weight: 700;
  background-color:lightskyblue;
  border-radius: 50%;
  text-align:center;
  line-height: 120px;
  font-size: 30px;
  float: left;
  margin:15px;
  cursor: pointer;
  transition: all 0.5s;
}

.sidebar1 .hive1{
  position:absolute;
  list-style: none;
  font-family: 'icomoon';
  width: 70px;
  height: 70px;
  font-weight: 700;
  background-color:skyblue;
  border-radius: 50%;
  text-align: center;
  line-height: 75px;
  font-size: 15px;
  float: left;
  margin: 130px 40px 30px 40px;
  cursor: pointer;
  transition: all 0.5s;
}

.sidebar1 .yarn1{
  position:absolute;
  list-style: none;
  font-family: 'icomoon';
  width: 70px;
  height: 70px;
  font-weight: 700;
  background-color: skyblue;
  border-radius: 50%;
  text-align: center;
  line-height: 75px;
  font-size: 15px;
  float: left;
  margin: 230px 40px 30px 40px;
  cursor: pointer;
  transition: all 0.5s;
}

.sidebar1 .hbase1{
  position:absolute;
  list-style: none;
  font-family: 'icomoon';
  width: 70px;
  height: 70px;
  font-weight: 700;
  background-color: skyblue;
  border-radius: 50%;
  text-align: center;
  line-height: 75px;
  font-size: 15px;
  float: left;
  margin: 330px 40px 30px 40px;
  cursor: pointer;
  transition: all 0.5s;
}

.sidebar1 .hdfs1{
  position:absolute;
  list-style: none;
  font-family: 'icomoon';
  width: 70px;
  height: 70px;
  font-weight: 700;
  background-color: skyblue;
  border-radius: 50%;
  text-align: center;
  line-height: 75px;
  font-size: 15px;
  float: left;
  margin: 430px 40px 30px 40px;
  cursor: pointer;
  transition: all 0.5s;
}
.needs1{
  position: absolute;
  width: 400px;
  height: 200px;
  left: 200px;
  top: 200px;
  color: white;
  background-color: lightblue;
  font-size: 30px;

}
 input{
  border-radius: 3%;
  /* height: 20px;
  width: 300px;
  margin: 15px; */
  padding: 5px;
  text-align: left;
}
.needs2{
  position: absolute;
  width: 400px;
  height: 200px;
  left: 650px;
  top: 200px;
  color: white;
  background-color: lightblue;
  font-size: 30px;
}
.needs2 ul{
  
  font-size: 20px;
}

.needs2 button{

  border-radius: 30%;
  height: 50px;
  width: 100px;
  margin: 10px;
  background-color: darkturquoise;
}
.needs3{
  position: absolute;
  width: 400px;
  height: 200px;
  left: 1100px;
  top: 200px;
  color: white;
  background-color: lightblue;
  font-size: 30px;
}
.needs4{
  position: absolute;
  width: 400px;
  height: 200px;
  left: 400px;
  top: 500px;
  color: white;
  background-color: lightblue;
  font-size: 30px;
}
.needs4 input{
  float: left;
  width: 300px;
}
.needs4 button{
  margin-top: 15px;
  margin-bottom: 20px;
}
.needs5{
  position: absolute;
  width: 400px;
  height: 200px;
  left: 850px;
  top: 500px;
  color: white;
  background-color: lightblue;
  font-size: 30px;
}
.needs5 input{
  width: 150px;
  height: 20px;
}
.back{
  position: absolute;
  width: 80px;
  height: 40px;
  left: 1600px;
  top: 700px;
  border-radius: 30%;
  background-color: skyblue;
}
</style>