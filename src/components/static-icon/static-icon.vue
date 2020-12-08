<template>
  <div class="icon">{{ src }}</div>
</template>

<script>
import TypeMap from './typeMap.js'

export default {
  name: 'icon',
  props: {
    type: {
      type: String,
      required: true,
    },
    alt: String,
  },
  computed: {
    src() {
      return this.type
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/static/components-styles/colors';

.icon {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 10px;
  font-weight: 100;
  background-color: rgba($button-color, .25);
  color: rgba($white, 1);
  transition: all .25s ease;
}
</style>
