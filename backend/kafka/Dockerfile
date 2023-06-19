# 使用基础镜像
FROM hadoop-3.0.0:latest

# 设置Kafka版本
ARG KAFKA_VERSION
ENV KAFKA_VERSION=${KAFKA_VERSION}
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

# 下载并安装Kafka
RUN wget -P /opt https://archive.apache.org/dist/kafka/${KAFKA_VERSION}/kafka_2.11-${KAFKA_VERSION}.tgz && \
    tar -xzvf /opt/kafka_2.11-${KAFKA_VERSION}.tgz -C /opt && \
    mv /opt/kafka_2.11-${KAFKA_VERSION} /opt/kafka && \
    rm /opt/kafka_2.11-${KAFKA_VERSION}.tgz

# 设置Kafka环境变量
ENV KAFKA_HOME /opt/kafka
ENV PATH $KAFKA_HOME/bin:$PATH

# 复制自定义的Kafka配置文件
COPY ./config/server.properties $KAFKA_HOME/config/server.properties

# 创建Kafka日志目录
RUN mkdir -p /opt/kafka/logs

# 启动Kafka的脚本
COPY ./shell/start-kafka.sh /opt/
RUN chmod +x /opt/start-kafka.sh

# 启动Hive作为容器的主进程
CMD ["/bin/bash", "/opt/start-kafka.sh"]

