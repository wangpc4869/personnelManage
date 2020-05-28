<template>
  <div class="nav-menu">
    <div class="button-div">
      <img src="/static/images/muen/icon_02.svg" v-if="isCollapse" @click="collapse">
      <img src="/static/images/muen/icon_01.svg" v-else @click="collapse">
    </div>
    <el-menu :default-active="indexName" class="el-menu-vertical" :collapse="!isCollapse">
      <template v-for="(item,i) in menuList">
        <div class="el-menu-one" v-if="item.children.length === 0">
          <el-menu-item :index="item.pathName" @click="clickJump(item)">
            <img :src="item.imgPath">
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </div>
        <el-submenu :index="item.pathName" v-else>
          <template slot="title">
            <img :src="item.imgPath">
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item :index="item2.pathName" v-for="(item2,t) in item.children" :key="t" @click="clickJump(item2)">{{item2.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "navMenu",
    components:{},
    computed:{},
    data() {
      return {
        // 是否展开菜单
        isCollapse:true,
        // 菜单选中
        indexName:this.$route.name,
        // 菜单数据
        menuList:[
          {
            path:'jobBoard',
            pathName:'jobBoard',
            name:'工作看板',
            imgPath:'/static/images/muen/icon_05.svg',
            children:[
              {
                path:'jobBoard/managementPersonnel',
                pathName:'managementPersonnel',
                name:'管理人员',
                children:[]
              },
              {
                path:'jobBoard/averageUser',
                pathName:'averageUser',
                name:'普通用户',
                children:[]
              }
            ]
          },
          {
            path:'projectManagement',
            pathName:'projectManagement',
            name:'项目管理',
            imgPath:'/static/images/muen/icon_06.svg',
            children:[]
          },
          {
            path:'personnelManagement',
            pathName:'personnelManagement',
            name:'人员管理',
            imgPath:'/static/images/muen/icon_07.svg',
            children:[]
          },
          {
            path:'jobLog',
            pathName:'jobLog',
            name:'工作日志',
            imgPath:'/static/images/muen/icon_08.svg',
            children:[]
          },
        ]
      }
    },
    created() {
    },
    mounted() {},
    watch: { },
    methods: {
      //展开菜单
      collapse(){
        this.isCollapse = !this.isCollapse;
      },
      //页面跳转
      clickJump(item){
        this.$router.push({
          path:'/home/'+item.path
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .nav-menu{
    /*width: 180px;*/
    height: calc(100%);
    background: #0F3166;
    box-shadow: 0 1px 4px 0 rgba(0,21,41,0.20);
    .button-div{
      height: 65px;
      padding: 25px;
      img{
        cursor: pointer;
      }
    }
    /deep/ .el-menu--collapse{
      width: 70px;
    }
    /deep/ .el-menu-vertical{
      color: #ffffff;
      border: none;
      background-color: #0F3166;
      &:not(.el-menu--collapse) {
        width: 180px;
      }
      .el-submenu{
        .el-submenu__title{
          font-size: 14px;
          color: #FFFFFF;
          &:hover{
            background: none;
          }
        }
        .el-menu--inline{
          background: #0C2854;
          .el-menu-item{
            padding-left: 51px !important;
          }
          .is-active{
            font-family: "SNM";
            font-size: 14px;
            color: #FFFFFF;
            background: #1890FF;
            opacity: 1;
          }
        }
      }
      .el-menu-one{
        .is-active{
          font-family: "SNM";
          font-size: 14px;
          color: #FFFFFF;
          background: #1890FF;
          opacity: 1;
        }
      }
      .el-menu-item{
        min-width: 0;
        font-size: 14px;
        color: #FFFFFF;
        opacity: 0.65;
        &:hover{
          background: rgba(24,144,255,0.5);
        }
      }
      img{
        position: relative;
        top: -1px;
        margin: 5px;
        vertical-align:middle;
      }
    }
  }
</style>

