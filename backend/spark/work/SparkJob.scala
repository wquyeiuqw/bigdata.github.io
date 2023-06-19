import org.apache.spark.sql.SparkSession

object SparkJob {
  def main(args: Array[String]): Unit = {
    // 创建SparkSession
    val spark = SparkSession.builder()
      .appName("SparkJob")
      .getOrCreate()

    try {
      // 读取输入数据
      val inputPath = "hdfs://<input-path>"
      val inputData = spark.read.textFile(inputPath)

      // 执行数据处理
      val result = inputData.flatMap(_.split("\\s+"))
        .map(word => (word, 1))
        .reduceByKey(_ + _)

      // 输出结果
      val outputPath = "hdfs://<output-path>"
      result.saveAsTextFile(outputPath)
    } finally {
      // 关闭SparkSession
      spark.stop()
    }
  }
}
