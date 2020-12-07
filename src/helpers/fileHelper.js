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
  },

  isPlaceholder(file) {
    return file.fid === '-1'
  },

  getNameAndExt(fullName) {
    fullName = fullName.split('.')

    let name = ''
    let ext = ''

    if (fullName.length === 1) {
      name = fullName[0]
    } else {
      if (fullName[0].length === 0) {
        name = '.' + fullName[1]
      } else {
        name = fullName[0]
        ext = fullName[1]
      }
    }

    return {
      name,
      ext,
    }
  },
}
