<template>
  <div class="create-file-modal" @click.stop="onClose">

  </div>
</template>

<script>
import Modals from '/src/Modals/index'
import ContextMenu from '/src/components/context-menu/context-menu.js'

export default {
  name: 'create-file-modal',
  props: {

  },
  methods: {
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
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.create-file-modal {

}
</style>
