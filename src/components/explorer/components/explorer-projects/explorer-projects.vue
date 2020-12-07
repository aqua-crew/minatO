<template>
  <div class="explorer-projects">
    <div class="header">
      <div class="title">Projects</div>
      <div class="menu-list">
        <icon class="i-icon" type="add" @click.native="onAddProject"></icon>
      </div>
    </div>
    <div class="body">
      <searcher class="searcher-patch"></searcher>
      <div class="project-list">
        <project-plane
          class="project-plane"
          v-for="project in projects"
          :key="project.pid"
          :project="project"
          @click.native="onClickOfProjectPlane(project.pid)"
        ></project-plane>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '/src/components/icon/icon'
import Searcher from '/src/components/searcher/searcher'
import ProjectPlane from '/src/components/project-plane/project-plane'

const randomAvatar = (function() {
  const avatars = [
    require('/src/mock/images/hotaru.jpg'),
    require('/src/mock/images/baabara.jpg'),
    require('/src/mock/images/kure.jpg'),
    require('/src/mock/images/kokusei.jpg'),
  ]

  return function() {
    const seed = parseInt(Math.random() * 4)
    console.log('seed', seed)
    return avatars[seed]
  }
})()

export default {
  name: 'explorer-projects',
  computed: {
    projects() {
      return this.$store.state.projects.projects
    },
  },
  created() {
    this.$store.dispatch('projects/requestProjects')
  },
  methods: {
    onClickOfProjectPlane(pid) {
      this.$emit('onClick', 'projects', pid)
    },
    onAddProject() {
      this.addProject()
    },
    addProject() {
      this.$store.dispatch('projects/createProject', {
        name: Math.random().toString(36).substring(2),
        desc: 'Minato Editor, powered by Aqua',
        avatar: randomAvatar(),
      })
    }
  },
  components: {
    Icon,
    Searcher,
    ProjectPlane,
  }
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.explorer-projects {
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
    flex: 0 0 36px;
    .title {
      margin-left: 20px;
      color: rgba($font-color, 1);
    }
    .menu-list {
      height: 100%;
      .i-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 6px;
      }
    }
  }
  .body {
    display: flex;
    flex-flow: column;
    .searcher-patch {
      flex: 0 0;
      padding: 0 20px 0 18px;
    }
    .project-list {
      display: flex;
      flex-flow: column;
      align-items: center;
      > :first-child {
        margin-top: 10px;
      }
    }
  }
}
</style>
