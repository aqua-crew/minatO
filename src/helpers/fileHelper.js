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

  isDelete(file) {
    return file.status.isDelete === '1'
  },

  isPlaceholder(file) {
    return file.fid === '-1'
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

  getFullName(file) {
    return file.ext ? file.name + '.' + file.ext : file.name
  },

  getNameAndExt(fullName) {
    const fullNameArr = fullName.split('.')

    let name = ''
    let ext = ''

    const len = fullNameArr.length
    if (len === 1) {
      name = fullNameArr[0]
    } else {
      if (fullNameArr[0].length === 0) {
        name = '.' + fullNameArr[1]
      } else {
        ext = fullNameArr[len - 1]
        name = fullName.substring(0, fullName.length - ext.length - 1)
      }
    }

    return {
      name,
      ext,
    }
  },
}
