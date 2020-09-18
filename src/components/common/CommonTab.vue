<template>
  <div class="tabs">
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    // 获取标签状态
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  methods: {
    // 获取关闭标签事件
    ...mapMutations({
      close: 'closeTab'
    }),
    handleClose(tag) {
      this.close(tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background-color: #ddd;
  padding: 10px;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
}
</style>
