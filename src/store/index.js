import Vue from 'vue'
import Vuex from 'vuex'

import exceptions from './modules/exceptions'
import modals from './modules/modals'
import projects from './modules/projects'
import user from './modules/user'
import workspace from './modules/workspace'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    exceptions,
    modals,
    projects,
    user,
    workspace,
  },
  strict: debug,
})
