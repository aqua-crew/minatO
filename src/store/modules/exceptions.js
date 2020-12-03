import Exceptions from '/src/exceptions/index'

const state = () => {
  const codes = {}
  Object.keys(Exceptions).forEach(key => {
    codes[Exceptions[key]] = null
  })

  return {
    codes,
  }
}

const getters = {}

const mutations = {
  setException(state, {
    code,
    value,
  }) {
    state.codes[code] = value
  },
}

const actions = {
  throw(context, {
    code,
    exception,
  }) {
    context.commit('setException', {
      code,
      value: exception,
    })
  },

  close(context, code) {
    context.commit('setException', {
      code,
      value: null,
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
