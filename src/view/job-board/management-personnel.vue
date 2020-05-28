<!--管理人员-->
<template>
  <div class="management-personnel">
    <div class="div mg-b">
      <div class="div-left">
        <log-me></log-me>
      </div>
      <div class="div-center"></div>
      <div class="div-right">
        <list-project></list-project>
      </div>
    </div>
    <div class="div">
      <div class="div-left">
        <log-department></log-department>
      </div>
      <div class="div-center"></div>
      <div class="div-right">
        <list-person></list-person>
      </div>
    </div>
  </div>
</template>

<script>
  //我的日志
  import LogMe from '@/view/job-board/log-me';
  //项目清单
  import ListProject from '@/view/job-board/list-project';
  //部门日志
  import LogDepartment from '@/view/job-board/log-department';
  //人员清单
  import ListPerson from '@/view/job-board/list-person';
  export default {
    name: "managementPersonnel",
    components:{
      LogMe,
      ListProject,
      LogDepartment,
      ListPerson,
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
  .management-personnel{}
</style>

