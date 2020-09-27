<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '编辑用户'"
      :visible.sync="isShow"
    >
      <common-form :formLabel="operateFormLabel" :form="operateForm">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </common-form>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @delete="deleteUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/common/CommonForm.vue'
import CommonTable from '../../components/common/CommonTable.vue'
export default {
  data() {
    return {
      isShow: false,
      operateType: 'add',
      searchForm: {
        keyword: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: ''
        }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      },
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sex',
          label: '性别',
          type: 'radio',
          radio: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          prop: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          prop: 'addr',
          label: '地址'
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期'
        },
        {
          prop: 'addr',
          label: '地址'
        }
      ]
    }
  },
  components: {
    CommonForm,
    CommonTable
  },
  created() {
    this.getList()
  },
  methods: {
    addUser() {
      this.isShow = true
      this.operateType = 'add'
    },
    getList() {
      this.config.loading = true
      this.$http
        .get('/api/user/getUser', {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex === 0 ? '女' : '男'
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
        })
    },
    editUser(row) {
      row.sex = row.sex === '男' ? 1 : 0
      this.operateForm = row
      this.operateType = 'edit'
      this.isShow = true
    },
    deleteUser(row) {
      this.$confirm('确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .get('/api/user/del', {
              params: {
                id: row.id
              }
            })
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            })
        })
        .catch(res => {
          console.log(res)
        })
    },
    onSubmit() {
      if (this.operateType === 'edit') {
        this.$http.post('/api/user/edit', this.operateForm).then(() => {
          this.isShow = false
          this.getList()
        })
      } else {
        console.log('不是编辑操作')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
</style>
