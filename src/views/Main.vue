<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tab></common-tab>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonAside from '@/components/common/CommonAside.vue'
import CommonTab from '@/components/common/CommonTab.vue'
export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTab
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
