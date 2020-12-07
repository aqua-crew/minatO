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
  setModal(state, {
    modal,
    value,
  }) {
    state.modals[modal] = value
  },
}

const actions = {
  open(context, {
    modal,
    value,
  }) {
    context.commit('setModal', {
      modal,
      value,
    })
  },

  close(context, modal) {
    context.commit('setModal', {
      modal,
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
