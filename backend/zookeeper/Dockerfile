# 使用基础镜像
FROM hadoop-3.0.0:latest

# 设置Zookeeper版本
ARG ZOOKEEPER_VERSION
ENV ZOOKEEPER_VERSION=${ZOOKEEPER_VERSION}

# 设置Java版本
ARG JAVA_VERSION
ENV JAVA_VERSION=${JAVA_VERSION}

ARG HADOOP_HOME
ENV HADOOP_HOME=${HADOOP_HOME}


# 更新系统并安装必要的软件
RUN apt-get update && \
    apt-get install -y wget \
    openjdk-${JAVA_VERSION}-jdk \
    # openjdk-${JDK_VERSION}-jdk \
    ssh \
    rsync && \
    apt-get clean

# 下载和安装 Zookeeper
RUN wget -P /opt http://archive.apache.org/dist/zookeeper/zookeeper-${ZOOKEEPER_VERSION}/zookeeper-${ZOOKEEPER_VERSION}.tar.gz && \
    tar -xzvf /opt/zookeeper-${ZOOKEEPER_VERSION}.tar.gz -C /opt && \
    mv /opt/zookeeper-${ZOOKEEPER_VERSION} /opt/zookeeper \
    && rm /opt/zookeeper-${ZOOKEEPER_VERSION}.tar.gz


# 设置ZooKeeper环境变量
ENV ZOOKEEPER_HOME=/opt/zookeeper
# 创建 ZooKeeper 数据目录
RUN mkdir -p /opt/data/zookeeper
# 设置数据目录的权限
RUN chown -R root:root /opt/data/zookeeper

#配置文件
RUN echo "tickTime=2000" >> /opt/zookeeper/conf/zoo.cfg \
    && echo "dataDir=/opt/data/zookeeper" >> /opt/zookeeper/conf/zoo.cfg \
    && echo "clientPort=2181" >> /opt/zookeeper/conf/zoo.cfg
# 配置Hadoop以使用ZooKeeper 
RUN sed -i '/<\/configuration>/i \  <property>\n    <name>ha.zookeeper.quorum</name>\n    <value>localhost:2181</value>\n  </property>' ${HADOOP_HOME}/etc/hadoop/core-site.xml && \
 sed -i '/<\/configuration>/i \  <property>\n    <name>hadoop.proxyuser.hadoop.groups</name>\n    <value>*</value>\n  </property>' ${HADOOP_HOME}/etc/hadoop/core-site.xml && \
 sed -i '/<\/configuration>/i \  <property>\n    <name>hadoop.proxyuser.hadoop.hosts</name>\n    <value>*</value>\n  </property>' ${HADOOP_HOME}/etc/hadoop/core-site.xml 

# 将启动 zookeeper 的脚本复制到容器中
COPY ./shell/start-zookeeper.sh /opt/
#赋予执行权限
RUN chmod +x /opt/start-zookeeper.sh
# 启动 NameNode 组件作为容器的主进程
CMD ["/bin/bash", "/opt/start-zookeeper.sh"]