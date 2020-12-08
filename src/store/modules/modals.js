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
  open(context, modalOrOption) {
    let modal = ''
    let value = true

    if (typeof modalOrOption === 'string') {
      modal = modalOrOption
    } else {
      modal = modalOrOption.modal
      value = modalOrOption.value !== undefined ? modalOrOption.value : true
    }

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
