<template>
  <div class="user-space">
    <span class="default">Empty now</span>
  </div>
</template>

<script>
export default {
  name: 'user-space',
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.user-space {
  flex: 1;
  display: flex;
  background-color: rgba($main-color, 1);
  /* Temp */
  .default {
    color: rgba(white, .7);
  }
}


</style>
