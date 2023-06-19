<template>
    <nav>
        <div class="logo-realtime"><img src="../assets/ikun.png" ></div>
        <div class="top-name">集群管理</div>
    </nav>
    <div class="container">
      <div class="sidebar">
        <div class="item">
          <img src="../assets/jiankong.png">
          <span>监控</span>
          <div class="tooltip">
              <p> HDFS </p>
              <p> YARN </p>
              <p>Text 3</p>
              <p>Text 4</p>
              <p>Text 5</p>
              <button class="operation">操作</button>
    </div>
        </div>
      </div>
    </div>
    <div class="containbox">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </template>

<style lang="css">
/* body {
  background-color: deepskyblue;
} */
.logo-realtime img {
  width: 50px;
  float: left;
}
.top-name {
  font-size: larger;
  font-weight: bold;
}
.container {
  display: flex;
}
.sidebar {
  width: 80px;
  background-color: #f1f1f1;
  padding: 1px;
}
.sidebar .item {
  margin-bottom: 10px;
  cursor: pointer;
  flex-direction: column;
}

.sidebar .item img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.sidebar .item span {
  margin-top: 5px;
}

.sidebar .item:hover .tooltip{
  display: block;
}
.tooltip {
  position: absolute;
  display: none;
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
  background-color: #f1f1f1;
  padding: 10px;
}

.tooltip:hover {
  display: block;
}
.operation {
  width: 50px;
  height: 30px;
  background-color: aqua;
  font-size: large;
}
.containbox {
  margin-left: 90px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.box {
  width: 250px;
  height: 250px;
  margin: 10px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
}
</style>