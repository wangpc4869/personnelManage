import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  //去掉地址栏路径中的'#'
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      name: 'login',
      component: resolve => require(['@/components/common/login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    // 404page
    {
      path: '/404',
      component: resolve => require(['@/components/global/errorPage/404.vue'], resolve)
    },
    {
      path: '*',
      name: 'notFound',
      redirect: '/404',
      component: resolve => require(['@/components/global/errorPage/404.vue'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/view/Home.vue'], resolve),
      redirect: {
        name: 'jobBoard'
      },
      children: [
        {
          path: "jobBoard",
          name: 'jobBoard',
          component: resolve => require(['@/view/job-board/job-board.vue'], resolve),
          meta: {
            title: '工作看板'
          },
          redirect: {
            name: 'managementPersonnel'
          },
          children: [
            {
              path: "managementPersonnel",
              name: 'managementPersonnel',
              component: resolve => require(['@/view/job-board/management-personnel.vue'], resolve),
              meta: {
                title: '管理人员'
              }
            },
            {
              path: "averageUser",
              name: 'averageUser',
              component: resolve => require(['@/view/job-board/average-user.vue'], resolve),
              meta: {
                title: '普通用户'
              }
            },
          ]
        },
        {
          path: "projectManagement",
          name: 'projectManagement',
          component: resolve => require(['@/view/project-management/project-management.vue'], resolve),
          meta: {
            title: '项目管理'
          }
        },
        {
          path: "personnelManagement",
          name: 'personnelManagement',
          component: resolve => require(['@/view/personnel-management/personnel-management.vue'], resolve),
          meta: {
            title: '人员管理'
          }
        },
        {
          path: "jobLog",
          name: 'jobLog',
          component: resolve => require(['@/view/job-log/job-log.vue'], resolve),
          meta: {
            title: '工作日志'
          }
        }
      ]
    }
  ]
})
