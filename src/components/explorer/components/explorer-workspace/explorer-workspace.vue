<template>
  <div class="explorer-workspace">
    <div class="header">
      <div class="title">Workspace</div>
    </div>

    <template v-if="project">
      <project-plane
        v-if="project"
        :project="project"
      ></project-plane>

      <div class="body" @click.right.prevent.stop="onContextMenu">
        <file-filter
          name="Open Files"
        >
          <template #menu>
            <static-icon class="i-icon" :type="openedFiles.length + ''"></static-icon>
          </template>
          <template #catalogue>
            <catalogue
              :catalogues="openedFiles"
              :active="file"
              @onSelect="onSelect"
              @onContextMenu="onContextMenu"
            ></catalogue>
          </template>
        </file-filter>

        <file-filter
          name="Files"
          flexGrow="2"
          ref="filesFilter"
        >
          <template #menu>
            <icon class="i-icon" type="addFile" @click.native.stop="onCreateFile()"></icon>
            <icon class="i-icon" type="addFolder" @click.native.stop="onCreateFolder()"></icon>
          </template>
          <template #catalogue>
            <catalogue
              :catalogues="projectFiles"
              :active="file"
              @onSelect="onSelect"
              @onContextMenu="onContextMenu"
            ></catalogue>
          </template>
        </file-filter>
      </div>
    </template>

    <create-file-modal v-show="createFileModal" @onClose="onCreateFileModalClose"></create-file-modal>
  </div>
</template>

<script>
import Searcher from '/src/components/searcher/searcher'
import ProjectPlane from '/src/components/project-plane/project-plane'
import Catalogue from '/src/components/catalogue/catalogue'
import Icon from '/src/components/icon/icon'
import StaticIcon from '/src/components/static-icon/static-icon'

import CreateFileModal from './components/create-file-modal/create-file-modal'
import FileFilter from './components/file-filter/file-filter'

import Exceptions from '/src/exceptions/index'
import Modals from '/src/Modals/index'

import { FileEnum } from '/src/enums/index'
import { FileHelper } from '/src/helpers/index'

import { ContextMenuConfig } from '/src/configs/index'

const DefaultPid = '-1'

export default {
  name: 'explorer-workspace',
  props: {
    pid: {
      type: String,
      default: DefaultPid,
    },
  },
  data() {
    return {
      requested: false,
      isFilesFold: true,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
    project() {
      return this.$store.state.workspace.project
    },
    file() {
      return this.$store.state.workspace.file
    },
    openedFiles() {
      return this.$store.state.workspace.openedFiles
    },
    projectFiles() {
      return FileHelper.sort(this.project.files.filter(file => file.mid === '0'))
    },
    fileNameExistException() {
      return this.$store.state.exceptions.codes[Exceptions.FileNameExist]
    },
    createFileModal() {
      return this.$store.state.modals.modals[Modals.Workspace]
    }
  },
  watch:{
    user(user) {
      this.getWorkspace()
    },
    fileNameExistException(exception) {
      console.warn('Exception', exception)
    }
  },
  created() {
    this.getWorkspace()

    // setTimeout(() => {
    //   console.warn('Exception Test')
    //   this.$store.dispatch('exceptions/throw', {
    //     code: Exceptions.SAME_FILE_ERROR,
    //     exception: {
    //       msg: '重复文件错误',
    //     }
    //   })
    // }, 1000)
  },
  methods: {
    getWorkspace() {
      if (this.pid !== DefaultPid) {
        this.requested = true
        this.$store.dispatch('workspace/createWorkspaceAsync', this.pid)

        return
      }

      if (!this.user || this.requested) {
        return
      }

      this.$store.dispatch('workspace/requestWorkspace', this.user.uid).then(() => {
        this.requested = true
      })
    },
    onCreateFile(mid = '0', pid = this.pid) {
      if (!pid) {
        return
      }

      this.$refs.filesFilter.unfold()

      this.$store.dispatch('modals/open', {
        modal: Modals.Workspace,
        value: {
          mid,
          pid,
          type: FileEnum.FileType.File,
        },
      })

      this.$store.dispatch('workspace/createPlaceholderFile', {
        pid,
        mid,
        type: FileEnum.FileType.File,
      })
    },
    onCreateFolder(mid = '0', pid = this.pid) {
      if (!pid) {
        return
      }

      this.$refs.filesFilter.unfold()

      this.$store.dispatch('modals/open', {
        modal: Modals.Workspace,
        value: {
          mid,
          pid,
          type: FileEnum.FileType.Folder,
        },
      })

      this.$store.dispatch('workspace/createPlaceholderFile', {
        pid,
        mid,
        type: FileEnum.FileType.Folder,
      })
    },
    onCreateFileModalClose() {
      this.$store.dispatch('workspace/transformPlaceholderFileToFile')
    },
    onSelect(file) {
      if (FileHelper.isFolder(file)) {
        this.$store.dispatch('workspace/toggleFold', file)

        return
      }

      this.$store.dispatch('workspace/openFile', file)
    },
    onContextMenu(eventOrData) {
      let position = null
      let contextMenuType = ''
      const payload = {
        $store: this.$store,
      }

      if (eventOrData.file) {
        position = {
          top: eventOrData.y + 'px',
          left: eventOrData.x + 'px'
        }

        contextMenuType = FileHelper.isFolder(eventOrData.file) ? 'folder' : 'file'
        payload.pid = eventOrData.file.pid
        payload.mid = eventOrData.file.fid
        payload.file = eventOrData.file
        payload.name = eventOrData.file.name + eventOrData.file.ext
        payload.unfold = eventOrData.unfold
      } else {
        position = {
          top: event.clientY + 'px',
          left: event.clientX + 'px',
        }

        contextMenuType = 'folder'
        payload.pid = this.pid
        payload.mid = '0'
        payload.unfold = () => {
          this.$refs.filesFilter.unfold()
        }
      }

      this.$store.dispatch('modals/open', {
        modal: Modals.ContextMenu,
        value: {
          menuList: ContextMenuConfig.get(contextMenuType, payload),
          position,
        },
      })
    }
  },
  beforeDestroy() {
    if (!this.user) {
      return
    }

    this.$store.dispatch('workspace/saveWorkspace', this.user.uid)
  },
  components: {
    Searcher,
    ProjectPlane,
    Catalogue,
    Icon,
    StaticIcon,

    FileFilter,
    CreateFileModal,
  },
}

</script>

<style lang="scss">
@import '/src/styles/colors';

.explorer-workspace {
  display: flex;
  flex-flow: column;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  user-select: none;
  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0 20px;
    .title {
      color: rgb(177, 178, 183);
    }
  }
  .body {
    flex: 1;
    display: flex;
    flex-flow: column;
    .i-icon {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding: 0 4px;
    }
    .i-icon + .i-icon {
      margin-left: 4px;
    }
  }
}
</style>
