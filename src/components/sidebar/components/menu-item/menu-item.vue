<template>
  <div class="menu-item">
    <div class="wrap">
      <img class="icon"
        v-show="data.icon.length > 0"
        :src="data.icon"
        :alt="data.name"
      >
      <span class="placeholder">{{ name }}</span>
    </div>
  </div>
</template>

<script>
import { Ayarin } from '/src/utils/index'

export default {
  name: 'menu-item',
  props: {
    data: Object,
  },
  computed: {
    name() {
      return Ayarin.capitalize(this.data.name)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.menu-item {
  position: relative;
  width: 100%;
  padding-top: 100%;
  cursor: pointer;
  user-select: none;
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .icon {
      width: 100%;
      height: 100%;
    }
  }
}

/* Temp */
.placeholder {
  font-size: 10px;
  font-family: Consolas;
  color: rgba($font-color, .8);;
}
</style>
