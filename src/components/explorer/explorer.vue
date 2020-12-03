<template>
  <div class="explorer">
    <transition name="transition-fade">
      <component
        :is="current"
        :pid="pid"
        @onClick="clickDispatcher"
      ></component>
    </transition>
  </div>
</template>

<script>
import ExplorerWorkspace from './components/explorer-workspace/explorer-workspace'
import ExplorerProjects from './components/explorer-projects/explorer-projects'
import ExplorerMarine from './components/explorer-marine/explorer-marine'
import ExplorerExtensions from './components/explorer-extensions/explorer-extensions'

export default {
  name: 'explorer',
  props: {
    explorer: String,
  },
  data() {
    return {
      pid: "-1",
    }
  },
  computed: {
    current() {
      const nameOrComponent = this.explorer

      if (typeof nameOrComponent === 'string') {
        const name = nameOrComponent

        return 'explorer-' + name
      } else {
        const component = nameOrComponent

        return component
      }
    }
  },
  methods: {
    clickDispatcher(source, payload) {
      switch(source) {
        case 'projects':
          this.changeToWorkspace(payload)
      }
    },
    changeToWorkspace(pid) {
      this.$parent.change('workspace')
      this.pid = pid
    },
  },
  components: {
    ExplorerWorkspace,
    ExplorerProjects,
    ExplorerMarine,
    ExplorerExtensions,
  },
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.explorer {
  flex: 0 1 auto;
  position: relative;
  width: 300px;
  overflow: hidden;

  background-color: rgba($main-color, .95);
}

.transition-fade-enter {
  opacity: 0;
  transform: translateX(10%);
}
.transition-fade-enter-active {
  transition: all .25s ease-out;
}
.transition-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.transition-fade-leave {
  opacity: 1;
  transform: translateX(0);
}
.transition-fade-leave-active {
  transition: all .25s ease-in;
}
.transition-fade-leave-to {
  opacity: 0;
  transform: translateX(10%);
}
</style>
