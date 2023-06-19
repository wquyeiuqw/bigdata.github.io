<template>
  <div>
  <div class="chart-container">
    <div class="chart-block">
      <div class="chart-content">
        <div class="chart-label">Disk使用率</div>
        <div id="DiskChart" style="width: 400px; height: 300px;"></div>
      </div>
    </div>
    <div class="chart-block">
      <div class="chart-content">
        <div class="chart-label">CPU使用率</div>
        <div id="gaugeChart" style="width: 400px; height: 300px;"></div>
      </div>
    </div>
    <div class="chart-block">
      <div class="chart-content">
        <div class="chart-label">memory使用率</div>
        <div id="donutChart" style="width: 400px; height: 300px;"></div>
      </div>
    </div>
    <div class="chart-block">
      <div class="chart-content">
      <div class="chart-label">Datanodes Live</div>
    <div class="chart-info" style="width: 400px; height: 300px;">1/1</div>
    </div>
    </div>
  </div>
  </div>
</template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chartContainer = document.getElementById('gaugeChart');
        const chart = echarts.init(chartContainer);
  
        const chartContainer1 = document.getElementById('donutChart');
        const chart1 = echarts.init(chartContainer1);

        const chartContainer2 = document.getElementById('DiskChart');
        const chart2 = echarts.init(chartContainer2);

        const option = {
          series: [
            {
              type: 'gauge',
              data: [{ value: 10, name: 'CPU' }],
              axisLine: {
                lineStyle: {
                  color: [
                    [0.2, '#ff4500'],
                    [0.8, '#ffa500'],
                    [1, '#90ee90'],
                  ],
                  width: 10,
                },
              },
              axisLabel: {
                fontSize: 12,
              },
              pointer: {
                width: 5,
              },
            },
          ],
        };
        const option1 = {
          series: [
            {
              name: '内存占用率',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'center',
                formatter: '{d}%',
                fontSize: 20,
                fontWeight: 'bold',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 80, name: '已使用' },
                { value: 20, name: '剩余空间' },
              ],
              color: ['#FF4500', '#90EE90'],
            },
          ],
        };
  
        chart.setOption(option);
        chart1.setOption(option1);
        chart2.setOption(option1);
      },
      
    },
  };
  </script>
  

  <style>
.chart-container {
  text-align: left;
}

.chart-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.chart-block {
  display: inline-block;
  vertical-align: top;
  /* align-items: center; */
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.chart-label {
  font-weight: bold;
  margin-bottom: 10px;
}

.chart-info {
  font-size: 125px;
  color: #30dcf3;
  text-align: center;
}
</style>