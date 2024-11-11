import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '@/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
      localStorage.setItem('isAuthenticated', status);
    },
  },
  actions: {
    checkAuthentication({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('setAuthentication', true);
        } else {
          commit('setAuthentication', false);
        }
      });
    },
  },
  modules: {},
})
