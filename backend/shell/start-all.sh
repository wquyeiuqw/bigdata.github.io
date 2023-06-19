#!/bin/bash

# 启动Hadoop的NameNode和DataNode
hdfs --daemon start namenode
hdfs --daemon start datanode
hdfs --daemon start secondarynamenode
# 启动YARN的ResourceManager和NodeManager
# start-yarn.sh
yarn --daemon start resourcemanager
yarn --daemon start nodemanager

# 启动Spark
$SPARK_HOME/sbin/start-master.sh
#$SPARK_HOME/sbin/start-worker.sh

# # 启动Hive
# $HIVE_HOME/bin/hive --service metastore &
# $HIVE_HOME/bin/hive --service hiveserver2 &

# # 启动HBase
# $HBASE_HOME/bin/start-hbase.sh

# # 启动Zookeeper
# $ZOOKEEPER_HOME/bin/zkServer.sh start

# # 启动Kafka
# $KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties
#启动hbase
start-hbase.sh

# 防止容器退出
tail -f /dev/null