<template>
  <div class="root">
    <template v-if="data.fid === '-1'">
      <div class="placeholder-file">
        <div class="icon"></div>
        <input class="inputer" type="text" v-model="fileFullName" ref="inputer">
      </div>
    </template>
    <template v-else>
      <div class="catalogue-node"
        v-if="isDelete === '0'"
        @click.stop="onClick"
        @click.right.prevent.stop="onContextMenu"
      >
        <source-item
          class="i-source-item"
          :class="{ active: active && active.fid === data.fid, 'icon-active': data.status.isFold === '0' }"
          :icon="data.icon"
          :name="data.name + (data.ext ? '.' + data.ext : '')"
          :type="data.type"
        ></source-item>

        <template v-if="files && files.length > 0">
          <div class="content" v-show="data.status.isFold === '0'">
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
  </div>
</template>

<script>
import SourceItem from '/src/components/source-item/source-item'

import Modals from '/src/Modals/index'

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
  data() {
    return {
      fileFullName: '',
    }
  },
  computed: {
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
  mounted() {
    if (FileHelper.isPlaceholder(this.data)) {
      this.$refs.inputer.focus()
    }
  },
  watch: {
    fileFullName(fullName) {
      this.$store.dispatch('workspace/setPlaceholderFileInfo', FileHelper.getNameAndExt(fullName))
    }
  },
  methods: {
    onClick() {
      this.khala.emit('onClick', this.data)
    },
    onContextMenu(event) {
      this.khala.emit('onContextMenu', {
        y: event.clientY,
        x: event.clientX,
        file: this.data,
        unfold: () => {
          this.$store.dispatch('workspace/unfoldFile', this.data)
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

.placeholder-file {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 24px;
  .icon {
    width: 6px;
    height: 6px;
    background-color: rgba($font-color, .7);
  }
  .inputer {
    height: 100%;
    margin-left: 6px;
    color: rgba($aqua, 1);
    background-color: rgba($aqua, 0);
  }
}
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
