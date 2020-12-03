import { FileEnum } from '/src/enums/index'

export default {
  isFolder(file) {

    return file.type === FileEnum.FileType.Folder
  },

  isFile(file) {
    return file.type === FileEnum.FileType.File
  },

  isSame(fileA, fileB) {
    return fileA.fid === fileB.fid && fileA.pid === fileB.pid
  },

  sort(f) {
    const folders = []
    const files = []

    f.forEach(file => {
      this.isFolder(file) ? folders.push(file) : files.push(file)
    })

    return folders.concat(files)
  },

  mountedInRoot(file) {
    return file.mid === '0'
  },

  isDelete(file) {
    return file.status.isDelete === '1'
  }
}
