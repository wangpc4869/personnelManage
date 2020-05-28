<!--echarts柱状图，折线图，图形相结合-->
<template>
  <div ref="myChart" style="width:100%;height: 100%;"></div>
</template>

<script>
  export default {
    name: "comprehensive-echarts",
    props:['echarts'],
    components: {},
    data() {
      return {
        seriesData:[],
        yAxisData:[]
        // yAxisName
      }
    },
    computed: {},
    methods:{
      myChartBat(){
        let myChart = this.$echarts.init(this.$refs.myChart);
        let myThis = this;

        // 平均线气泡样式
        let markLineStyle = [];
        if(myThis.echarts.markLineStyle){
          markLineStyle = myThis.echarts.markLineStyle;
        }
        // 平均线气泡颜色
        let markLineColor = [];
        if(myThis.echarts.markLineColor){
          markLineColor = myThis.echarts.markLineColor;
        }
        /***
         * 柱状图样式
         * @type {boolean}
         */
        //柱状图宽度
        let barWidth = ['30%'];
        if(myThis.echarts.barWidth){
          barWidth = myThis.echarts.barWidth;
        }
        //柱状图是否显示文字
        let positionShow = [];
        if(myThis.echarts.positionShow){
          positionShow = myThis.echarts.positionShow;
        }
        //显示方向
        let position = 'top';
        if(myThis.echarts.position){
          position = myThis.echarts.position;
        }
        //显示单位
        let positionUnit = [];
        if(myThis.echarts.positionUnit){
          positionUnit = myThis.echarts.positionUnit;
        }
        //柱状图文字颜色
        let positionTextColor =['#FFFFFF'];
        if(myThis.echarts.positionTextColor){
          positionTextColor = myThis.echarts.positionTextColor;
        }
        //柱状图文字大小
        let positionTextSize = [];
        if(myThis.echarts.positionTextSize){
          positionTextSize = myThis.echarts.positionTextSize;
        }
        //柱状图圆角
        let barBorderRadius = [];
        if(myThis.echarts.barBorderRadius){
          barBorderRadius = myThis.echarts.barBorderRadius;
        }
        //设置最值和平均值（气泡）
        let barMarkPointData = [];
        if(myThis.echarts.barMarkPointData){
          barMarkPointData = myThis.echarts.barMarkPointData;
        }
        //设置最值和平均值（指示线）
        let barMarkLineData = [];
        if(myThis.echarts.barMarkLineData){
          barMarkLineData = myThis.echarts.barMarkLineData;
        }
        //柱状图颜色
        let chartBarColor = [];
        if(myThis.echarts.chartBarColor){
          chartBarColor = myThis.echarts.chartBarColor;
        }
        //柱状图渐变颜色
        let gradientColor = [];
        if(myThis.echarts.gradientColor){
          gradientColor = myThis.echarts.gradientColor;
        }

        /***
         * 折线图样式
         * @type {boolean}
         */
        //折线是否平滑
        let smooth =false;
        if(myThis.echarts.smooth){
          smooth = myThis.echarts.smooth;
        }
        //拐点样式
        let symbol =[];
        if(myThis.echarts.symbol){
          symbol = myThis.echarts.symbol;
        }
        //拐点大小
        let symbolSize =[];
        if(myThis.echarts.symbolSize){
          symbolSize = myThis.echarts.symbolSize;
        }
        //折线宽度
        let lineWidth =[];
        if(myThis.echarts.lineWidth){
          lineWidth = myThis.echarts.lineWidth;
        }
        //折线样式
        let lineType =[];
        if(myThis.echarts.lineType){
          lineType = myThis.echarts.lineType;
        }
        //设置最值和平均值（气泡）
        let lineMarkPointData = [];
        if(myThis.echarts.lineMarkPointData){
          lineMarkPointData = myThis.echarts.lineMarkPointData;
        }
        //设置最值和平均值（指示线）
        let lineMarkLineData = [];
        if(myThis.echarts.lineMarkLineData){
          lineMarkLineData = myThis.echarts.lineMarkLineData;
        }
        //是否为扇形折现图
        let areaStyle = [];
        if(myThis.echarts.areaStyle){
          areaStyle = myThis.echarts.areaStyle;
        }
        //折现图颜色
        let chartLineColor = [];
        if(myThis.echarts.chartLineColor){
          chartLineColor = myThis.echarts.chartLineColor;
        }
        //是否显示拐点文字
        let textLabelShow = [];
        if(myThis.echarts.textLabelShow){
          textLabelShow = myThis.echarts.textLabelShow;
        }
        //拐点文字显示位置
        let textLabelPosition = [];
        if(myThis.echarts.textLabelPosition){
          textLabelPosition = myThis.echarts.textLabelPosition;
        }
        //拐点文字颜色
        let textLabelColor = [];
        if(myThis.echarts.textLabelColor){
          textLabelColor = myThis.echarts.textLabelColor;
        }

        myThis.echarts.legendData.map((item,index)=>{
          let seriesObj = {};
          if(myThis.echarts.echartType[index] === 'bar'){
            let color = {};
            if(myThis.echarts.colorType[index] === 0){
              color = {
                color: function(params) {
                  let num = chartBarColor[index].length;
                  return chartBarColor[index][params.dataIndex % num]
                },
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                barBorderRadius:barBorderRadius[index],
              }
            }else if(myThis.echarts.colorType[index] === 1){
              color =gradientColor[index];
              color.barBorderRadius = barBorderRadius[index];
            }
            seriesObj={
              name:item,
              type:myThis.echarts.echartType[index],
              barWidth:barWidth[index],
              data:myThis.echarts.seriesData[index],
              markPoint: {
                itemStyle:{
                  color: markLineStyle[index],
                },
                data:barMarkPointData[index]
              },
              markLine:{
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type:markLineStyle[index],
                      color:markLineColor[index]
                    },
                  },
                },
                data:barMarkLineData[index]
              },
              itemStyle: {
                normal:color
              },
              label:{
                normal:{
                  // 柱状图不显示文字只显示柱状图
                  show:positionShow[index],
                  position:position,
                  formatter: function(p) {
                    return p.value + positionUnit[index];
                  },
                  textStyle:{
                    color:positionTextColor[index],
                    fontSize:positionTextSize[index],
                  },
                }
              },
            }
            //柱状图是否偏移
            if(myThis.echarts.barGap){
              if(myThis.echarts.barGap[index] !==''){
                seriesObj.barGap = myThis.echarts.barGap[index];
              }
            }
            //堆叠柱状图
            if(myThis.echarts.stack){
              seriesObj.stack = myThis.echarts.stack;
            }
          }else if(myThis.echarts.echartType[index] === 'line'){
            seriesObj= {
              name:item,
              type:myThis.echarts.echartType[index],
              smooth:smooth,
              symbol: symbol[index],
              symbolSize:symbolSize[index],
              data:myThis.echarts.seriesData[index],
              markPoint: {
                itemStyle:{
                  color:markLineColor[index],
                },
                data:lineMarkPointData[index]
              },
              markLine:{
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: markLineStyle[index],
                      color:markLineColor[index]
                    },
                  },
                },
                data:lineMarkLineData[index]
              },
              itemStyle:{
                normal:{
                  lineStyle:{
                    color:chartLineColor[index],
                    width:lineWidth[index],
                    type:lineType[index]
                  },
                  borderColor:chartLineColor[index],
                  areaStyle:areaStyle[index]
                }
              },
              label: {
                show: textLabelShow[index],
                position: textLabelPosition[index],
                textStyle: {
                  color: textLabelColor[index],
                }
              },
            };
            if(myThis.echarts.isYAxisIndex){
              if(myThis.echarts.isYAxisIndex[index] === true){
                seriesObj.yAxisIndex=1;
              }
            }
          }
          myThis.seriesData.push(seriesObj);
        });
        /***
         * y轴-坐标样式，文字样式
         * @type {boolean}
         */
        //y轴类型
        let typeY = 'value';
        if(myThis.echarts.typeY){
          typeY = myThis.echarts.typeY;
        }
        //y轴分割线是否显示
        let splitLineShowY = [false];
        if(myThis.echarts.splitLineShowY){
          splitLineShowY = myThis.echarts.splitLineShowY;
        }
        //y轴分割线颜色
        let splitLineShowYColor = '#FFFFFF';
        if(myThis.echarts.splitLineShowYColor){
          splitLineShowYColor = myThis.echarts.splitLineShowYColor;
        }
        //y轴分割线宽度
        let splitLineShowYWidth = 1;
        if(myThis.echarts.splitLineShowYWidth){
          splitLineShowYWidth = myThis.echarts.splitLineShowYWidth;
        }
        //y轴分割线样式
        let splitLineYType = 'solid';
        if(myThis.echarts.splitLineYType){
          splitLineYType = myThis.echarts.splitLineYType;
        }
        //y轴刻度是否显示
        let axisTickShowY = false;
        if(myThis.echarts.axisTickShowY){
          axisTickShowY = myThis.echarts.axisTickShowY;
        }
        //y轴刻度颜色
        let axisTickShowYColor = '#FFFFFF';
        if(myThis.echarts.axisTickShowYColor){
          axisTickShowYColor = myThis.echarts.axisTickShowYColor;
        }
        //y轴刻度宽度
        let axisTickShowYWidth = 1;
        if(myThis.echarts.axisTickShowYWidth){
          axisTickShowYWidth = myThis.echarts.axisTickShowYWidth;
        }
        //y轴坐标轴是否显示
        let axisLineShowY = false;
        if(myThis.echarts.axisLineShowY){
          axisLineShowY = myThis.echarts.axisLineShowY;
        }
        //y轴坐标轴颜色
        let axisLineYColor = '#FFFFFF';
        if(myThis.echarts.axisLineYColor){
          axisLineYColor = myThis.echarts.axisLineYColor;
        }
        //y轴坐标轴宽度
        let axisLineYWidth = 1;
        if(myThis.echarts.axisLineYWidth){
          axisLineYWidth = myThis.echarts.axisLineYWidth;
        }
        //y轴坐标轴样式
        let axisLineYType = 'solid';
        if(myThis.echarts.axisLineYType){
          axisLineYType = myThis.echarts.axisLineYType;
        }
        //y轴坐标轴文字是否显示
        let axisLabelShowY = false;
        if(myThis.echarts.axisLabelShowY){
          axisLabelShowY = myThis.echarts.axisLabelShowY;
        }
        //y轴坐标轴文字颜色
        let axisLabelYColor = '#FFFFFF';
        if(myThis.echarts.axisLabelYColor){
          axisLabelYColor = myThis.echarts.axisLabelYColor;
        }
        //y轴坐标轴文字大小
        let axisLabelYFontSize = 12;
        if(myThis.echarts.axisLabelYFontSize){
          axisLabelYFontSize = myThis.echarts.axisLabelYFontSize;
        }
        //y轴坐标轴单位文字颜色
        let yAxisTextColor = '#FFFFFF';
        if(myThis.echarts.yAxisTextColor){
          yAxisTextColor = myThis.echarts.yAxisTextColor;
        }
        //y轴坐标轴单位文字大小
        let yAxisTextSize = 12;
        if(myThis.echarts.yAxisTextSize){
          yAxisTextSize = myThis.echarts.yAxisTextSize;
        }
        //y轴坐标轴数据间隔
        let splitNumber = [];
        if(myThis.echarts.splitNumber){
          splitNumber = myThis.echarts.splitNumber;
        }
        myThis.echarts.yAxisName.map((item,index)=>{
          let nameObj = {
            type:typeY,
            data:myThis.echarts.yData,
            name:item,
            nameTextStyle: {
              color:yAxisTextColor,
              fontSize:yAxisTextSize,
            },
            splitNumber:splitNumber[index],
            axisLabel: {
              show: axisLabelShowY,
              textStyle: {
                color:axisLabelYColor,
                fontSize:axisLabelYFontSize
              },
            },
            axisLine: {
              show:axisLineShowY,
              lineStyle: {
                color:axisLineYColor,
                width:axisLineYWidth,
                type:axisLineYType
              },
            },
            splitLine: {
              show:splitLineShowY[index],
              lineStyle:{
                color:splitLineShowYColor,
                width:splitLineShowYWidth,
                type:splitLineYType
              }
            },
            axisTick: {
              show:axisTickShowY,
              lineStyle:{
                color: axisTickShowYColor,
                width:axisTickShowYWidth
              }
            },
          };
          //设置坐标轴是否最大值最小值
          if(myThis.echarts.isMax){
            if(myThis.echarts.isMax[index] === true){
              nameObj.max = myThis.echarts.maxVal[index];
            }
          }
          if(myThis.echarts.isMin){
            if(myThis.echarts.isMin[index] === true){
              nameObj.min = myThis.echarts.minVal[index];
            }
          }
          // splitNumber:8
          myThis.yAxisData.push(nameObj)
        });

        //echarts颜色控制图例，浮动点，折线图拐点等属性
        let chartColor = []
        if(myThis.echarts.chartColor){
          chartColor = myThis.echarts.chartColor;
        }
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
        let tooltipShow = true;
        if(myThis.echarts.tooltipShow){
          tooltipShow = myThis.echarts.tooltipShow;
        }
        //坐标指示器显示数据类型
        let tooltipTrigger = 'axis';
        if(myThis.echarts.tooltipTrigger){
          tooltipTrigger = myThis.echarts.tooltipTrigger;
        }
        //坐标指示器显示类型
        let tooltipType = 'shadow';
        if(myThis.echarts.tooltipType){
          tooltipType = myThis.echarts.tooltipType;
        }
        //是否让x坐标文字添加背景颜色
        let labelShow = false;
        if(myThis.echarts.labelShow){
          labelShow = myThis.echarts.labelShow;
        }
        //坐标指示器显示内容
        let formatter = null;
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
        let gridTop = '5%';
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
         * x轴-坐标样式，文字样式
         * @type {boolean}
         */
        //x轴类型
        let typeX = 'category';
        if(myThis.echarts.typeX){
          typeX = myThis.echarts.typeX;
        }
        //是否偏移
        let boundaryGap = true;
        if(myThis.echarts.boundaryGap !== undefined && myThis.echarts.boundaryGap !=="" && myThis.echarts.boundaryGap !==null){
          boundaryGap = myThis.echarts.boundaryGap;
        }
        //x轴分割线是否显示
        let splitLineShowX = false;
        if(myThis.echarts.splitLineShowX){
          splitLineShowX = myThis.echarts.splitLineShowX;
        }
        //x轴分割线颜色
        let splitLineShowXColor = '#FFFFFF';
        if(myThis.echarts.splitLineShowXColor){
          splitLineShowXColor = myThis.echarts.splitLineShowXColor;
        }
        //x轴分割线宽度
        let splitLineShowXWidth = 1;
        if(myThis.echarts.splitLineShowXWidth){
          splitLineShowXWidth = myThis.echarts.splitLineShowXWidth;
        }
        //x轴分割线样式
        let splitLineXType = 'solid';
        if(myThis.echarts.splitLineXType){
          splitLineXType = myThis.echarts.splitLineXType;
        }
        //x轴刻度是否显示
        let axisTickShowX = false;
        if(myThis.echarts.axisTickShowX){
          axisTickShowX = myThis.echarts.axisTickShowX;
        }
        //x轴刻度颜色
        let axisTickShowXColor = '#FFFFFF';
        if(myThis.echarts.axisTickShowXColor){
          axisTickShowXColor = myThis.echarts.axisTickShowXColor;
        }
        //x轴刻度宽度
        let axisTickShowXWidth = 1;
        if(myThis.echarts.axisTickShowXWidth){
          axisTickShowXWidth = myThis.echarts.axisTickShowXWidth;
        }
        //x轴坐标轴是否显示
        let axisLineShowX = false;
        if(myThis.echarts.axisLineShowX){
          axisLineShowX = myThis.echarts.axisLineShowX;
        }
        //x轴坐标轴颜色
        let axisLineXColor = '#FFFFFF';
        if(myThis.echarts.axisLineXColor){
          axisLineXColor = myThis.echarts.axisLineXColor;
        }
        //x轴坐标轴宽度
        let axisLineXWidth = 1;
        if(myThis.echarts.axisLineXWidth){
          axisLineXWidth = myThis.echarts.axisLineXWidth;
        }
        //x轴坐标轴样式
        let axisLineXType = 'solid';
        if(myThis.echarts.axisLineXType){
          axisLineXType = myThis.echarts.axisLineXType;
        }
        //x轴坐标轴文字是否显示
        let axisLabelShowX = false;
        if(myThis.echarts.axisLabelShowX){
          axisLabelShowX = myThis.echarts.axisLabelShowX;
        }
        //x轴坐标轴文字颜色
        let axisLabelXColor = '#FFFFFF';
        if(myThis.echarts.axisLabelXColor){
          axisLabelXColor = myThis.echarts.axisLabelXColor;
        }
        //x轴坐标轴文字大小
        let axisLabelXFontSize = 12;
        if(myThis.echarts.axisLabelXFontSize){
          axisLabelXFontSize = myThis.echarts.axisLabelXFontSize;
        }
        //x轴坐标轴单位文字距离x轴的距离
        let nameGap = 5;
        if(myThis.echarts.nameGap){
          nameGap = myThis.echarts.nameGap;
        }
        //x轴坐标轴单位文字
        let xAxisName = '';
        if(myThis.echarts.xAxisName){
          xAxisName = myThis.echarts.xAxisName;
        }
        //x轴坐标轴单位文字颜色
        let xAxisTextColor = '#FFFFFF';
        if(myThis.echarts.xAxisTextColor){
          xAxisTextColor = myThis.echarts.xAxisTextColor;
        }
        //x轴坐标轴单位文字大小
        let xAxisTextSize = 12;
        if(myThis.echarts.xAxisTextSize){
          xAxisTextSize = myThis.echarts.xAxisTextSize;
        }
        //x轴坐标轴单位文字倾斜
        let rotate = 0;
        if(myThis.echarts.rotate){
          rotate = myThis.echarts.rotate;
        }
        //是否全部显示x文字
        let interval = 0;
        if(myThis.echarts.interval){
          interval = myThis.echarts.interval;
        }

        myChart.setOption({
          color:chartColor,
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
          tooltip: {
            show:tooltipShow,
            trigger:tooltipTrigger,
            axisPointer: {    // 坐标轴指示器，坐标轴触发有效
              type:tooltipType, // 默认为直线，可选为：'line' | 'shadow'\
              label: {
                show: labelShow
              }
            },
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
          xAxis : [
            {
              type:typeX,
              data:myThis.echarts.xData,
              boundaryGap:boundaryGap,
              name:xAxisName,
              nameTextStyle: {
                color:xAxisTextColor,
                fontSize:xAxisTextSize,
              },
              nameGap:nameGap,
              axisLabel: {
                show:axisLabelShowX,
                textStyle: {
                  color:axisLabelXColor,
                  fontSize:axisLabelXFontSize,
                },
                interval:interval,
                rotate:rotate
              },
              axisLine: {
                show: axisLineShowX,
                lineStyle: {
                  color: axisLineXColor,
                  width:axisLineXWidth,
                  type:axisLineXType
                },
              },
              splitLine: {
                show:splitLineShowX,
                lineStyle:{
                  color:splitLineShowXColor,
                  width:splitLineShowXWidth,
                  type:splitLineXType
                }
              },
              axisTick: {
                show:axisTickShowX,
                lineStyle:{
                  color:axisTickShowXColor,
                  width:axisTickShowXWidth
                }
              },
            }
          ],
          yAxis:myThis.yAxisData,
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
      },500)
    },
    created(){},
  }
</script>
<style scoped></style>

