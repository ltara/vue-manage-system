<template>
  <div class="common-table">
    <el-table stripe :data="tableData" height="90%" v-loading="config.loading">
      <el-table-column label="序号" width="85">
        <template v-slot="scope">
          <span style="margin-left: 10px;">{{
            (config.page - 1) * 20 + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-toolist
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 120"
      >
        <template v-slot="scope">
          <span style="margin-left: 10px;">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    handleEdit(row) {
      this.$emit('edit', row)
    },
    handleDelete(row) {
      this.$emit('delete', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-table {
  position: relative;
  height: calc(100% - 62px);
  background-color: #fff;
  .pagination {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }
}
</style>
