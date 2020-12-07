<template>
  <folder class="section section-files"
    :isFold="isIconFold"
    :flexGrow="flexGrow"
    @onChange="onChange"
    ref="folder"
  >
    <template #header>
      <div class="filter filter-files">
        <div class="left">
          <div class="icon" :class="{ 'active-icon': !isIconFold }"></div>
          <div class="name">{{ name }}</div>
        </div>
        <div class="right">
          <slot name="menu"></slot>
        </div>
      </div>
    </template>

    <template #body>
      <div id="deep-layer-mark" class="catalogue-container"
        @mouseenter="showBorder"
        @mouseleave="hideBorder"
      >
        <div :class="isHideLayerMarker ? 'hide-layer-mark' : 'show-layer-mark'">
          <slot name="catalogue"></slot>
        </div>
      </div>
    </template>
  </folder>
</template>

<script>
import Folder from '/src/components/folder/folder'

export default {
  name: 'file-filter',
  props: {
    name: String,
    files: [],
    isFold: {
      type: Boolean,
      default: true,
    },
    flexGrow: String,
  },
  data() {
    return {
      isIconFold: this.isFold,
      isHideLayerMarker: false,
    }
  },
  methods: {
    showBorder() {
      this.isHideLayerMarker = false
    },
    hideBorder() {
      this.isHideLayerMarker = true
    },
    onChange(isFold) {
      this.isIconFold = isFold
    },
    fold() {
      this.isIconFold = true
      this.$refs.folder.fold()
    },
    unfold() {
      this.isIconFold = false
      this.$refs.folder.unfold()
    },
  },
  components: {
    Folder,
  },
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.active-icon {
  transform: rotate(90deg);
}

.section {
  flex: 1;
}
.section-files {
  .filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    color: rgba($white, .6);
    font-weight: bold;
    border-top: 1px solid $side-bar-color;
    border-bottom: 1px solid $side-bar-color;
    .left {
      display: flex;
      align-items: center;
      padding-left: 8px;
      .icon {
        // transform: rotate(0);
        border-left: 6px solid rgba($white, .6);
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-right: transparent;
      }
      .name {
        margin-left: 6px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  .filter-files {

  }
  .catalogue-container {
    padding: 0 20px;
  }
  #deep-layer-mark {
    .show-layer-mark {
      .content {
        border-left: 1px solid rgba($font-color, .3);
      }
    }
    .hide-layer-mark {
      .content {
        border-left: 1px solid rgba($font-color, 0);
      }
    }
  }
}
</style>
