<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <per-button icon="fa fa-search" :label="$t('action.search')" type="primary" @click="findPage(null)"/>
        </el-form-item>
        <el-form-item>
          <per-button icon="fa fa-plus" :label="$t('action.add')" type="primary" @click="handleAdd"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <el-form :inline="true" :size="size">
        <el-form-item>
          <el-button-group>
            <el-tooltip content="刷新" placement="top">
              <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <per-table
      :data="pageResult"
      :columns="columns"
      @findPage="findPage"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    ></per-table>
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'"  width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false" >
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size" label-position="right">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="type">
          <el-input v-model="dataForm.type" auto-complete="off" :disabled="!operation"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading" >{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PerTable from '@/components/PerTable'
import PerButton from '@/components/PerButton'
import moment from 'moment'
export default {
  components: {
    PerTable,
    PerButton
  },
  data () {
    return {
      size: 'small',
      filters: {
        name: ''
      },
      columns: [],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},

      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      dataFormRules: {
        name: [{ required: true, message: '请输名称', trigger: 'blur' }]
      },
      // 新增编辑界面数据
      dataForm: {
        id: '',
        type: '',
        name: ''
      }
    }
  },
  methods: {
    // 获取分页数据
    findPage (data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest
      }
      this.pageRequest.columnFilters = {
        name: this.filters.name
      }
      this.$api.types.findPage(this.pageRequest).then(res => {
        console.log('type:', res.data)
        this.pageResult = res.data
      }).then(data != null ? data.callback : '')
        .catch(err => {
          this.$message({ message: err, type: 'error' })
        })
    },
    // 批量删除
    handleDelete (data) {
      this.$api.types.batchDelete(data.params).then(data != null ? data.callback : '').catch(err => {
        this.$message({message: err, type: 'error'})
      })
    },
    // 显示新增界面
    handleAdd () {
      this.dialogVisible = true
      this.operation = true
      this.dataForm = {
        id: '',
        type: '',
        name: ''
      }
    },
    // 显示编辑界面
    handleEdit (params) {
      this.dialogVisible = true
      this.operation = false
      this.dataForm = Object.assign({}, params.row)
    },
    // 编辑
    submitForm () {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let create = {}
            let user = sessionStorage.getItem('userInfo')
            let paramsInfo = JSON.parse(sessionStorage.getItem('paramsInfo'))
            create.createBy = (paramsInfo && paramsInfo.agentName) ? paramsInfo.agentName : user
            let params = Object.assign(create, this.dataForm)
            this.$api.types.save(params).then(res => {
              this.editLoading = false
              if (res.code === 200) {
                this.$message({ message: '操作成功', type: 'success' })
                this.dialogVisible = false
                this.$refs['dataForm'].resetFields()
              } else {
                this.$message({
                  message: '操作失败, ' + res.msg,
                  type: 'error'
                })
              }
              this.findPage(null)
            })
          })
        }
      })
    },
    // 时间格式化
    dateFormat (row, column, cellValue, index) {
      if (row[column.property]) {
        return moment(row[column.property]).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    // 处理表格列过滤显示
    initColumns () {
      this.columns = [
        { prop: 'id', label: 'ID', minWidth: 50 },
        { prop: 'type', label: '值', minWidth: 50 },
        { prop: 'name', label: '名称', minWidth: 120 },
        { prop: 'createBy', label: '创建人', minWidth: 120 },
        { prop: 'createTime', label: '创建时间', minWidth: 120, formatter: this.dateFormat }
      ]
    }
  },
  mounted () {
    this.initColumns()
  }
}
</script>

<style scoped>
</style>
