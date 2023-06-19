const Docker = require('dockerode');
const { log } = require('console');
const express = require('express');
const { exec } = require('child_process');

const docker = new Docker();
function Deploy() {
const router = express.Router();
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function buildAndCreateDockerImage(imageName,dockerBuildCommand){
    try{
        const result = await executeCommand(dockerBuildCommand);
        console.log(`构建镜像 ${imageName} 的日志:`, result);
    }catch(error){
        console.error(`构建镜像 ${imageName}时出错:`, error);
        throw error;
    }
}

async function buildCreateDockerContainer() {
  try {
    await executeCommand('docker-compose up -d');
    console.log('容器正在创建...');
    // 等待一段时间以确保容器创建完成
    //res.send('容器创建完成')
  } catch (error) {
    console.error('构建容器时出错:', error);
  }
}

router.post('/api/deploy', async (req, res) => {
  const frontendData = req.body; // 获取前端传递的数据
  const buildArgs = {
    JAVA_VERSION: frontendData.JAVA_VERSION,
    HADOOP_VERSION: frontendData.HADOOP_VERSION,
    SPARK_VERSION: frontendData.SPARK_VERSION,
    HIVE_VERSION: frontendData.HIVE_VERSION,
    HBASE_VERSION: frontendData.HBASE_VERSION,
    KAFKA_VERSION: frontendData.KAFKA_VERSION,
    ZOOKEEPER_VERSION: frontendData.ZOOKEEPER_VERSION,
    //NODE_COUNT: frontendData.NODE_COUNT,
  };
  console.log(buildArgs);
  try {
// 调用构建镜像函数并传递参数
    const dockerBuildCommands = [
      `docker build --build-arg JAVA_VERSION=${buildArgs.JAVA_VERSION} --build-arg HADOOP_VERSION=${buildArgs.HADOOP_VERSION} -t hadoop-${buildArgs.HADOOP_VERSION} ./hadoop --progress=plain  > ./hadoop/output.txt`,
      `docker build --build-arg JAVA_VERSION=${buildArgs.JAVA_VERSION} --build-arg SPARK_VERSION=${buildArgs.SPARK_VERSION} -t spark-${buildArgs.SPARK_VERSION} ./spark --progress=plain > ./spark/output.txt`,
      `docker build --build-arg JAVA_VERSION=${buildArgs.JAVA_VERSION} --build-arg HIVE_VERSION=${buildArgs.HIVE_VERSION} -t hive-${buildArgs.HIVE_VERSION} ./hive --progress=plain > ./hive/output.txt`,
      `docker build --build-arg JAVA_VERSION=${buildArgs.JAVA_VERSION} --build-arg HBASE_VERSION=${buildArgs.HBASE_VERSION} -t hbase-${buildArgs.HBASE_VERSION} ./hbase --progress=plain > ./hbase/output.txt`,
      `docker build --build-arg JAVA_VERSION=${buildArgs.JAVA_VERSION} --build-arg KAFKA_VERSION=${buildArgs.KAFKA_VERSION} -t kafka-${buildArgs.KAFKA_VERSION} ./kafka --progress=plain > ./kafka/output.txt`,
      `docker build --build-arg JAVA_VERSION=${buildArgs.JAVA_VERSION} --build-arg ZOOKEEPER_VERSION=${buildArgs.ZOOKEEPER_VERSION} -t zookeeper-${buildArgs.ZOOKEEPER_VERSION} ./zookeeper --progress=plain > ./zookeeper/output.txt`,
    //   // 添加更多镜像的构建命令
    ];

    const imageNames = [
      'hadoop-' + buildArgs.HADOOP_VERSION,
      'spark-' + buildArgs.SPARK_VERSION,
      'hive-' + buildArgs.HIVE_VERSION,
      'hbase-' + buildArgs.HBASE_VERSION,
      'kafka-' + buildArgs.KAFKA_VERSION,
      'zookeeper-' + buildArgs.ZOOKEEPER_VERSION,
      // 添加更多镜像名称
    ];
    for (let i = 0; i < imageNames.length; i++) {
      const imageName = imageNames[i];
      // const containerName = containerNames[i];
      const dockerBuildCommand = dockerBuildCommands[i];
      await buildAndCreateDockerImage(imageName,dockerBuildCommand);
    }
    console.log('Deployment successful');
    res.send('ok');
    // 调用函数开始构建容器
    buildCreateDockerContainer();

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error deploying container');
  }
});
    return router;
}
module.exports = Deploy;