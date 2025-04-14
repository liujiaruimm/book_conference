import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    userName: '',
    token: localStorage.getItem('token') || ''
  },
  getters: {
    isLoggedIn: state => !!state.token,
    userRole: state => state.userInfo ? state.userInfo.role : null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
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
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    }
  },
  actions: {
    login({ commit }, userData) {
      commit('setUserInfo', userData);
      commit('setUserName', userData.userName);
      commit('setToken', userData.password); // 这里假设password字段作为token使用
    },
    logout({ commit }) {
      commit('clearUserInfo');
    }
  },
  modules: {
  }
})
