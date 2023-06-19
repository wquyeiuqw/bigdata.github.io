#!/bin/bash
# 启动Hadoop的NameNode和DataNode
hdfs --daemon start namenode
hdfs --daemon start datanode
hdfs --daemon start secondarynamenode
# 启动YARN的ResourceManager和NodeManager
# start-yarn.sh
yarn --daemon start resourcemanager
yarn --daemon start nodemanager
#启动hbase
start-hbase.sh

# 防止容器退出
tail -f /dev/null