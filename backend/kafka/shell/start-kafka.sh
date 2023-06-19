#!/bin/bash
# 启动Hadoop的NameNode和DataNode
hdfs --daemon start namenode
hdfs --daemon start datanode
hdfs --daemon start secondarynamenode
# 启动YARN的ResourceManager和NodeManager
# start-yarn.sh
yarn --daemon start resourcemanager
yarn --daemon start nodemanager

# 启动Kafka
$KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties

# 防止容器退出
tail -f /dev/null