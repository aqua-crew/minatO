<template>
  <div class="explorer-extensions">
    <div class="header">
      <div class="title">Extensions</div>
      <div class="menu-list"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'explorer-extensions',
}
</script>

<style lang="scss" scoped>
@import '/static/components-styles/colors';

.explorer-extensions {
  display: flex;
  flex-flow: column;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0 20px;
    .title {
      color: rgb(177, 178, 183);
    }
  }
}
</style>
