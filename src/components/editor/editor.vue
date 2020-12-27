<template>
  <div id="editor" class="editor" ref="editor"></div>
</template>

<script>
import Aqua from '../../../../aQua/index'
import { aqua } from '../../../../aQua/src/ui'
import aquaConfig from './aqua.config'

export default {
  name: 'editor',
  props: {
    file: Object,
  },
  data() {
    return {

    }
  },
  mounted() {
    // this.init({
    //   el: this.$refs.editor,
    //   ...aquaConfig,
    // })
  },
  watch: {
    file(file) {
      if (!file) {
        return
      }

      this.load(file.content)
    }
  },
  methods: {
    init(config = {}) {
      this.aqua = new Aqua(config)
    },
    onDocChange() {
      console.warn('Aqua Doc Changed')
    },
    getEditorInfo() {
      if (!this.file) {
        return null
      }

      return {
        cid: this.file.cid,
        content: JSON.stringify(this.aqua.extract()),
      }
    },

    load(content) {
      this.init({
        el: this.$refs.editor,
        ...aquaConfig,
      })

      const load_ = (content) => {
        this.aqua.rebuild(content)
        this.aqua.inputer.focus() // 保证切换后的输入法能够直接起作用
      }

      load_(content)
      this.load = load_
    }
  }
}
</script>

<style lang="scss">
@import './aqua.scss';
@import '/static/components-styles/colors';

.editor {
  height: 100%;
  background-color: inherit;
}
</style>
