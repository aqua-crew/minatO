import api from '/src/api/index'

const state = () => ({
  user: null,
})

const getters = {}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

const actions = {
  loginAsync(context, {
    username,
    password,
  }) {
    return api.getUser(username, password).then(user => {
      context.commit('setUser', user)
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
