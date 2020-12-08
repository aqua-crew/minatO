<template>
  <div class="user-space">
    <div class="quotation left-quotation">“</div>
    <div class="center-wrap">
      <div class="info">
        <div class="bg">404</div>
        <div class="fore">work-in-progress</div>
      </div>
    </div>
    <div class="quotation right-quotation">”</div>
  </div>
</template>

<script>
import StaticIcon from '/src/components/static-icon/static-icon'
import ProjectPlane from '/src/components/project-plane/project-plane'

export default {
  name: 'user-space',
  computed: {
    project() {
      return this.$store.state.workspace.project
    }
  },
  components: {
    StaticIcon,
    ProjectPlane,
  }
}
</script>

<style lang="scss" scoped>
@import '/static/components-styles/colors';

.user-space {
  flex: 1;
  background-color: rgba($main-color, 1);
  position: relative;
  vertical-align: middle;
  text-align: center;
  overflow: hidden;
  user-select: none;
  &::after {
    content: '';
    display: inline-block;
    height: 120%;
    width: 0;
    vertical-align: middle;
  }

  .quotation {
    position: absolute;
    display: flex;
    align-items: center;
    font-family: Arial;
    font-size: 256px;
    line-height: 1;
    color: rgba($aqua, .5);
  }
  .left-quotation {
    top: -30px + 14;
    left: -12px + 14;
    &::after {
      content: 'user-space now is building';
      white-space: pre;
      position: absolute;
      bottom: 154px;
      left: 10px;
      font-size: 10px;
    }
  }
  .right-quotation {
    right: -12px + 14px;
    bottom: -165px + 14px;
  }
  .center-wrap {
    display: inline-block;
    vertical-align: middle;
  }
  .info {
    position: relative;
    display: flex;
    justify-content: center;
    font-size: 200px;
    .bg {
      color: rgba($font-color, 1);
    }
    .fore {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 104px;
      white-space: pre;
      background-color: rgba($main-color, 1);
      color: rgba($font-color, 1);
      font-size: 14px;
    }
  }
}

</style>
