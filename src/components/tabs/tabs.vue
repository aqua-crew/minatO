<template>
  <div class="tabs">
    <div class="tab-list">
      <tab
        class="i-tab"
        v-for="tab in tabs"
        :key="tab.fid"
        :class="{ active: currentTab && (currentTab.fid === tab.fid) }"
        :tab="tab"
        @click.native="change(tab)"
        @onClose="close"
      ></tab>
    </div>
  </div>
</template>

<script>
import Tab from '../tab/tab'

export default {
  name: 'tabs',
  props: {
    tabs: Array,
    currentTab: Object,
  },
  methods: {
    change(tab) {
      this.$emit('onChange', tab)
    },
    close(tab) {
      this.$emit('onClose', tab)
    }
  },
  components: {
    Tab,
  }
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.tabs {
  flex: 0 0 36px;
  position: relative;
  overflow: hidden;
  .tab-list {
    display: flex;
    flex: 1;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  background-color: rgba($main-color, 1);
  .i-tab + .i-tab {
    margin-left: 1px;
  }
  .i-tab.active {
    background-color: rgba($white, .25)
  }
}
</style>
