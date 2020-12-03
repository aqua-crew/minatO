import api from '/src/api/index'

const state = () => ({
  projects: [],
})

const getters = {}

const mutations = {
  setProjects(state, projects) {
    state.projects = projects.slice()
  },
  addProject(state, project) {
    state.projects.push(project)
  }
}

const actions = {
  requestProjects(context) {
    return api.getProject().then(data => {
      context.commit('setProjects', data)

      return data
    })
  },
  createProject(context, project) {
    return api.createProject(project).then(project => {
      context.commit('addProject', project)

      return project
    })
  },
  removeProject(context, pid) {
    return api.removeProject(pid)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
