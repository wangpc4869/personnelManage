<template>
    <div class="home">
      <nav-menu></nav-menu>
      <div class="home-right">
        <home-header></home-header>
       <div class="main scrollbar">
         <router-view></router-view>
       </div>
      </div>

    </div>
</template>

<script>
  //顶部组件
  import HomeHeader from "@/components/common/header";
  //菜单组件
  import NavMenu from "@/components/common/nav-menu";
  export default {
    name: "wxHome",
    components:{
      HomeHeader,
      NavMenu
    },
    data() {
      return {}
    },
    created(){
    },
    mounted() {},
    computed:{},
    watch: { },
    methods: {}
  }
</script>

<style scoped lang="scss">
  /deep/ body,html{
      /*overflow: hidden;*/
  }
  .home{
    display: flex;
    width: 100%;
    height:100%;
    min-width: 1366px;
    font-family: "PFR";
    overflow: hidden;
    &-right{
      flex: 1;
      .main{
        height: calc(100% - 64px);
        padding: 30px;
        background-color: #f0f2f5;
        overflow: auto;
      }
    }
  }
</style>

