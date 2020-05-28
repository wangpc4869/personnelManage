<template>
  <div class="pie-echarts-instance">
    <pie-chart :echarts="pieChart" v-if="myPie"></pie-chart>
  </div>
</template>

<script>
  import echarts from 'echarts';
  //饼图
  import  PieChart from '@/components/echarts/pie-echarts/pie-echarts-ring';
  export default {
    name: "pie-echarts-instance",
    components:{
      PieChart
    },
    data() {
      return {
        myPie:true,

        // 饼图参数
        pieChart:{
          //饼图颜色
          color:['#eacf69','#9b62c6'],//★（必填属性）
          /***
           * 饼图数量
           */
          seriesName:['饼图'],//饼图名字-鼠标悬浮会显示 ★（必填属性）

          /***
           * 标题属性
           */
          titleShow:false,//是否显示标题
          titleText:'0',//标题内容
          titleX:'center',//标题水平定位
          titleY:'43%',//标题垂直定位
          titleTextColor:'#fff',//文字颜色
          titleTextFontSize:20,//文字大小

          /***
           * 图例属性
           */
          legendShow:false,//是否显示图例
          orient:'vertical',//图例布局-  水平布局：horizontal,垂直布局：vertical
          legendX:'85%',//图例x
          legendY:0,//图例y
          itemWidth:20,//图例宽
          itemHeight:12,//图例高
          legendColor:'#FFF',//图例文字颜色
          legendFontSize:'10px',//图例文字大小
          legendIcon:'stack',//注：图例样式-圆点 circle，方形 stack
          itemGap:4,
          borderRadius:15,//圆角
          chartColor:['#0795fd'],//图例颜色

          /***
           * 鼠标浮动样式，坐标轴指示器
           */
          tooltipShow:true,//鼠标浮动上去是否显示
          tooltipTrigger:'item',//‘item’显示该点的数据，’axis’显示该列下所有坐标轴所对应的数据。
          formatter: '{b}:\n{c}',//鼠标浮动显示内容

          /***
           * 边距属性
           */
          gridTop:'16%',
          gridLeft:'0',
          gridBottom:'0',
          gridRight:'0',
          containLabel:true,
          /***
           * 坐标系参数
           */
          polar: {},
          angleAxis: {
            interval: 1,
            type: 'category',
            data: [],
            z: 10,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0B4A6B",
                width: 1,
                type: "solid"
              },
            },
            axisLabel: {
              interval: 0,
              show: true,
              color: "#0B4A6B",
              margin: 8,
              fontSize: 16
            },
          },
          radiusAxis: {
            min: 10,
            max: 50,
            interval: 10,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0B3E5E",
                width: 1,
                type: "solid"
              },
            },
            axisLabel: {
              show: false,
              formatter: '{value} %',
              padding: [0, 0, 20, 0],
              color: "#0B3E5E",
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                color: "#0B3E5E",
                width: 2,
                type: "solid"
              }
            }
          },

          /***
           * 图形样式设置
           */
          clockwise:[false],//饼图的扇区是否是顺时针排布
          minAngle:[0],//最小的扇区角度（0 ~ 360）
          startAngle:[15],//起始角度（0 ~ 360）★（*单个饼图非必填，必填属性）
          pieCenter:[
            ['60%', '50%']
          ],//饼图的中心（圆心）坐标 ★（*单个饼图非必填，必填属性）
          pieRadius:[
            ['45%', '75%']
          ],//饼图的半径 ★（必填属性）
          zlevel:[10],//饼图层级
          hoverAnimation:[true],//是否有鼠标指示效果
          avoidLabelOverlap:[false],//是否启用防止标签重叠策略
          roseType:[],//注：南丁格尔图-面积模式 angle，半径模式 radius；普通饼图设置 ''
          pieItemStyle:[],//可设置渐变色等属性

          labelLineShow:[false],//是否显示指示线
          labelLineLength:[20],//指示线长度
          lineWidth:[3],//指示线宽度
          labelLineColor:['#fff','#fff'],//指示线颜色
          LineFormatter:['{text|{b}}:{value|{d}%}'],//指示文字内容
          textFontSize:[12],//指示文字大小
          labelLineTextColor:['#fff','#fff'],//指示文字颜色

          /***
           * 饼图数据★（必填属性）
           */
          legendData:['进城', '出城'],//图例数据
          data:[
            [
              {
                value: 4600,
                name: '进城'
              },
              {
                value: 5400,
                name: '出城'
              },
            ]
          ] //图形数据 注：data里的name要与legendData数组对应的值相等才能显示图例
        },
      }
    },
    computed:{},
    created(){},
    mounted() {},
    watch: { },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .pie-echarts-instance{
  }
</style>
