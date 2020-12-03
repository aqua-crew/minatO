import store from 'store'

const makeImmutable = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

const generator = function(prefix = '') {
  let seed = 1

  return {
    generate() {
      return prefix +
        (Math.random().toString(36).substring(2)) +
        (new Date().getTime().toString(36).substring(2))
    }
  }
}

const pidGenerator = generator('100')
const fidGenerator = generator('200')

const getId = function(prefix = '', generator) {
  return function() {
    return prefix + generator.generate()
  }
}

const getPid = getId('p', pidGenerator)
const getFid = getId('f', fidGenerator)

const buffer = {
  projects: [],
  contents: [],

  getProject(pid, returnIndex = false) {
    return returnIndex ?
      buffer.projects.findIndex(project => project.pid === pid) :
      buffer.projects.find(project => project.pid === pid)
  },
  getContent(cid, returnIndex = false) {
    return returnIndex ?
      buffer.contents.findIndex(content => content.cid === cid) :
      buffer.contents.find(content => content.cid === cid)
  },
}

const setup = function() {
  store.each((value, key) => {
    if (key.startsWith('p')) {
      buffer.projects.push(value)
    }
  })

  store.each((value, key) => {
    if (key.startsWith('f')) {
      const file = value
      const project = buffer.getProject(file.pid)

      if (!project.files) {
        project.files = []
      }

      project.files.push(file)
    }

    if (key.startsWith('c')) {
      const content = value

      buffer.contents.push(content)
    }
  })
}

const server = {
  user: {
    get(username, password) {
      return new Promise(resolve => {
        resolve({
          uid: '0003535',
          username,
          password,
        })
      })
    }
  },
  workspace: {
    set(uid, workspace) {
      const wid = 'w' + uid

      return new Promise(resolve => {
        workspace = {
          pid: workspace.pid,
          fid: workspace.fid,
          openedFilesId: workspace.openedFilesId,
        }

        store.set(wid, workspace)

        resolve(makeImmutable(workspace))
      })
    },
    get(uid) {
      const wid = 'w' + uid

      return new Promise(resolve => {
        const workspace = store.get(wid)

        resolve(workspace)
      }).then((workspace) => {
        if (!workspace) {
          return {
            project: null,
            file: null,
            openedFiles: [],
          }
        }

        return Promise.all([
          workspace.project ? server.project.get(workspace.project.pid) : Promise.resolve(null),
          workspace.file ? server.file.get(workspace.fid) : Promise.resolve(null),
        ]).then(([project, file]) => {
          return Promise.all(workspace.openedFilesId.map(fid => server.file.get(pid, fid)))
            .then(openedFiles => {
              return makeImmutable({
                project,
                file,
                openedFiles,
              })
            })
        })
      })
    }
  },
  project: {
    create(project) {
      const pid = getPid()

      project = {
        pid,
        createdTime: new Date().getTime(),
        status: {
          isDelete: '0',
        },
        name: project.name,
        desc: project.desc || '',
        avatar: project.avatar || '',
        files: project.files || [],
      }

      return new Promise(resolve => {
        buffer.projects.push(project)
        store.set(pid, project)

        resolve(makeImmutable(project))
      })
    },
    get(pid) {
      if (pid == null) {
        return new Promise(resolve => {
          resolve(makeImmutable(buffer.projects))
        })
      }

      return Promise.resolve(makeImmutable(buffer.getProject(pid)))
    },
    remove(pid) {
      const ReturnIndex = true

      buffer.projects.splice(buffer.getProject(pid, ReturnIndex), 1)

      return new Promise(resolve => {
        const project = store.get(pid)
        store.remove(pid)
        resolve(project)
      })
    },
  },
  file: {
    create(pid, file, mid = '0') {
      const NotUpdate = false
      const fid = getFid()

      const promise = file.type === 0 ? server.content.create(pid, fid, '') : Promise.resolve(null)

      return promise.then(content => {
        file = {
          fid,
          pid,
          mid,
          createdTime: new Date().getTime(),
          updatedTime: '-1',
          openedTime: '-1',
          status: {
            isDelete: '0',
            isFold: '1',
          },
          name: file.name,
          ext: file.ext,
          type: file.type,
        }

        if (content) {
          file.cid = content.cid
        }

        return server.file.set(fid, file, NotUpdate)
      }).then(file => {
        buffer.getProject(pid).files.push(file)

        return makeImmutable(file)
      })
    },
    set(fid, file, update = true) {
      return new Promise(resolve => {
        if (update) {
          file.updatedTime = new Date().getTime()
        }

        const files = buffer.projects
        if (!buffer.getProject(file.pid)) {
          files.push(content)
        } else {
          files[files.findIndex(file => file.fid === fid)] = file
        }

        store.set(fid, file)
        resolve(makeImmutable(file))
      })
    },
    get(pid, fid) {
      return new Promise(resolve => {
        const file = buffer.getProject(pid).files.find(file => file.fid === fid)

        resolve(makeImmutable(file))
      })
    },
    remove(pid, fid) {
      const project = buffer.getProject(pid)
      project.files.splice(project.files.findIndex(file => file.fid === fid), 1)

      return new Promise(resolve => {
        const file = store.get(fid)
        file.status.isDelete = '1'
        store.set(fid, file)
        resolve(file)
      })
    },
  },
  content: {
    create(pid, fid, content) {
      const cid = server.content._toCid(pid, fid)

      return server.content.set(cid, content)
    },
    get(cid) {
      return new Promise(resolve => {
        resolve(store.get(cid))
      })
    },
    set(cid, content = '') {
      content = {
        cid,
        branch: '@',
        chunk: '@',
        updatedTime: new Date().getTime(),
        content,
      }

      return new Promise(resolve => {
        store.set(cid, content)

        if (!buffer.getContent(cid)) {
          buffer.contents.push(content)
        } else {
          const ReturnIndex = true
          buffer.contents[buffer.getContent(cid, ReturnIndex)] = content
        }

        resolve(makeImmutable(content))
      })
    },
    _toCid(pid, fid) {
      return 'c' + pid.substring(1) + '-' + fid.substring(1)
    },
  }
}

setup()

export default server
