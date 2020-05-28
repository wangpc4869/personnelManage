import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import axios from 'axios';
import iView from 'iview';
import moment from 'moment';
import ElementUI from 'element-ui';
import lodash from 'lodash';
import 'element-ui/lib/theme-chalk/index.css';
import 'iview/dist/styles/iview.css';
import './assets/styles/styles.scss';
import VueCookies from 'vue-cookie'
import { API } from '@/api/api';
import echarts from 'echarts';

import animate from 'animate.css'
import $ from 'jquery'

Vue.use(animate);
Vue.use(VueCookies);
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(lodash);
Vue.prototype.$axios = axios;
Vue.prototype.$API = API;
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.prototype.$ = $;
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title;
  }
});

// 注册全局组件
export default router;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
