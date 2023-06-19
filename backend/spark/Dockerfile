# 使用基础镜像
FROM hadoop-3.0.0:latest

# 设置Spark版本
ARG SPARK_VERSION
ENV SPARK_VERSION=${SPARK_VERSION}

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

# 下载并安装Spark
RUN wget -P /opt http://archive.apache.org/dist/spark/spark-${SPARK_VERSION}/spark-${SPARK_VERSION}-bin-hadoop3.2.tgz && \
    tar -xzvf /opt/spark-${SPARK_VERSION}-bin-hadoop3.2.tgz -C /opt && \
    mv /opt/spark-${SPARK_VERSION}-bin-hadoop3.2 /opt/spark && \
    rm /opt/spark-${SPARK_VERSION}-bin-hadoop3.2.tgz

# 设置Spark环境变量
ENV SPARK_HOME /opt/spark
ENV PATH $SPARK_HOME/bin:$PATH

# 复制自定义的Spark配置文件
COPY ./config/spark-defaults.conf $SPARK_HOME/conf/spark-defaults.conf

# 设置Spark的伪分布式配置
RUN cp $SPARK_HOME/conf/spark-env.sh.template $SPARK_HOME/conf/spark-env.sh && \
    echo "export SPARK_MASTER_HOST=localhost" >> $SPARK_HOME/conf/spark-env.sh && \
    echo "export SPARK_MASTER_PORT=7077" >> $SPARK_HOME/conf/spark-env.sh && \
    echo "export SPARK_MASTER_WEBUI_PORT=8080" >> $SPARK_HOME/conf/spark-env.sh && \
    echo "export SPARK_WORKER_INSTANCES=1" >> $SPARK_HOME/conf/spark-env.sh && \
    echo "export SPARK_WORKER_CORES=2" >> $SPARK_HOME/conf/spark-env.sh && \
    echo "export SPARK_WORKER_MEMORY=1g" >> $SPARK_HOME/conf/spark-env.sh

# 启动 Spark Master 的脚本
COPY ./shell/start-master.sh /opt/
RUN chmod +x /opt/start-master.sh

# 启动 Spark Master 作为容器的主进程
CMD ["/bin/bash", "/opt/start-master.sh"]