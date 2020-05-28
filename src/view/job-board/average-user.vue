<!--普通用户-->
<template>
  <div class="average-user">
    <div class="div">
      <div class="div-left">
        <log-me></log-me>
      </div>
      <div class="div-center"></div>
      <div class="div-right">
        <list-project></list-project>
      </div>
    </div>
  </div>
</template>

<script>
  //我的日志
  import LogMe from '@/view/job-board/log-me';
  //项目清单
  import ListProject from '@/view/job-board/list-project';
  export default {
    name: "averageUser",
    components:{
      LogMe,
      ListProject,
    },
    computed:{},
    data() {
      return {}
    },
    created() {},
    mounted() {},
    watch: { },
    methods: {}
  }
</script>
<style scoped lang="scss">
  @import '../../assets/styles/jobBoard.scss';
  .average-user{}
</style>

