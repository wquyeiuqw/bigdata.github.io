# 使用基础镜像
FROM hadoop-3.0.0:latest

# 设置Hive版本
ARG HIVE_VERSION
ENV HIVE_VERSION=${HIVE_VERSION}

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

# 下载并安装Hive
RUN wget -P /opt https://archive.apache.org/dist/hive/hive-${HIVE_VERSION}/apache-hive-${HIVE_VERSION}-bin.tar.gz && \
    tar -xzvf /opt/apache-hive-${HIVE_VERSION}-bin.tar.gz -C /opt && \
    mv /opt/apache-hive-${HIVE_VERSION}-bin /opt//hive && \
    rm /opt/apache-hive-${HIVE_VERSION}-bin.tar.gz

# 设置Hive环境变量
ENV HIVE_HOME /opt/hive
ENV PATH $HIVE_HOME/bin:$PATH

# 复制自定义的Hive配置文件
COPY ./config/hive-site.xml $HIVE_HOME/conf/hive-site.xml
COPY ./config/hive-env.sh $HIVE_HOME/conf/hive-env.sh

# 创建Hive元数据库目录
RUN mkdir -p /opt/hive/metastore

# 下载 Derby
RUN wget -P /opt https://downloads.apache.org/db/derby/db-derby-10.14.2.0/db-derby-10.14.2.0-bin.tar.gz &&\
    tar -xzvf /opt/db-derby-10.14.2.0-bin.tar.gz -C /opt && \
    mv /opt/db-derby-10.14.2.0-bin /opt/derby && \
    rm /opt/db-derby-10.14.2.0-bin.tar.gz
# 配置环境变量
ENV DERBY_HOME /opt/derby
ENV PATH $DERBY_HOME/bin:$PATH

RUN schematool -dbType derby -initSchema


# 启动Hive的脚本
COPY ./shell/start-hive.sh /opt/
RUN chmod +x /opt/start-hive.sh

# 启动Hive作为容器的主进程
CMD ["/bin/bash", "/opt/start-hive.sh"]