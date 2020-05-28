<!--综合图（柱状图，折线图，柱状图+折线图）引用实例 -->
<template>
  <div class="comprehensive-echarts-instance">
    <comprehensive-echarts :echarts="echarts" v-if="myChart"></comprehensive-echarts>
  </div>
</template>

<script>
  //绘制扇形折线图或渐变柱状图时需要引入，否则会报错
  import echarts from 'echarts';
  //echarts 综合组件
  import  ComprehensiveEcharts from '@/components/echarts/comprehensive-echarts/comprehensive-echarts';
  export default {
    name: "comprehensive-echarts-instance",
    components:{
      ComprehensiveEcharts
    },
    data() {
      return {
        //设置调用接口先加载出数据在绘制图形
        myChart:false,

        //基础属性
        echarts:{

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
          tooltipTrigger:'axis',//‘item’显示该点的数据，’axis’显示该列下所有坐标轴所对应的数据。
          tooltipType:'shadow',// 默认为直线，可选为：'line' | 'shadow'
          labelShow:false,//是否让x坐标文字添加背景颜色
          //坐标指示器显示内容
          formatter:function(prams) {
            return "客流监测：" + prams[0].data
          },

          /***
           * 边距属性
           */
          gridTop:'16%',
          gridLeft:'0',
          gridBottom:'0',
          gridRight:'0',
          containLabel:true,

          /**
           * x轴，y轴横样式设置
           */
          //x轴，y轴横向还是纵向，线条颜色大小是否显示
          typeX:'category',
          typeY:'value',
          boundaryGap:true,//文字，图形是否偏移
          //坐标轴分割线是否显示，颜色，大小
          splitLineShowX:false,
          splitLineShowXColor:'#797979',
          splitLineShowXWidth:1,
          splitLineXType:'solid',//样式 'dotted'点 'solid'实线 'dashed'虚线
          splitLineShowY:[true],
          splitLineShowYColor:'#eeeeee',
          splitLineShowYWidth:1,
          splitLineYType:'solid',//样式 'dotted'点 'solid'实线 'dashed'虚线
          //坐标轴刻度是否显示，颜色，大小
          axisTickShowX:false,
          axisTickShowXColor:'#051d82',
          axisTickShowXWidth:2,
          axisTickShowY:false,
          axisTickShowYColor:'#eeeeee',
          axisTickShowYWidth:2,
          //坐标轴是否显示，颜色，大小
          axisLineShowX:true,
          axisLineXColor:"#eeeeee",
          axisLineXWidth:1,
          axisLineXType:'solid',//样式 'dotted'点 'solid'实线 'dashed'虚线
          axisLineShowY:true,
          axisLineYColor:"#eeeeee",
          axisLineYWidth:1,
          axisLineYType:'solid',//样式 'dotted'点 'solid'实线 'dashed'虚线
          //坐标轴文字是否显示，颜色，大小
          axisLabelShowX:true,
          axisLabelXColor:'#cccccc',
          axisLabelXFontSize:12,
          axisLabelShowY:true,
          axisLabelYColor:'#cccccc',
          axisLabelYFontSize:12,
          //坐标轴单位文字是否显示，颜色，大小 name为空则不显示
          nameGap:5,//文字距离x轴的距离
          xAxisName:'',//x坐标轴顶部文字
          xAxisTextColor:'#cccccc',//x坐标轴顶部文字颜色
          xAxisTextSize:12,//x坐标轴顶部文字大小
          yAxisName:['（万元）'],//y坐标轴顶部文字 ★（必填属性） 不显示文字可设置[''] 用设置
          yAxisTextColor:'#cccccc',//y坐标轴顶部文字颜色
          yAxisTextSize:12,//y坐标轴顶部文字大小

          isYAxisIndex:[false],

          /**
           * 设置坐标轴是否最大值最小值
           */
          isMax:[false,true],
          maxVal:[0,100],
          isMin:[true],
          minVal:[0],
          //设置y轴数据间隔
          splitNumber:[3],

          /***
           * 设置柱状图还是折线图  如果只是一种【柱状样式】【折线样式】二者取其一
           * 如果二者皆有则每种类似都要设置两组数据，如chartBarColor:[['#0795fd'],[]];chartLineColor:['','#07a3ff']
           * 这样第一个就是就是柱状图，第二个就是折线图
           */
          echartType:['bar','line'],//'bar','line' 显示图形的类型必填 ★（必填属性）

          /***
           *平均线气泡样式,颜色
           *
           */
          markLineStyle:['dotted'],//样式 'dotted'点 'solid'实线 'dashed'虚线
          markLineColor:['#07a3ff'],

          /***
           * 柱状样式
           */
          barWidth:['30%'], //柱状图宽度
          positionShow:[true], //柱状图是否显示文字
          position:'top', //显示位置 注：left，top，right，bottom
          positionUnit:['万元'],//显示单位
          positionTextColor:['#ffffff'],//柱状图文字颜色
          positionTextSize:[14],//柱状图文字大小
          //柱状图圆角
          barBorderRadius:[
            [2,2,0,0]
          ],
          barMarkPointData:[
            [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'},
              {type : 'average', name : '平均值'}
            ]
          ],
          barMarkLineData:[
            [
              {type : 'average', name : '平均值'}
            ]
          ],
          //是否开启渐变颜色，0-关闭，1-开启，chartBarColor，gradientColor长度要与legendData长度的一致 关闭时chartBarColor对应的index取[],gradientColor{}
          colorType:[0],//★（必填属性）
          //柱状图颜色
          chartBarColor:[
            ['#0795fd']
          ],
          //柱状图渐变颜色
          gradientColor:[
            {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#8bd46e'
              }, {
                offset: 1,
                color: '#09bcb7'
              }]),
            }
          ],
          barGap:['',0],//状图是否偏移
          stack:2,//柱状图堆叠属性

          /***
           * 折线样式
           */
          smooth:true,//折线是否平滑
          symbol:['circle'],//拐点样式 方形star 圆点circle 圆环emptyCircle
          symbolSize:[0],//拐点大小
          lineWidth:[2],//折线宽度
          lineType:['solid'],//折线样式 'dotted'虚线 'solid'实线
          lineMarkPointData:[
            [
              {type: 'max', name: '最大值'},
              {type: 'min', name: '最小值'}
            ]
          ],
          lineMarkLineData:[
            [
              {type : 'average', name : '平均值'}
            ]
          ],
          //areaStyle：是否为扇形折现图,数组为空则不是扇形折线
          areaStyle:[
            {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: 'rgba(7,163,255,0.4)'
                },
                {
                  offset: 0.8,
                  color: 'rgba(7,163,255,0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(7,163,255,0.4)'
                }
              ])
            }
          ],
          chartLineColor:['#07a3ff'], //折现图颜色
          //折线图拐点文字
          textLabelShow:[true],//是否显示拐点文字
          textLabelPosition:['top'],//拐点文字位置
          textLabelColor:['#fff'],//颜色

          rotate:0,//坐标轴文字是否倾斜
          interval:0,//是否全是显示x轴文字 0 全部显示 1 自适应显示

          /***
           * 数据参数 ★（必填属性）
           */
          legendData:['本年'],//图例数据 需要显示几条折线这里添加几条数据 如：['本年','去年']就是两条数据，对应 折现样式 seriesData属性也添加两组
          xData:['01日','02日','03日','04日','05日','06日','07日','08日','09日','10日','11日','12日'],
          yData:[],//x轴数据与y轴数据互换另一个为[]则可决定坐标轴横纵显示
          seriesData:[
            [50,80,76,25,34,21,45,78,14,28,136,78]
          ],//数据
        }
      }
    },
    computed:{},
    created(){},
    mounted() {
      this.getData();
    },
    watch: { },
    methods: {
      getData() {
        //数据展示
        this.myChart = true;
      }
    }
  }
</script>

<style scoped lang="scss">
  .comprehensive-echarts-instance{
  }
</style>
