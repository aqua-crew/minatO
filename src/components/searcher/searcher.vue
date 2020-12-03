<template>
  <div class="searcher">
    <input class="inputer" v-model="keyword" type="text" placeholder="Search Project">
  </div>
</template>

<script>
export default {
  name: 'searcher',
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    search() {
      this.$emit('onSearch', this.keyword)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '/src/styles/colors';

.searcher {
  display: flex;
  .inputer {
    flex: 1;
    padding: 6px 14px;
    background-color: rgba($main-color, .4);
    color: rgba($white, .8);
    caret-color: rgba($cursor-color, 1);
    font-size: 12px;
  }
}
</style>
