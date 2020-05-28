import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import user from './modules/user'

Vue.use(Vuex);

// 应用初始状态
const store = new Vuex.Store({
  modules: {
    user
  },
  getters
});

// 创建 store 实例
export default store
