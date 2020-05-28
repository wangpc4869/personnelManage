<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  created(){
    // 登录进来userMsg肯定不为空
    if (sessionStorage.getItem("userMsg")){
      this.$store.state.user = JSON.parse(sessionStorage.getItem("userMsg")).content
    }
  }
}
</script>
<style>
@import url('http://at.alicdn.com/t/font_789764_l4pmijxg7kg.css');
.el-collapse-item__header{
    width: 160px
}
.el-collapse-item__wrap{
    margin-top: 20px
}
.el-button{
  line-height: 2px!important;
}
.el-form-item__error{
    z-index: 999;
}
</style>
<style lang="less" rel="stylesheet/less">
  @import "./assets/font/font.css";
</style>

