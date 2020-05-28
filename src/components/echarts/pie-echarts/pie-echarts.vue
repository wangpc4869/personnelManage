<!--  饼图-->
<template>
  <div ref="myChart" style="width:100%;height: 100%;"></div>
</template>

<script>
    export default {
      name: "pie-echarts",
      props:['echarts'],
      components: {},
      data() {
          return {
            seriesData:[]
          }
      },
      computed: {},
      methods:{
        myChartBat(){
          let myThis = this;
          let myChart = this.$echarts.init(this.$refs.myChart);

          //饼图类型
          let roseType = [];
          if(myThis.echarts.roseType){
            roseType = myThis.echarts.roseType;
          }
          //图形颜色渐变
          let pieItemStyle = [];
          if(myThis.echarts.pieItemStyle){
            pieItemStyle = myThis.echarts.pieItemStyle;
          }
          //饼图的扇区是否是顺时针排布
          let clockwise = [];
          if(myThis.echarts.clockwise){
            clockwise = myThis.echarts.clockwise;
          }
          //饼图的扇区最小角度
          let minAngle = [];
          if(myThis.echarts.minAngle){
            minAngle = myThis.echarts.minAngle;
          }
          //起始角度
          let startAngle = [0];
          if(myThis.echarts.startAngle){
            startAngle = myThis.echarts.startAngle;
          }
          //是否启用防止标签重叠策略
          let avoidLabelOverlap = [];
          if(myThis.echarts.avoidLabelOverlap){
            avoidLabelOverlap = myThis.echarts.avoidLabelOverlap;
          }
          //饼图的中心（圆心）坐标
          let pieCenter = [
            ['50%', '50%']
          ];
          if(myThis.echarts.pieCenter){
            pieCenter = myThis.echarts.pieCenter;
          }
          //饼图半径
          let pieRadius = [];
          if(myThis.echarts.pieRadius){
            pieRadius = myThis.echarts.pieRadius;
          }
          //饼图层级
          let zlevel = [];
          if(myThis.echarts.zlevel){
            zlevel = myThis.echarts.zlevel;
          }
          //指示线和文字是否显示
          let labelLineShow = [];
          if(myThis.echarts.labelLineShow){
            labelLineShow = myThis.echarts.labelLineShow;
          }
          //指示线长度
          let labelLineLength = [];
          if(myThis.echarts.labelLineLength){
            labelLineLength = myThis.echarts.labelLineLength;
          }
          //指示线宽度
          let lineWidth = [];
          if(myThis.echarts.lineWidth){
            lineWidth = myThis.echarts.lineWidth;
          }
          //指示线颜色
          let labelLineColor = [];
          if(myThis.echarts.labelLineColor){
            labelLineColor = myThis.echarts.labelLineColor;
          }
          //指示文字显示内容
          let LineFormatter = [];
          if(myThis.echarts.LineFormatter){
            LineFormatter = myThis.echarts.LineFormatter;
          }
          //指示文字字体大小
          let textFontSize = [];
          if(myThis.echarts.textFontSize){
            textFontSize = myThis.echarts.textFontSize;
          }
          //指示文字颜色
          let labelLineTextColor = [];
          if(myThis.echarts.labelLineTextColor){
            labelLineTextColor = myThis.echarts.labelLineTextColor;
          }

          //是否有鼠标指示效果
          let hoverAnimation = [];
          if(myThis.echarts.hoverAnimation){
            hoverAnimation = myThis.echarts.hoverAnimation;
          }

          myThis.echarts.seriesName.map((item,index)=> {
            let seriesObj =  {
              name:item,
              type:'pie',
              roseType:roseType[index],
              clockwise:clockwise[index],
              minAngle:minAngle[index],
              startAngle:startAngle[index],
              center:pieCenter[index],
              radius:pieRadius[index],
              zlevel:zlevel[index],
              hoverAnimation:hoverAnimation[index],
              avoidLabelOverlap:avoidLabelOverlap[index],
              itemStyle:pieItemStyle[index],
              //指示显示
              label: {
                normal: {
                  show:labelLineShow[index],
                  formatter:LineFormatter[index],
                  textStyle: {
                    fontSize:textFontSize[index],
                    color:labelLineTextColor[index]
                  },
                  rich: {}
                },
                emphasis: {
                  show:labelLineShow[index],
                  formatter:LineFormatter[index],
                  rich: {}
                }
              },
              labelLine: {
                normal: {
                  show:labelLineShow[index],
                  length:labelLineLength[index],
                  lineStyle:{
                    width:lineWidth[index],
                    color:labelLineColor[index]
                  }
                },
                emphasis: {
                  show:labelLineShow[index]
                }
              },
              data: myThis.echarts.data[index]
            };
            myThis.seriesData.push(seriesObj);
          })

          /***
           * 标题参数
           * @type {boolean}
           */
          //标题是否显示
          let titleShow = false;
          if(myThis.echarts.titleShow){
            titleShow = myThis.echarts.titleShow;
          }
          //标题文字
          let titleText = '';
          if(myThis.echarts.titleText){
            titleText = myThis.echarts.titleText;
          }
          //标题x轴移动
          let titleX = '5%';
          if(myThis.echarts.titleX){
            titleX = myThis.echarts.titleX;
          }
          //标题y轴移动
          let titleY = '5%';
          if(myThis.echarts.titleY){
            titleY = myThis.echarts.titleY;
          }
          //标题字体颜色
          let titleTextColor = '#FFFFFF';
          if(myThis.echarts.titleTextColor){
            titleTextColor = myThis.echarts.titleTextColor;
          }
          //标题字体大小
          let titleTextFontSize = 12;
          if(myThis.echarts.titleTextFontSize){
            titleTextFontSize = myThis.echarts.titleTextFontSize;
          }
          /***
           * 坐标指示器参数
           * @type {boolean}
           */
            //坐标指示器是否显示
          let tooltipShow = false;
          if(myThis.echarts.tooltipShow){
            tooltipShow = myThis.echarts.tooltipShow;
          }
          //坐标指示器显示数据类型
          let tooltipTrigger = 'item';
          if(myThis.echarts.tooltipTrigger){
            tooltipTrigger = myThis.echarts.tooltipTrigger;
          }
          //坐标指示器显示类型
          let formatter = '{b}:\n{c}';
          if(myThis.echarts.formatter){
            formatter = myThis.echarts.formatter;
          }
          /***
           * 图例参数
           * @type {boolean}
           */
            //图例是否显示
          let legendShow = false;
          if(myThis.echarts.legendShow){
            legendShow = myThis.echarts.legendShow;
          }
          //图例x轴移动
          let legendX = '5%';
          if(myThis.echarts.legendX){
            legendX = myThis.echarts.legendX;
          }
          //图例y轴移动
          let legendY = 0;
          if(myThis.echarts.legendY){
            legendY = myThis.echarts.legendY;
          }
          //图例样式
          let legendIcon = '';
          if(myThis.echarts.legendIcon){
            legendIcon = myThis.echarts.legendIcon;
          }
          //图例布局
          let orient = 'horizontal';
          if(myThis.echarts.orient){
            orient = myThis.echarts.orient;
          }
          //图例间距
          let itemGap = 4;
          if(myThis.echarts.itemGap){
            itemGap = myThis.echarts.itemGap;
          }
          //图例宽
          let itemWidth = 12;
          if(myThis.echarts.itemWidth){
            itemWidth = myThis.echarts.itemWidth;
          }
          //图例高
          let itemHeight = 12;
          if(myThis.echarts.itemHeight){
            itemHeight = myThis.echarts.itemHeight;
          }
          //图例圆角
          let borderRadius = 0;
          if(myThis.echarts.borderRadius){
            borderRadius = myThis.echarts.borderRadius;
          }
          //图例字体大小
          let legendFontSize = 12;
          if(myThis.echarts.legendFontSize){
            legendFontSize = myThis.echarts.legendFontSize;
          }
          //图例字体颜色
          let legendColor = '#FFFFFF';
          if(myThis.echarts.legendColor){
            legendColor = myThis.echarts.legendColor;
          }
          /***
           * echarts边距
           * @type {boolean}
           */
            //上边距
          let gridTop = '0';
          if(myThis.echarts.gridTop){
            gridTop = myThis.echarts.gridTop;
          }
          //左边距
          let gridLeft = '0';
          if(myThis.echarts.gridLeft){
            gridLeft = myThis.echarts.gridLeft;
          }
          //下边距
          let gridBottom = '0';
          if(myThis.echarts.gridBottom){
            gridBottom = myThis.echarts.gridBottom;
          }
          //右边距
          let gridRight = '0';
          if(myThis.echarts.gridRight){
            gridRight = myThis.echarts.gridRight;
          }
          let containLabel = true;
          if(myThis.echarts.containLabel){
            containLabel = myThis.echarts.containLabel;
          }
          /***
           * 坐标系参数
           * @type {boolean}
           */
          let polar = '';
          let angleAxis = '';
          let radiusAxis = '';
          if(myThis.echarts.polar || myThis.echarts.angleAxis || myThis.echarts.radiusAxis){
            polar = {};
            if(myThis.echarts.polar){
              polar = myThis.echarts.polar;
            }
            angleAxis={};
            if(myThis.echarts.angleAxis){
              angleAxis = myThis.echarts.angleAxis;
            }
            radiusAxis={};
            if(myThis.echarts.radiusAxis){
              radiusAxis = myThis.echarts.radiusAxis;
            }
          }

          myChart.setOption({
            color:myThis.echarts.color,
            title: {
              show:titleShow,
              text:titleText,
              x:titleX,
              y:titleY,
              textStyle: {
                color:titleTextColor,
                fontSize:titleTextFontSize
              }
            },
            tooltip:{
              show:tooltipShow,
              trigger:tooltipTrigger,
              formatter:formatter
            },
            legend: {
              show:legendShow,
              data:myThis.echarts.legendData,
              x:legendX,
              y:legendY,
              icon:legendIcon,
              orient:orient,
              itemGap:itemGap,
              itemWidth:itemWidth,
              itemHeight:itemHeight,
              borderRadius:borderRadius,
              textStyle:{
                fontSize:legendFontSize,
                color:legendColor,
              }
            },
            grid: {
              left:gridLeft,
              top:gridTop,
              bottom:gridBottom,
              right:gridRight,
              containLabel:containLabel,
            },
            polar:polar,
            angleAxis:angleAxis,
            radiusAxis:radiusAxis,
            series:myThis.seriesData
          });
          myChart.off('click');//清除之前点击事件
          myChart.on('click', function(p) {
              myThis.$emit('clickEcharts', p);
          });
          window.addEventListener("resize",function(){
              myChart.resize();
          });
        }
      },
      mounted() {
          setTimeout(()=>{
              this.myChartBat();
          }, 500)
      },
      created(){},
    }
</script>
<style scoped></style>





