<template>
    <div>
      <div id="gaugeChart" style="width: 400px; height: 300px;"></div>
      <div id="donutChart" style="width: 400px; height: 300px;"></div>
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
        const chartContainer1 = document.getElementById('donutChart');
        const chart1 = echarts.init(chartContainer1);
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
                { value: 50, name: '已使用' },
                { value: 50, name: '剩余空间' },
              ],
              color: ['#FF4500', '#90EE90'],
            },
          ],
        };
  
        chart.setOption(option);
        chart1.setOption(option1);
      },
      
    },
  };
  </script>
  