<template>
  <!-- <img class="icon" :src="src" :alt="alt"> -->
  <div class="icon">{{ src }}</div>
</template>

<script>
import TypeMap from './typeMap.js'

const TempTypeMap = {
  'add': 'add',
  'close': 'close',
}

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
      return TempTypeMap[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.icon {
  display: inline-block;
  cursor: pointer;
}
</style>
