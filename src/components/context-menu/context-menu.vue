<template>
  <div class="modal" v-show="isShow"
    @click.stop="onClose"
    @click.right.stop=""
    @mousedown.right.stop="onClose"
  >
    <div class="menu-list" :style="position">
      <div
        class="menu-item"
        v-for="menuItem in menuList"
        :key="menuItem.name"
        @click="menuItem.fn ? menuItem.fn() : null"
      >
        <div class="left">
          <span class="name">{{ menuItem.name }}</span>
        </div>
        <div class="right" v-if="menuItem.hotKey">{{ menuItem.hotKey }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Modals from '/src/modals/index'

export default {
  name: 'create-file',
  data() {
    return {
      isShow: false,
      menuList: [],
      position: {
        top: 0,
        left: 0,
      }
    }
  },
  computed: {
    contextMenuModal() {
      return this.$store.state.modals.modals[Modals.ContextMenu]
    },
  },
  watch: {
    contextMenuModal(args) {
      if (!args) {
        this.isShow = false
        this.menuList = []
        this.position = {
          y: 0,
          x: 0,
        }

        return
      }

      this.isShow = true
      this.menuList = args.menuList
      this.position = args.position
    }
  },
  methods: {
    onClose() {
      this.$store.dispatch('modals/close', Modals.ContextMenu)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '/static/components-styles/colors';

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  .menu-list {
    position: absolute;
    width: 320px;
    background-color: rgba($context-menu-color, 1);
    box-shadow: 5px 5px 5px rgba($black, .5);
    cursor: pointer;
  }
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25px;
    padding: 0 12px;
    .left {
      display: flex;
      align-items: center;
      .name {
        font-size: 12px;
        color: rgba($font-color, 1);
      }
    }
  }
}
</style>
