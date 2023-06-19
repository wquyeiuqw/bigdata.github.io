# 使用基础镜像
FROM ubuntu:latest

# 设置Hadoop版本
ARG HADOOP_VERSION
ENV HADOOP_VERSION=${HADOOP_VERSION}

# 设置Java版本
ARG JAVA_VERSION
ENV JAVA_VERSION=${JAVA_VERSION}

# 设置配置参数
ENV HDFS_REPLICATION=1
ENV HDFS_BLOCKSIZE=128MB

ENV YARN_RESOURCE_MEMORY_MB=4096
ENV YARN_RESOURCE_CPU_VCORES=2

# 设置数据存储策略
ENV DATA_BLOCK_SIZE=128MB
ENV DATA_REPLICATION_FACTOR=1

# 更新系统并安装必要的软件
RUN apt-get update && \
    apt-get install -y wget \
    openjdk-${JAVA_VERSION}-jdk \
    # openjdk-${JDK_VERSION}-jdk \
    ssh \
    rsync && \
    apt-get clean

# 下载和安装 Hadoop
RUN wget -P /opt http://archive.apache.org/dist/hadoop/core/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz && \
    tar -xzvf /opt/hadoop-${HADOOP_VERSION}.tar.gz -C /opt && \
    rm /opt/hadoop-${HADOOP_VERSION}.tar.gz && \
    mv /opt/hadoop-${HADOOP_VERSION} /opt/hadoop

# 设置环境变量
ENV HADOOP_HOME=/opt/hadoop
ENV PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
ENV JAVA_HOME=/usr/lib/jvm/java-${JAVA_VERSION}-openjdk-amd64
ENV PATH=$PATH:$JAVA_HOME/bin

# 创建必要的目录
RUN mkdir -p /opt/hadoop/data/hdfs/namenode \
    && mkdir -p /opt/hadoop/data/hdfs/datanode \
    && mkdir -p /opt/hadoop/data/tmp \
    && mkdir -p /opt/hadoop/logs

# 自定义配置文件
# 添加 HDFS、YARN 等组件的配置
RUN echo "<configuration><property><name>fs.defaultFS</name><value>hdfs://localhost:9000</value></property><property><name>hadoop.tmp.dir</name><value>/tmp/hadoop</value></property>" > $HADOOP_HOME/etc/hadoop/core-site.xml && \ 
echo "</configuration>" >> $HADOOP_HOME/etc/hadoop/core-site.xml && \ 
# 配置hdfs-site.xml
echo "<configuration><property><name>dfs.replication</name><value>3</value> </property><property><name>dfs.namenode.http-address</name><value>0.0.0.0:50070</value></property><property> <name>dfs.namenode.name.dir</name><value>file:///opt/hadoop-$HADOOP_VERSION/data/dfs/namenode</value></property><property><name>dfs.datanode.data.dir</name><value>file:///opt/hadoop-$HADOOP_VERSION/data/dfs/datanode</value></property></configuration>" > $HADOOP_HOME/etc/hadoop/hdfs-site.xml  && \
# 配置yarn-site.xml
echo "<configuration><property> <name>yarn.resourcemanager.hostname</name><value>localhost</value></property><property><name>yarn.nodemanager.resource.memory-mb</name><value>4096</value></property><property><name>yarn.nodemanager.resource.cpu-vcores</name><value>2</value></property></configuration>" > $HADOOP_HOME/etc/hadoop/yarn-site.xml

# 格式化HDFS
RUN hdfs namenode -format

# 将启动 NameNode 的脚本复制到容器中
COPY ./shell/start-all.sh /opt/
COPY ./work/HelloWorld.jar /opt/
#赋予执行权限
RUN chmod +x /opt/start-all.sh
RUN chmod +x /opt/HelloWorld.jar
# 启动 NameNode 组件作为容器的主进程
CMD ["/bin/bash", "/opt/start-all.sh"]