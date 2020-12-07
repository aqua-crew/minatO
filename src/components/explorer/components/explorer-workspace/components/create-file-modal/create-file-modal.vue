<template>
  <div class="create-file-modal" @click.stop="onClose"></div>
</template>

<script>
import Modals from '/src/Modals/index'

export default {
  name: 'create-file-modal',
  methods: {
    onClose() {
      this.$store.dispatch('modals/close', Modals.Workspace)
      this.$emit('onClose')
    }
  },
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.create-file-modal {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba($modal-color, .6);
}
</style>
