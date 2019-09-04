<template>
  <div class="page-container">
    <bread-crumb :title="bredcrumb"></bread-crumb>
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.vin" placeholder="车架号"></el-input>
        </el-form-item>
        <el-form-item>
          <per-button icon="fa fa-search" :label="$t('action.search')" type="primary" @click="findPage(null)"/>
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
     <!--表格树内容栏-->
    <el-table :data="pageResult.content"  max-height="480" stripe size="mini" style="width: 100%;" v-loading="loading" :element-loading-text="$t('action.loading')" :header-cell-style="{'background-color': 'rgb(217, 230, 249)'}">
      <el-table-column prop="vin" header-align="center" align="center" min-width="150" label="车架号" fixed></el-table-column>
      <el-table-column prop="serviceCard" header-align="center" align="center" min-width="150" label="服务卡号" ></el-table-column>
      <el-table-column prop="reportTime" header-align="center" align="center" min-width="150" label="上报时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="dueTime" header-align="center" align="center" min-width="150" label="过期时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="rTotalCount" header-align="center" align="center" min-width="90" label="总次数"></el-table-column>
      <el-table-column prop="rTotalUsed" header-align="center" align="center" min-width="90" label="已使用次数"></el-table-column>
      <el-table-column header-align="center" align="center" min-width="90" label="剩余次数" >
        <template slot-scope="scope">
          {{scope.row.rTotalCount - scope.row.rTotalUsed}}
        </template>
      </el-table-column>
       <el-table-column prop="first" header-align="center" align="center" min-width="90" label="第一年" ></el-table-column>
      <el-table-column prop="second" header-align="center" align="center" min-width="90" label="第二年" ></el-table-column>
      <el-table-column prop="third" header-align="center" align="center" min-width="90" label="第三年" ></el-table-column>
      <el-table-column prop="four" header-align="center" align="center" min-width="90" label="第四年" ></el-table-column>
      <el-table-column prop="five" header-align="center" align="center" min-width="90" label="第五年" ></el-table-column>
      <el-table-column prop="six" header-align="center" align="center" min-width="90" label="第六年" ></el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px;">
      <el-pagination
        layout="total, prev, pager, next, jumper"
        @current-change="refreshPageRequest"
        :current-page="pageRequest.pageNum"
        :page-size="pageRequest.pageSize"
        :total="pageResult.total"
        style="float:right;"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import PerButton from '@/components/PerButton'
import BreadCrumb from '@/components/BreadCrumb'
import moment from 'moment'
export default {
  components: {
    PerButton,
    BreadCrumb
  },
  data () {
    return {
      size: 'medium',
      loading: false,
      filters: {
        vin: ''
      },
      bredcrumb: [{id: 1, title: '首页'}, {id: 2, title: '车辆租赁管理'}, {id: 3, title: '租车使用次数统计'}],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {}
    }
  },
  methods: {
    // 获取分页数据
    findPage (data) {
      this.loading = true
      this.pageRequest.columnFilters = {
        vin: this.filters.vin
      }
      this.$api.count.countRent(this.pageRequest).then(res => {
        console.log('data', res.data)
        this.pageResult = res.data
        this.loading = false
      })
    },
    // 换页刷新
    refreshPageRequest (pageNum) {
      this.pageRequest.pageNum = pageNum
      this.findPage()
    },
    // 时间格式化
    dateFormat (row, column, cellValue, index) {
      if (row[column.property]) {
        return moment(row[column.property]).format('YYYY-MM-DD')
      }
    }
  },
  mounted () {
    this.findPage()
  }
}
</script>

<style scoped>
</style>
