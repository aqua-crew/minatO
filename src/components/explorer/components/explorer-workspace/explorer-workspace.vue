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
          <template #catalogue>
            <catalogue
              :catalogues="openedFiles"
              :active="file"
              @select="onSelect"
            ></catalogue>
          </template>
        </file-filter>

        <file-filter
          name="Files"
          flexGrow="2"
        >
          <template #menu>
            <icon class="i-icon" type="add" @click.native.stop="onCreateFile()"></icon>
          </template>
          <template #catalogue>
            <catalogue
              :catalogues="projectFiles"
              :active="file"
              @select="onSelect"
            ></catalogue>
          </template>
        </file-filter>
      </div>
    </template>
  </div>
</template>

<script>
import Searcher from '/src/components/searcher/searcher'
import ProjectPlane from '/src/components/project-plane/project-plane'
import Catalogue from '/src/components/catalogue/catalogue'
import Icon from '/src/components/icon/icon'

import FileFilter from './components/file-filter/file-filter'

import Exceptions from '/src/exceptions/index'
import Modals from '/src/Modals/index'
import ContextMenu from '/src/components/context-menu/context-menu.js'

import { FileEnum } from '/src/enums/index'
import { FileHelper } from '/src/helpers/index'

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
      return this.$store.state.modals.layer
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

      const type = parseInt(Math.random() * 2) === 0 ? FileEnum.FileType.Folder : FileEnum.FileType.File
      this.$store.dispatch('workspace/createFileAsync', {
        pid,
        mid,
        name: Math.random().toString(36).substring(4),
        ext: type === 0 ? 'vue' : '',
        type,
      })
    },
    onSelect(file) {
      if (FileHelper.isFolder(file)) {
        this.$store.dispatch('workspace/toggleFold', file)

        return
      }

      this.$store.dispatch('workspace/openFile', file)
    },
    onContextMenu(event) {
      this.$store.dispatch('modals/open', {
        layer: Modals.ContextMenu,
        value: {
          menuList: ContextMenu.project,
          position: {
            top: event.clientY + 'px',
            left: event.clientX + 'px',
          },
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

    FileFilter,
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
  }
}
</style>
