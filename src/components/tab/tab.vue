<template>
  <div class="tab">
    <div class="left">
      <img :src="icon">
      <span>{{ title }}</span>
    </div>
    <div class="right" @click.stop="close">
      <icon class="i-icon" type="close"></icon>
    </div>
  </div>
</template>

<script>
import Icon from '/src/components/icon/icon'

const DefaultIconSrc = ''

export default {
  name: 'tab',
  props: {
    tab: Object,
  },
  computed: {
    icon() {
      return this.tab.icon || DefaultIconSrc
    },
    title() {
      const ext = this.tab.ext.length > 0 ? '.' + this.tab.ext : ''

      return this.tab.name + ext
    },
  },
  methods: {
    close() {
      this.$emit('onClose', this.tab)
    },
  },
  components: {
    Icon,
  }
}
</script>

<style lang="scss" scoped>
@import '/static/components-styles/colors';

.tab {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-width: 100px;
  box-sizing: border-box;
  white-space: nowrap;
  background-color: rgba(white, .1);
  color: rgba($font-color, 1);
  font-size: 12px;
  font-family: Consolas;
  cursor: pointer;
  user-select: none;
  .left {
    flex: 0 1 auto;
    padding-left: 12px;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .right {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    margin-left: 24px;
    .i-icon {
      height: 100%;
      padding: 0 6px;
    }
  }
}
</style>
