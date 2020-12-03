<template>
  <div class="explorer-marine">
    <div class="header">
      <div class="title">Marine</div>
      <div class="menu-list"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'explorer-marine',
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.explorer-marine {
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
