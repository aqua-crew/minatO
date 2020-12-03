<template>
  <div class="catalogue-node"
    v-if="isDelete === '0'"
    @click.stop="onClick"
    @click.right.prevent.stop="onContextMenu"
  >
    <source-item
      class="i-source-item"
      :class="{ active: active && active.fid === data.fid, 'icon-active': isFold === '0' }"
      :icon="data.icon"
      :name="data.name + (data.ext ? '.' + data.ext : '')"
      :type="data.type"
    ></source-item>

    <template v-if="files && files.length > 0">
      <div class="content" v-show="isFold === '0'">
        <catalogue-node
          v-for="child in files"
          :key="child.fid"
          :data="child"
          :active="active"
        ></catalogue-node>
      </div>
    </template>
  </div>
</template>

<script>
import SourceItem from '/src/components/source-item/source-item'

import Modals from '/src/Modals/index'
import ContextMenu from '/src/components/context-menu/context-menu.js'

import { FileEnum } from '/src/enums/index'
import { FileHelper } from '/src/helpers/index'

export default {
  name: 'catalogue-node',
  inject: [
    'khala'
  ],
  props: {
    data: Object,
    active: Object,
  },
  computed: {
    isFold() {
      return this.data.status.isFold
    },
    isDelete() {
      return this.data.status.isDelete
    },
    files() {
      return FileHelper.sort(this.$store.state.workspace.project.files.filter(file => file.mid === this.data.fid))
    },
    size() {
      const len = this.data.files.length

      if (len > 10) {
        return 'size-max'
      }
    }
  },
  methods: {
    onClick() {
      this.khala.emit('click', this.data)
    },
    onContextMenu(event) {
      let menuList = [{
        name: this.data.name,
      }]

      if (FileHelper.isFolder(this.data)) {
        menuList.push({
          name: 'Create File',
          fn: () => {
            this.$store.dispatch('workspace/createFileAsync', {
              pid: this.data.pid,
              mid: this.data.fid,
              name: Math.random().toString(36).substring(4),
              ext: 'vue',
              type: FileEnum.FileType.File,
            })
          },
        }, {
          name: 'Create Folder',
          fn: () => {
            this.$store.dispatch('workspace/createFileAsync', {
              pid: this.data.pid,
              mid: this.data.fid,
              name: Math.random().toString(36).substring(4),
              ext: '',
              type: FileEnum.FileType.Folder,
            })
          },
        })
      }

      menuList.push({
        name: 'Delete',
        fn: () => {
          console.warn('Delete file', this.data)
          this.$store.dispatch('workspace/removeFileAsync', this.data)
        }
      })

      this.$store.dispatch('modals/open', {
        layer: Modals.ContextMenu,
        value: {
          menuList,
          position: {
            top: event.clientY + 'px',
            left: event.clientX + 'px',
          },
        },
      })
    }
  },
  components: {
    SourceItem,
  },
}
</script>

<style lang="scss">
@import '/src/styles/colors';

.catalogue-node {
  position: relative;
  .size {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($button-color, .1);
  }
  .i-source-item {
    color: rgba($font-color, .6);
    transition: color .15s ease;
    &:hover {
      color: rgba($white, .9);
    }
  }
  .i-source-item.active {
    color: rgba($aqua, 1);
  }
  .i-source-item.icon-active {
    .icon {
      background-color: rgba($aqua, 1) !important;
    }
  }

  &:hover {
    > .content {
      border-left: 1px solid rgba($font-color, .9) !important;
    }
  }
  .content {
    box-sizing: border-box;
    transition: all .25s ease;
    border-left: 1px solid rgba($font-color, .3);
    padding-left: 6px;
    margin-left: 4px;
  }
}
</style>
