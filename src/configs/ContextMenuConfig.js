import { FileEnum } from '/src/enums/index'
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
        name: payload.name,
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
    const pid = payload.pid
    const mid = payload.mid

    const menuList = [
      {
        name: 'Create File',
        fn() {
          unfold()

          $store.dispatch('modals/open', {
            modal: Modals.Workspace,
            value: {
              mid,
              pid,
              type: FileEnum.FileType.File,
            },
          })

          $store.dispatch('workspace/createPlaceholderFile', {
            pid,
            mid,
            type: FileEnum.FileType.File,
          })
        },
      },
      {
        name: 'Create Folder',
        fn() {
          unfold()

          $store.dispatch('modals/open', {
            modal: Modals.Workspace,
            value: {
              mid,
              pid,
              type: FileEnum.FileType.Folder,
            },
          })

          $store.dispatch('workspace/createPlaceholderFile', {
            pid,
            mid,
            type: FileEnum.FileType.Folder,
          })
        },
      },
    ]

    if (payload.name) {
      menuList.unshift({
        name: payload.name
      })
    }

    if (payload.file) {
      menuList.push({
        name: 'Delete',
        fn() {
          $store.dispatch('workspace/removeFileAsync', payload.file)
        },
      })
    }

    return menuList
  },
}

export default contextmenu
