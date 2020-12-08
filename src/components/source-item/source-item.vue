<template>
  <div class="source-item">
    <div class="left">
      <div class="icon" :class="{ 'hide-icon': type === 0 }"></div>
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'source-item',
  props: {
    icon: String,
    name: String,
    type: Number,
  },
}
</script>

<style lang="scss" scoped>
@import '/static/components-styles/colors';

.source-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    padding: 6px 0;
    user-select: none;
    cursor: pointer;
    .icon {
      width: 6px;
      height: 6px;
      background-color: rgba($font-color, .2);
    }
    .hide-icon {
      height: 1px;
    }
    .name {
      margin-left: 6px;
    }
  }
  .right {

  }
}
</style>
