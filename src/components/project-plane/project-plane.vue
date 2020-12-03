<template>
  <div class="project-plane" @click.right.prevent.stop="onContextMenu">
    <div class="avatar-container">
      <img class="avatar" :src="project.avatar" :alt="project.name">
    </div>
    <div class="info">
      <div class="name">{{ project.name }}</div>
      <div class="desc">{{ project.desc }}</div>
    </div>
  </div>
</template>

<script>
import Modals from '/src/Modals/index'
import ContextMenu from '/src/components/context-menu/context-menu.js'

export default {
  name: 'project-plane',
  props: {
    project: Object,
  },
  methods: {
    onContextMenu(event) {
      this.$store.dispatch('modals/open', {
        layer: Modals.ContextMenu,
        value: {
          menuList: ContextMenu.project,
          position: {
            top: event.clientY + 'px',
            left: event.clientX + 'px',
          },
        },
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.project-plane {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 20px;
  width: 100%;
  height: 74px;
  user-select: none;
  background-color: rgba($white, 0);
  transition: background-color .25s ease;
  &:hover {
    background-color: rgba($white, .1);
  }
  cursor: pointer;
  .avatar-container {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 4px solid rgba($white, .3);
    }
  }
  .info {
    height: 100%;
    flex: 1;
    margin-left: 10px;
    padding: 2px 0;
    box-sizing: border-box;
    .name {
      font-size: 12px;
      font-weight: bold;
      color: rgba($white, 1);
    }
    .desc {
      margin-top: 6px;
      max-height: 24px;
      color: rgba($font-color, 1);
      overflow: hidden;
    }
  }
}
</style>
