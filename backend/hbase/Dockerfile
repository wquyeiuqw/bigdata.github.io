# 使用基础镜像
FROM hadoop-3.0.0:latest

# 设置Hbase版本
ARG HBASE_VERSION
ENV HBASE_VERSION=${HBASE_VERSION}

# 设置Java版本
ARG JAVA_VERSION
ENV JAVA_VERSION=${JAVA_VERSION}

# 更新系统并安装必要的软件
RUN apt-get update && \
    apt-get install -y wget \
    openjdk-${JAVA_VERSION}-jdk \
    # openjdk-${JDK_VERSION}-jdk \
    ssh \
    rsync && \
    apt-get clean

# 下载和安装 HBase
RUN wget -P /opt http://archive.apache.org/dist/hbase/${HBASE_VERSION}/hbase-${HBASE_VERSION}-bin.tar.gz && \
    tar -xzvf /opt/hbase-${HBASE_VERSION}-bin.tar.gz -C /opt && \
    rm /opt/hbase-${HBASE_VERSION}-bin.tar.gz && \
    mv /opt/hbase-${HBASE_VERSION} /opt/hbase

# 设置环境变量
ENV HBASE_HOME=/opt/hbase
ENV PATH=$PATH:${HBASE_HOME}/bin
ENV JAVA_HOME=/usr/lib/jvm/java-${JAVA_VERSION}-openjdk-amd64
ENV PATH=$PATH:$JAVA_HOME/bin

# 配置HBase
RUN echo "<configuration>\
  <property>\
    <name>hbase.master.hostname</name>\
    <value>hbase-master</value>\
  </property>\
  <property>\
    <name>hbase.regionserver.hostname</name>\
    <value>hbase-regionserver</value>\
  </property>\
  <property>\
    <name>hbase.zookeeper.quorum</name>\
    <value>zk-node1,zk-node2,zk-node3</value>\
  </property>\
  <property>\
    <name>hbase.some_property</name>\
    <value>some_value</value>\
  </property>\
</configuration>" > ${HBASE_HOME}/conf/hbase-site.xml

# 创建必要的目录
RUN mkdir -p /opt/hbase/data

# 启动HBase的脚本
COPY ./shell/start-hbase.sh /opt/
RUN chmod +x /opt/start-hbase.sh

# 启动HBase作为容器的主进程
CMD ["/bin/bash", "/opt/start-hbase.sh"]