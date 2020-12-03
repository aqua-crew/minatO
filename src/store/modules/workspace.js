import api from '/src/api/index'

const state = () => ({
  project: null,
  file: null,
  openedFiles: [],
})

const getters = {
  openedFilesOrderDesc(state) {
    return state.openedFiles.slice().sort((a, b) => {b.openedTime - a.openedTime})
  },
  lastOpenedFile(state, getters) {
    const files = getters.openedFilesOrderDesc

    return files[files.length - 1] || null
  },
}

const mutations = {
  setWorkspace(state, workspace) {
    if (!workspace) {
      return
    }

    state.project = workspace.project
    state.file = workspace.file
    state.openedFiles = workspace.openedFiles
  },
  setProject(state, project) {
    state.project = project
  },
  setFile(state, file) {
    state.file = file
  },
  setOpenedFiles(state, openedFiles) {
    state.setOpenedFiles = openedFiles
  },
  addOpenedFile(state, file, toIndex = Infinity) {
    const isExist = state.openedFiles.find(openedFile => openedFile.fid === file.fid)

    if (isExist) {
      return
    }

    state.openedFiles.splice(toIndex, 0, file)
  },
  removeOpenedFile(state, file) {
    const index = state.openedFiles.findIndex(openedFile => openedFile.fid === file.fid)

    if (index === -1) {
      return
    }

    state.openedFiles.splice(index, 1)
  },
  addFile(state, file) {
    const files = state.project.files

    files.push(file)
  },
  removeFile(state, file) {
    const files = state.project.files

    files.find(f => f.fid === file.fid).status.isDelete = '1'
  },
  foldFile(state, file) {
    file.status.isFold = '1'
  },
  unfoldFile(state, file) {
    file.status.isFold = '0'
  }
}

const actions = {
  requestWorkspace(context, uid) {
    return api.getWorkspace(uid)
  },
  requestContent(context, cid) {
    return api.getContent(cid)
  },
  createWorkspaceAsync(context, pid) {
    return api.getProject(pid).then(project => {
      return context.dispatch('initWorkspace', {
        project,
      })
    })
  },
  createFileAsync(context, file) {
    return api.createFile(file.pid, file, file.mid).then(file => {
      context.commit('addFile', file)
    })
  },
  removeFileAsync(context, file) {
    return api.removeFile(file.pid, file.fid).then(() => {
      context.commit('removeOpenedFile', file)
      context.commit('removeFile', file)
    })
  },
  saveWorkspace({ state }, uid) {
    return api.setWorkspace(uid, {
      pid: state.project ? state.project.pid : '-1',
      fid: state.file ? state.file.fid : '-1',
      openedFilesId: state.openedFiles ? state.openedFiles.map(file => file.fid) : [],
    })
  },
  initWorkspace(context, workspace) {
    workspace = {
      project: null,
      file: null,
      openedFiles: [],
      ...workspace
    }

    context.commit('setWorkspace', workspace)
  },
  openFile(context, file) {
    const NotUpdate = false
    const openedTime = new Date().getTime()

    file = {
      ...file,
      openedTime,
    }

    api.setFile(file.fid, file, NotUpdate)

    context.commit('setFile', file)
    context.commit('addOpenedFile', file)
  },
  closeFile(context, file) {
    context.commit('removeOpenedFile', file)

    if (file.fid === context.state.file.fid) {
      context.commit('setFile', context.getters.lastOpenedFile)
    }
  },
  getContent(context, file) {
    return api.getContent(file.cid)
  },
  saveContent(context, file) {
    return api.setContent(file.cid, file.content)
  },
  toggleFold(context, file) {
    file.status.isFold === '1' ? context.commit('unfoldFile', file) : context.commit('foldFile', file)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
