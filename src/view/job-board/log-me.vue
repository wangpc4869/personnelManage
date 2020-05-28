<!--我的日志-->
<template>
  <div class="log-me common-div common-h1">
    <div class="common-div-title">
      <div class="left">
        我的日志
      </div>
      <div class="right">
        <el-form ref="queryForm">
          <el-date-picker
            v-model="queryDate"
            type="month"
            clearable
            placeholder="请选择时间"
            value-format="yyyy-MM-dd"
            @change="chooseDate"
          >
          </el-date-picker>
        </el-form>
      </div>
    </div>
    <div class="common-div-content">
      <div class="statistical">
        <div v-for="(item,i) in liList" :key="i" :class="['bg'+i]">
          <p class="p1">
            {{item.name}}
          </p>
          <p class="p2">
            {{item.value}}
          </p>
        </div>
      </div>
      <div class="switch">
        <div class="switch-left">
          <img src="/static/images/job_board/icon_01.svg" @click="prev">
        </div>
        <div class="switch-date">
          {{dateDurrent}}
        </div>
        <div class="switch-right">
          <img src="/static/images/job_board/icon_02.svg" @click="next">
        </div>
      </div>
      <div class="calendar">
        <el-calendar v-model="dateValue">
          <template
            slot="dateCell"
            slot-scope="{data}">
            <!--自定义内容-->
            <div>
              <div>{{ data.day.split('-').slice(2).join('-') }}</div>
              <div v-for="(item,i) in calendarData" :key="i">
                <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                  <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                    <div class="calendar-div dbg1" v-if="item.type === 1"></div>
                    <div class="calendar-div dbg2" v-if="item.type === 2"></div>
                    <div class="calendar-div dbg3" v-if="item.type === 3"></div>
                    <div class="calendar-div dbg4" v-if="item.type === 4"></div>
                    <div class="calendar-div dbg5" v-if="item.type === 5"></div>
                  </div>
                  <div v-else></div>
                </div>
                <div v-else></div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
      <div class="legend">
        <div>
          <p class="dbg5"></p>
          请假
        </div>
        <div>
          <p class="dbg4"></p>
          休假
        </div>
        <div>
          <p class="dbg3"></p>
          未填
        </div>
        <div>
          <p class="dbg2"></p>
          补填
        </div>
        <div>
          <p class="dbg1"></p>
          正常
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate,prev_date,next_date} from '@/utility/utility';
  export default {
    name: "logMe",
    components:{},
    computed:{},
    data() {
      return {
        queryDate:'',
        liList:[
          {
            name:'正常',
            value:22,
          },
          {
            name:'补填',
            value:6,
          },
          {
            name:'未填',
            value:1,
          },
          {
            name:'休假',
            value:2,
          },
          {
            name:'请假',
            value:0,
          }
        ],
        dateDurrent:'',
        dateValue: new Date(),

        calendarData: [
          { months: ['05'],days: ['15'],type:1},
          { months: ['05'], days: ['02'],type:2},
          { months: ['05'], days: ['09'],type:3},
          { months: ['05'], days: ['08'],type:4},
          { months: ['06'], days: ['13'],type:5}
        ]
      }
    },
    created() {
      this.dateDurrent = formatDate(new Date(), 'yyyy年MM月');
    },
    mounted() {},
    watch: { },
    methods: {
      // 上一个月
      prev(){
        let dateValue = formatDate(this.dateValue, 'yyyy-MM-dd');
        let date = prev_date(dateValue);
        this.date(date);
      },
      // 下一个月
      next(){
        let dateValue = formatDate(this.dateValue, 'yyyy-MM-dd');
        let date = next_date(dateValue);
        this.date(date);
      },
      //获取日期
      date(date){
        let dates = new Date(date);
        this.dateValue = dates;
        this.dateDurrent =  formatDate(dates, 'yyyy年MM月');
      },
      // 选择时间
      chooseDate(){
        if(this.queryDate){
          this.date(this.queryDate);
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../assets/styles/jobBoard.scss';
  @import '../../assets/styles/common.scss';
  .log-me{
    .switch{
      display: flex;
      height: 60px;
      line-height: 60px;
      &-left,&-right{
        width: 30%;
        img{
          cursor: pointer;
        }
      }
      &-left{
        text-align: right;
      }
      &-date{
        width: 40%;
        font-family: "SNM";
        font-size: 14px;
        color: rgba(0,0,0,0.85);
        text-align: center;
      }
    }
    /deep/ .calendar{
      .el-calendar{
        &__header{
          display: none;
        }
        &-table thead th{
          font-family: "SNM";
          font-size: 14px;
          color: rgba(0,0,0,0.65);
        }
        &-day{
          height: 60px;
          padding: 15px 0 0 0;
          font-family: "PFR";
          font-size: 14px;
          text-align: center;
        }
        &-table:not(.is-range) td.current{
          color: rgba(0,0,0,0.65);
        }
        &-table td.is-selected{
          font-family: "SNM";
          font-size: 14px;
          color: #FFFFFF !important;
          background: #1890FF !important;
          box-shadow: 0 10px 10px -6px #D2E8FF;
        }
        &-table:not(.is-range) td.prev,&-table:not(.is-range) td.next{
          color: rgba(0,0,0,0.25);
        }
        .is-selected{
          .el-calendar-day:hover{
              background: none;
          }
        }
      }
      &-div{
        width: 20px;
        height: 4px;
        margin: 3px auto;
        border-radius: 3px;
      }
    }
    .legend{
      display: flex;
      flex-direction: row-reverse;
      margin-top: -20px;
      padding-right: 20px;
      div{
        font-size: 14px;
        padding-left: 20px;
        color: rgba(0,0,0,0.8);
        p{
          position: relative;
          top: 7px;
          float: left;
          width: 6px;
          height: 6px;
          margin-right: 7px;
          border-radius: 50%;
        }
      }
    }
  }
</style>

