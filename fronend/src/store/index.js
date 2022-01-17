import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state, value) {
      state.count = value
    },
    del(state, value) {
      state.count = value
    }
  },
  getters: {
    getCount(state) {
      return state.count
    }
  },
  actions: {
    addAction(context) {
      context.commit('add', this.getters.getCount + 1)
    },
    delAction(context) {
      context.commit('del', this.getters.getCount - 1)
    }
  },
  modules: {}
})
