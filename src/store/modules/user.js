import { setStore, getStore, removeStore } from '@/utility/store'

const user = {
    state: {
      isLogin:false,
      userInfo:{},
    },
    mutations: {
      SET_USERINFO: (state, userInfo) => {
        state.isLogin = true;
        state.userInfo = userInfo;
      },
      CLEAR_USER: (state, userInfo) => {
        state.isLogin = false;
        state.userInfo = {};
        removeStore({
            name: 'userMsg'
        });
      }
    },
    actions: {
        async Login({ commit, state }, user) {
            return new Promise((resolve, reject) => {
                commit('SET_USERINFO', user);
                setStore({
                    name: 'userMsg',
                    type: 'session',
                    content: state
                });
                resolve()
            })
        },
        LogOut({ commit, state },) {
            return new Promise((resolve, reject) => {
                commit('CLEAR_ROLE');
                resolve()
            })
        },
    }
}

export default user
