import server from '/src/server/index'

const api = Object.create(null)

Object.keys(server).map(key => {
  const type = key
  const fns = server[type]

  Object.keys(fns).map(key => {
    if (key.startsWith('_')) {
      return
    }

    const fnName = key + type.substring(0, 1).toUpperCase() + type.substring(1)

    api[fnName] = fns[key]
  })
})

export default api

// import api from '../mock/index.js'

// function getProjects(uid) {
//   return Promise.resolve(api.get('/projects'))
// }

// function getProject(pid) {
//   return Promise.resolve(api.get(`/project/${pid}`)).then(raw => {
//     const data = JSON.parse(JSON.stringify(raw))
//     const { files, tempFiles } = FileHandler.buildTree(data.files)

//     data.files = files
//     data.tempFiles = tempFiles

//     console.warn('data.tempFiles', data.tempFiles)

//     return data
//   })
// }

// function getWorkspace(uid) {
//   return Promise.resolve(api.get(`/workspace`)).then(raw => {
//     const data = JSON.parse(JSON.stringify(raw))
//     const { project } = data

//     data.fileList = project.files

//     data.currentTab = project.files.find(file => file.fid === data.currentTab)
//     data.tabs = data.tabs.map(tab => {
//       return project.files.find(file => file.fid === tab)
//     })

//     const { files, tempFiles } = FileHandler.buildTree(project.files)

//     project.files = files
//     project.tempFiles = tempFiles

//     return data
//   })
// }

// function getFile(pid, fid) {
//   return Promise.resolve(api.get(`/project/${pid}/file/${fid}`))
// }

// function setProjects(uid) {

// }

// export {
//   getProjects,
//   getProject,
//   getWorkspace,
//   getFile,
// }

// const FileHandler = {
//   /**
//    * 可能存在当前 file 的 parent 尚未存储在 fileMap 中的情况,
//    * 所以把这个动作记录下来,
//    * 当以后的遍历中检测到当前 file.fid 有 buffer 的时候再执行存储动作
//    * @param {Array<File>} fileList
//    */
//   buildTree(fileList) {
//     const files = []
//     const tempFiles = []

//     /* 1 */
//     const buffer = Object.create(null)
//     const fileMap = Object.create(null)

//     for (let i = 0; i < fileList.length; i++) {
//       const file = fileList[i]
//       fileMap[file.fid] = file

//       if (buffer[file.fid]) {
//         file.children = buffer[file.fid]
//         file.children.forEach(child => {
//           child.parent = file
//         })

//         buffer[file.fid] = null
//       }

//       const parentFid = file.parent
//       if (parentFid === '0') {
//         file.parent = null
//         files.push(file)

//         continue
//       }

//       if (parentFid === '-1') {
//         file.parent = null
//         tempFiles.push(file)

//         continue
//       }

//       const parentFile = fileMap[parentFid]

//       if (!parentFile) {
//         let bufferOfFid = buffer[parentFid]

//         if (!bufferOfFid) {
//           bufferOfFid = buffer[parentFid] = []
//         }

//         bufferOfFid.push(file)

//         continue
//       }

//       if (!parentFile.children) {
//         parentFile.children = []
//       }

//       parentFile.children.push(file)
//       file.parent = parentFile
//     }

//     return {
//       files,
//       tempFiles,
//     }
//   }
// }
