#!/bin/bash

# 启动Hadoop的NameNode和DataNode
hdfs --daemon start namenode
hdfs --daemon start datanode
hdfs --daemon start secondarynamenode
# 启动YARN的ResourceManager和NodeManager
# start-yarn.sh
yarn --daemon start resourcemanager
yarn --daemon start nodemanager

# 启动Hive
# $HIVE_HOME/bin/hive --service metastore
# $HIVE_HOME/bin/hive --service hiveserver2 &
# 防止容器退出
tail -f /dev/null