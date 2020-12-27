<template>
  <transition name="transition-fade">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'animation-fade',
}
</script>

<style lang="scss" scoped>

.transition-fade-enter {
  opacity: 0;
}
.transition-fade-enter-active {
  transition: all .15s ease-out;
}
.transition-fade-enter-to {
  opacity: 1;
}
.transition-fade-leave {
  opacity: 1;
}
.transition-fade-leave-active {
  transition: all .15s ease-in;
}
.transition-fade-leave-to {
  opacity: 0;
}
</style>
