import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    userName: '',
    token: '',
    isLoggedIn: false
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userRole: state => state.userInfo ? state.userInfo.role : null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      state.isLoggedIn = true;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearUserInfo(state) {
      state.userInfo = null;
      state.userName = '';
      state.token = '';
      state.isLoggedIn = false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
    initializeStore(state) {
      // 从 localStorage 恢复状态
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        state.userInfo = parsedUserInfo;
        state.userName = parsedUserInfo.username;
        state.token = parsedUserInfo.token;
        state.isLoggedIn = true;
      }
    }
  },
  actions: {
    initializeApp({ commit }) {
      commit('initializeStore');
    },
    login({ commit }, userData) {
      commit('setUserInfo', userData);
      commit('setUserName', userData.username);
      commit('setToken', userData.token);
    },
    logout({ commit }) {
      commit('clearUserInfo');
    }
  },
  modules: {
  }
})
