<template>
  <div class="sidebar">
    <div class="upper-part">
      <menu-item
        v-for="menuItem in menuItems"
        class="i-menu-item"
        :class="currentName === menuItem.name ? 'active' : ''"
        :data="menuItem"
        :key="menuItem.name"
        @click.native="change(menuItem.name)"
        ref="menuItems"
      ></menu-item>
    </div>
    <div class="lower-part">
      <menu-item
        :data="setting"
        @click.native="callSetting"
      ></menu-item>
    </div>

  </div>
</template>

<script>
import MenuItem from './components/menu-item/menu-item'

export default {
  name: 'sidebar',
  props: {
    name: {
      type: String,
      default: 'workspace',
    }
  },
  data() {
    return {
      menuItems: [
        {
          name: 'workspace',
          icon: '',
        },
        {
          name: 'projects',
          icon: '',
        },
        {
          name: 'marine',
          icon: '',
        },
        {
          name: 'extensions',
          icon: '',
        },
      ],
      setting: {
        name: 'setting',
        icon: '',
      },
      currentName: this.name,
    }
  },
  methods: {
    change(name = this.currentName) {
      const lastName = this.currentName
      this.currentName = name
      this.$emit('onChange', name, lastName)
    },
    callSetting() {

    }
  },
  components: {
    MenuItem,
  }
}
</script>

<style lang="scss" scoped>
@import '/static/components-styles/colors';

.sidebar {
  flex: 0 0 auto;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  width: 50px;
  overflow: hidden;
  background-color: $side-bar-color;
  position: relative;
  z-index: 1;
  .upper-part {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    .i-menu-item.active {
      transition: all .25s ease-in-out;
      background-color: rgba($button-color, 1);
      color: rgba($white, 1) !important;
    }
  }
  .lower-part {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
  }
}

</style>
