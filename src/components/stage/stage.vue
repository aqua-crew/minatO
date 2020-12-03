<template>
  <div class="stage">
    <div class="wrap" v-show="openedFiles.length > 0">
      <tabs
        :tabs="openedFiles"
        :currentTab="file"
        @onChange="onChange"
        @onClose="onClose"
      ></tabs>

      <div class="assets">
        <editor
          ref="editor"
          :file="fileAndContent"
          @onDocChange="onDocChange"
        ></editor>
      </div>
    </div>

    <user-space v-show="openedFiles.length <= 0"></user-space>
  </div>
</template>

<script>
import Tabs from '/src/components/tabs/tabs'
import Editor from '/src/components/editor/editor'
import UserSpace from '/src/components/user-space/user-space'

import { FileHelper } from '/src/helpers/index'
import { content } from '../../../../aQua/src/options'

export default {
  name: 'stage',
  data() {
    return {
      fileAndContent: null,
    }
  },
  computed: {
    openedFiles() {
      return this.$store.state.workspace.openedFiles
    },
    file() {
      return this.$store.state.workspace.file
    },
  },
  watch: {
    file(file, lastFile) {
      if (!file) {
        this.fileAndContent = null

        return
      }

      if (FileHelper.isFolder(file)) {
        return
      }

      const lastFileFid = lastFile ? lastFile.fid : NaN

      if (file.fid === lastFileFid) {
        return
      }

      this.saveContent()

      const curFid = file.fid
      this.$store.dispatch('workspace/getContent', file).then(info => {
        this.handleInfo(info)
        if (this.file.fid === curFid) {
          console.warn('Set FileContent', info.content)
          this.fileAndContent = info
        }
      })
    }
  },
  methods: {
    onChange(file) {
      if (file.fid === this.file.fid) {
        return
      }

      this.$store.dispatch('workspace/openFile', file)
    },
    onClose(file) {
      this.$store.dispatch('workspace/closeFile', file)
    },
    onDocChange() {

    },
    saveContent() {
      const editor = this.$refs.editor
      const info = editor.getEditorInfo()

      if (!info) {
        return
      }

      this.$store.dispatch('workspace/saveContent', info)
    },
    handleInfo(info) {
      if (info.content === '') {
        return info
      }

      info.content = JSON.parse(info.content)
      return info
    }
  },
  components: {
    Tabs,
    Editor,
    UserSpace,
  }
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.stage {
  flex: 1 1 auto;
  display: flex;
  flex-flow: column;
  min-width: 500px;
  .wrap {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
  }
}
.assets {
  flex: 1 1 auto;

  background-color: rgba(255, 255, 255, 1);
}
</style>
