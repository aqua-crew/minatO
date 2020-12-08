<template>
  <div id="app" class="minato">
    <div class="global-components">
      <context-menu></context-menu>
    </div>

    <div class="header">
      <div class="app-sign">
        <div class="logo"></div>
        <div class="name">minato</div>
      </div>
    </div>
    <div class="body">
      <sidebar
        @onChange="change"
        :name="currentExplorer"
      ></sidebar>

      <transition name="explorer-fade">
        <explorer
          v-show="isShowExplorer"
          :explorer="currentExplorer"
          key="exloprer"
        ></explorer>
      </transition>

      <stage></stage>

      <activity
        v-show="isShowActivity"
      ></activity>
    </div>
    <div class="footer">
      <static-icon class="i-static-icon" :type="env"></static-icon>
      <static-icon class="i-static-icon" :type="'v' + version"></static-icon>
      <!-- <clock> -->
    </div>
  </div>
</template>

<script>
import Sidebar from '/src/components/sidebar/sidebar'
import Explorer from '/src/components/explorer/explorer'
import Stage from '/src/components/stage/stage'
import Activity from '/src/components/activity/activity'
import ContextMenu from '/src/components/context-menu/context-menu'
import StaticIcon from '/src/components/static-icon/static-icon'

export default {
  data() {
    return {
      currentExplorer: 'workspace',
      currentProject: null,
      isShowExplorer: true,
      isShowActivity: true,

      env: process.env.NODE_ENV,
      version: '0.1',
    }
  },
  created() {
    window.onbeforeunload = () => {
      this.$khala.emit('pageUnload')

      return 'Ayarin'
    }

    this.$global.enterTime = new Date().getTime()

    this.login()
  },
  methods: {
    change(name) {
      if (this.currentExplorer === name && this.isShowExplorer) {
        this.isShowExplorer = false

        return
      }

      this.isShowExplorer = true
      this.currentExplorer = name
    },
    login() {
      this.$store.dispatch('user/loginAsync', {
        username: 'ayarin',
        password: 'qwerty',
      })
    }
  },
  components: {
    Sidebar,
    Explorer,
    Stage,
    Activity,
    ContextMenu,
    StaticIcon,
  }
}
</script>

<style lang="scss" scoped>
@import '/static/components-styles/colors';

.minato {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
}
.header {
  flex: 0 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  background-color: rgba($main-color, .85);
  .app-sign {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 12px;
    .name {
      color: rgba(118, 218, 255, 1);
      font-size: 13px;
      font-weight: bold;
    }
  }
}
.body {
  flex: 1;
  display: flex;
}
.footer {
  font-size: 0;
  flex: 0 0 40px;

  background-color: rgba($main-color, .9);
  .i-static-icon {
    padding: 0 12px;
    height: 100%;
    cursor: default;
  }
  > .i-static-icon + .i-static-icon {
    margin-left: 2px;
  }
}

.explorer-fade-enter {
  width: 0;
}
.explorer-fade-enter-active {
  transition: all .25s ease-in-out;
}
.explorer-fade-enter-to {
  width: 300px;
}
.explorer-fade-leave {
  width: 300px;
}
.explorer-fade-leave-active {
  transition: all .25s ease-in-out;
}
.explorer-fade-leave-to {
  width: 0;
}

.global-components {
  position: absolute;
}
</style>
