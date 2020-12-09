import { FileEnum } from '/src/enums/index'
import { FileHelper } from '/src/helpers/index'
import Modals from '/src/Modals/index'

const contextmenu = {
  get(type, payload) {
    return contextmenu[type](payload)
  },

  file(payload) {
    const $store = payload.$store
    const file = payload.file

    return [
      {
        name: FileHelper.getFullName(file),
      },
      {
        name: 'Delete',
        fn() {
          $store.dispatch('workspace/removeFileAsync', file)
        },
      },
    ]
  },

  folder(payload) {
    const $store = payload.$store
    const unfold = payload.unfold
    const file = payload.file

    const menuList = [
      {
        name: 'Create File',
        fn() {
          unfold()

          $store.dispatch('modals/open', Modals.Workspace)
          $store.dispatch('workspace/createPlaceholderFile', {
            pid: file.pid,
            mid: file.fid,
            type: FileEnum.FileType.File,
          })
        },
      },
      {
        name: 'Create Folder',
        fn() {
          unfold()

          $store.dispatch('modals/open', Modals.Workspace)
          $store.dispatch('workspace/createPlaceholderFile', {
            pid: file.pid,
            mid: file.fid,
            type: FileEnum.FileType.Folder,
          })
        },
      },
    ]

    if (!payload.noName) {
      menuList.unshift({
        name: FileHelper.getFullName(file),
      })
    }

    if (!payload.noDelete) {
      menuList.push({
        name: 'Delete',
        fn() {
          $store.dispatch('workspace/removeFileAsync', file)
        },
      })
    }

    return menuList
  },
}

export default contextmenu
