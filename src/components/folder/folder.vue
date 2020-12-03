<template>
<div class="folder" :style="{ flex: flexGrow_ }">
  <div class="header" @click="toggleFold">
    <slot name="header"></slot>
  </div>

  <div class="body" :class="{ fold: fold_ }">
    <slot name="body"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'folder',
  props: {
    isFold: {
      type: Boolean,
      default: true,
    },
    flexGrow: {
      type: String,
      default: '1',
    }
  },
  data() {
    return {
      fold_: this.isFold,
      flexGrow_: this.isFold ? '0' : this.flexGrow,
    }
  },
  methods: {
    toggleFold() {
      this.fold_ = !this.fold_
      this.onFold()
      this.$emit('onChange', this.fold_)
    },
    onFold() {
      this.flexGrow_ = this.fold_ ? '0' : this.flexGrow
    },
  },
}
</script>

<style lang="scss" scoped>
.folder {
  transition: all .25s ease-out;
  .header {
    position: relative;
    z-index: 1;
    cursor: pointer;
  }
  .body {
    opacity: 1;
    transition: all .25s ease;
    overflow: hidden;
  }
  .fold {
    max-height: 0;
    opacity: 0;
  }
}
</style>
