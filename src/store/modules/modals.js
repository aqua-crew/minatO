import Modals from '/src/Modals/index'

const state = () => {
  const modals = {}
  Object.keys(Modals).forEach(key => {
    modals[Modals[key]] = null
  })

  return {
    modals,
  }
}

const getters = {}

const mutations = {
  setLayer(state, {
    layer,
    value,
  }) {
    state.modals[layer] = value
  },
}

const actions = {
  open(context, {
    layer,
    value,
  }) {
    context.commit('setLayer', {
      layer,
      value,
    })
  },

  close(context, layer) {
    context.commit('setLayer', {
      layer,
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
