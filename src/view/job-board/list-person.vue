<!--人员清单-->
<template>
  <div class="list-person common-div common-h1">
    <div class="person-title">
      <div class="title">
        人员清单
      </div>
      <ul class="position">
        <li v-for="(item,i) in positionList" :key="i" @click="choose(item)" :class="[i===0?'div1':i===positionList.length-1?'div2':'',item.isShow === true?'div3':'','position-list','pc-text']" :title="item.name">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="person-content scrollbar">
      <div class="ul" v-for="(item,i) in activeArr" :key="i">
        <div class="ul-title">
          <div class="point"></div>
          <div class="text">
            {{item.name}}
          </div>
        </div>
        <ul>
          <li v-for="(value,t) in item.children" :key="t" @click="chooseLi(value)">
            <img src="/static/images/header/img_01.png">
            <div :class="['li-text',value.id === liIndex?'li-index':'']">
              {{value.name}}
            </div>
          </li>
        </ul>
      </div>
      <transition name="el-zoom-in-top">
        <div class="dialog" v-if="isDialog">
          <div class="dialog-text">
            <div class="img">
              <img src="/static/images/header/img_01.png">
            </div>
            <div class="text">
              <p class="p1">
                Serati Ma
              </p>
              <p class="p2 pc-text">
                项目经理、产品经理
              </p>
            </div>
            <div class="close">
              <img src="/static/images/header/icon_01.svg" @click="close">
            </div>
          </div>
          <div class="dialog-content scrollbar">
            <div class="div">
              <div class="div-point"></div>
              <div class="div-text">
                项目001：我是内容我是内容我是内容
              </div>
            </div>
            <div class="div">
              <div class="div-point"></div>
              <div class="div-text">
                项目002：我是内容我是内容我是内容
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "listPerson",
    components:{},
    computed:{},
    data() {
      return {
        positionList:[
          {
            id:0,
            name:'项目经理',
            isShow:false,
            children:[
              {
                id:0,
                name:'Serati Ma'
              },
              {
                id:0,
                name:'Serati Ma'
              }
            ]
          },
          {
            id:1,
            name:'产品经理',
            isShow:false,
            children:[]
          },
          {
            id:3,
            name:'开发经理',
            isShow:false,
            children:[]
          },
          {
            id:4,
            name:'测试经理',
            isShow:false,
            children:[
              {
                id:0,
                name:'Serati Ma'
              },
              {
                id:0,
                name:'Serati Ma'
              }
            ]
          },
          {
            id:5,
            name:'WEB前端',
            isShow:false,
            children:[]
          },
          {
            id:6,
            name:'WEB后端',
            isShow:false,
            children:[]
          },
          {
            id:7,
            name:'大数据开发',
            isShow:false,
            children:[
              {
                id:0,
                name:'Serati Ma'
              },
              {
                id:0,
                name:'Serati Ma'
              }
            ]
          },
          {
            id:8,
            name:'APP开发',
            isShow:false,
            children:[]
          },
          {
            id:9,
            name:'软件测试',
            isShow:false,
            children:[]
          }
        ],
        activeArr:[
          {
            id:0,
            name:'项目经理',
            isShow:false,
            children:[
              {
                id:10,
                name:'Serati Ma'
              },
              {
                id:11,
                name:'Serati Ma'
              },
            ]
          },
          {
            id:7,
            name:'大数据开发',
            isShow:false,
            children:[
              {
                id:71,
                name:'Serati Ma'
              },
            ]
          },
        ],

        isDialog:false,
        liIndex:0,
        dialogData:[],
      }
    },
    created() {
      // for(let item of this.positionList){
      //   item.isShow = false;
      // }
    },
    mounted() {},
    watch: { },
    methods: {
      // 选择类型
      choose(item){
        item.isShow = !item.isShow;
      },
      //查看人员详情
      chooseLi(value){
        console.log(value.id)
        this.liIndex = value.id;
        this.isDialog = true;
      },
      //关闭详情框
      close(){
        this.isDialog = false;
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../assets/styles/jobBoard.scss';
  .list-person{
    .person-title{
      height: 105px;
      padding: 15px 10px 15px 25px;
      border-bottom:1px solid #E9E9E9;
      .title{
        font-family: "SNM";
        font-size: 16px;
        color: rgba(0,0,0,0.85);
      }
      .position{
        margin-top: 17px;
        height: 32px;
        overflow: hidden;
        &-list{
          float: left;
          list-style: none;
          width: 11.1%;
          height: 32px;
          line-height: 32px;
          padding: 0 8px;
          font-size: 14px;
          color: rgba(0,0,0,0.65);
          text-align: center;
          cursor: pointer;
          border: 1px solid #D9D9D9;
          border-left: none;
        }
        .div1{
          border-radius: 4px 0 0 4px;
          border-left: 1px solid #D9D9D9;
        }
        .div2{
          border-radius: 0 4px 4px 0;
        }
        .div3{
          color: #1890FF;
          border: 1px solid #1890FF;
        }
      }
    }
    .person-content{
      position: relative;
      height: 600px;
      overflow: auto;
      padding: 20px 20px 0 25px;
      .ul{
        &-title{
          display: flex;
          height: 40px;
          .point{
            position: relative;
            top: 7px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #1890FF;
          }
          .text{
            padding-left: 8px;
            font-size: 14px;
            color: rgba(0,0,0,0.65);
          }
        }
        ul{
          overflow: hidden;
          li{
            float: left;
            list-style: none;
            width: 20%;
            height: 160px;
            margin-bottom: 15px;
            text-align: center;
            cursor: pointer;
            img{
              width: 116px;
              height: 116px;
              border-radius: 50%;
            }
            .li-text{
              font-family: "SNM";
              font-size: 16px;
              color: rgba(0,0,0,0.85);
            }
            .li-index{
              color: #1890FF;
            }
          }
        }
      }
    }
    .dialog{
      position: absolute;
      top: 50px;
      left: 10%;
      width: 80%;
      padding-bottom: 15px;
      background: #FFFFFF;
      box-shadow: 0 1px 6px 0 rgba(0,0,0,0.15);
      border-radius: 4px;
      &-text{
        display: flex;
        height: 80px;
        padding-top: 15px;
        background: #FAFAFA;
        .img{
          width: 80px;
          text-align: right;
          img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .text{
          position: relative;
          top: -2px;
          flex: 1;
          padding-left: 10px;
          .p1{
            font-family: "SNM";
            font-size: 20px;
            color: rgba(0,0,0,0.85);
          }
          .p2{
            font-size: 14px;
            color: rgba(0,0,0,0.65);
          }
        }
        .close{
          width: 40px;
          img{
            margin-top: 15px;
            width: 14px;
            height: 14px;
            cursor: pointer;
          }
        }
      }
      &-content{
        max-height: 340px;
        padding: 0 15%;
        margin-top: 25px;
        overflow: auto;
        .div{
          display: flex;
          margin-bottom: 15px;
          &-point{
            position: relative;
            top: 7px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(0,0,0,0.45);
          }
          &-text{
            flex: 1;
            padding-left: 8px;
            font-size: 14px;
            color: rgba(0,0,0,0.9);
          }
        }
      }
    }
  }
</style>

