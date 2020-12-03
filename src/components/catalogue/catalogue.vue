<template>
<div class="catalogue">
  <template v-if="catalogues && catalogues.length > 0">
    <catalogue-node
      v-for="catalogue in catalogues"
      :key="catalogue.fid"
      :data="catalogue"
      :active="active"
    ></catalogue-node>
  </template>
  <template v-if="catalogue">
    <catalogue-node
      :data="catalogue"
      :active="active"
    ></catalogue-node>
  </template>
</div>
</template>

<script>
import CatalogueNode from './components/catalogue-node/catalogue-node'
import { Khala } from '/src/utils/index'

export default {
  name: 'catalogue',
  props: {
    catalogues: Array,
    catalogue: Object,
    active: Object,
  },
  provide() {
    return {
      khala: this.khala,
    }
  },
  beforeCreate() {
    this.khala = new Khala
  },
  created() {
    this.khala.on('click', data => {
      this.$emit('select', data)
    })
  },
  beforeDestroy() {
    this.khala.off('click')
  },
  components: {
    CatalogueNode,
  },
}
</script>

<style lang="scss">
</style>
