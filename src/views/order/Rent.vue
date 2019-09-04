<template>
  <div class="page-container">
    <bread-crumb :title="bredcrumb"></bread-crumb>
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" ref="filters" :size="size">
        <el-form-item prop="orderType">
          <el-select v-model="filters.orderType" placeholder="来源">
            <el-option v-for="item in orderType" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="vin">
          <el-input v-model="filters.vin" placeholder="车架号"></el-input>
        </el-form-item>
        <el-form-item prop="serviceCard">
          <el-input v-model="filters.serviceCard" placeholder="服务卡号"></el-input>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input v-model="filters.userName" placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="filters.phone" placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item prop="serviceProvider">
          <el-input v-model="filters.serviceProvider" placeholder="服务商"></el-input>
        </el-form-item>
        <el-form-item prop="isOrder">
          <el-select v-model="filters.isOrder" placeholder="是否已下单" style="width: 160px;">
            <el-option v-for="item in whetherList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="orderNo">
          <el-input v-model="filters.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item prop="completed">
          <el-select v-model="filters.completed" placeholder="服务是否完成" style="width: 160px;">
            <el-option v-for="item in whetherList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="state">
          <el-select v-model="filters.state" placeholder="订单状态" style="width: 160px;">
            <el-option v-for="item in orderList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="rentCity">
          <el-input v-model="filters.rentCity" placeholder="租车城市"></el-input>
        </el-form-item>
        <el-form-item prop="beginTime">
          <el-date-picker v-model="filters.beginTime" type="datetimerange" start-placeholder="取车时间" end-placeholder="取车时间" style="max-width: 340px;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="endTime">
          <el-date-picker v-model="filters.endTime" type="datetimerange" start-placeholder="还车时间" end-placeholder="还车时间" style="max-width: 340px;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="orderTime">
          <el-date-picker v-model="filters.orderTime" type="datetimerange" start-placeholder="下单开始时间" end-placeholder="下单结束时间" style="max-width: 340px;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="reportTime">
          <el-date-picker v-model="filters.reportTime" type="datetimerange" start-placeholder="上报开始时间" end-placeholder="上报结束时间" style="max-width: 340px;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <per-button icon="fa fa-search" :label="$t('action.search')" type="primary" @click="findPage({pageNum: 1, pageSize: 10})"/>
        </el-form-item>
        <el-form-item>
          <per-button icon="fa fa-eraser" :label="$t('action.reset')" type="primary" @click="reset"/>
        </el-form-item>
        <el-form-item>
           <el-button size="mini" type="success" icon="fa fa-cloud-download " @click="exportExcel" >导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格树内容栏-->
    <el-table :data="pageResult.content"  max-height="500" stripe size="mini" style="width: 100%;" v-loading="loading" :element-loading-text="$t('action.loading')" :header-cell-style="{'background-color': 'rgb(217, 230, 249)'}">
      <el-table-column prop="orderNo" header-align="center" align="center" min-width="150" label="订单号" ></el-table-column>
      <el-table-column prop="orderType" header-align="center" align="center" min-width="100" label="下单渠道" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.orderType === 1" size="small">人工</el-tag>
          <el-tag v-else-if="scope.row.orderType === 2" size="small" type="success">微信</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="user.vin" header-align="center" align="center" min-width="150" label="车架号" fixed></el-table-column>
      <el-table-column prop="user.serviceCard" header-align="center" align="center" min-width="120" label="服务卡号" ></el-table-column>
      <el-table-column prop="user.reportTime" header-align="center" align="center" min-width="150" label="上报时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="beginTime" header-align="center" align="center" min-width="150" label="取车时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="endTime" header-align="center" align="center" min-width="150" label="还车时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="user.userName" header-align="center" align="center" min-width="120" label="车主姓名"></el-table-column>
      <el-table-column prop="user.carType" header-align="center" align="center" min-width="120" label="车型" ></el-table-column>
      <el-table-column prop="callTime" header-align="center" align="center" min-width="150" label="来电时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="userName" header-align="center" align="center" min-width="120" label="用户名称"></el-table-column>
      <el-table-column prop="userTel" header-align="center" align="center" min-width="120" label="用户电话"></el-table-column>
      <el-table-column prop="idNo" header-align="center" align="center" min-width="120" label="身份证号码"></el-table-column>
      <el-table-column prop="driverNo" header-align="center" align="center" min-width="120" label="驾驶证号码"></el-table-column>
      <el-table-column prop="openId" header-align="center" align="center" min-width="150" label="openId"></el-table-column>
      <el-table-column prop="isCredit" header-align="center" align="center" min-width="100" label="是否有信用卡" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isCredit === 1" size="small">是</el-tag>
          <el-tag v-else-if="scope.row.isCredit === 2" size="small" type="success">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="rentCity" header-align="center" align="center" min-width="150" label="租车城市" ></el-table-column>
      <el-table-column prop="userAddr" header-align="center" align="center" min-width="150" label="用户地址" ></el-table-column>
      <el-table-column prop="appointmentTime" header-align="center" align="center" min-width="150" label="预约时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="orderCarType" header-align="center" align="center" min-width="150" label="预约车型" ></el-table-column>
      <el-table-column prop="storeName" header-align="center" align="center" min-width="180" label="取车门店名称" ></el-table-column>
      <el-table-column prop="storeAddr" header-align="center" align="center" min-width="300" label="取车门店地址"></el-table-column>
      <el-table-column prop="duration" header-align="center" align="center" min-width="150" label="租车时长/天" ></el-table-column>
      <el-table-column prop="returnName" header-align="center" align="center" min-width="150" label="还车门店名称" ></el-table-column>
      <el-table-column prop="dealerAddr" header-align="center" align="center" min-width="300" label="还车门店地址"></el-table-column>
      <el-table-column prop="serviceProvider" header-align="center" align="center" min-width="150" label="服务商"></el-table-column>
      <el-table-column prop="actualCar" header-align="center" align="center" min-width="150" label="实际用车"></el-table-column>
      <el-table-column prop="isReplace" header-align="center" align="center" label="无车型是否同意更换" min-width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isReplace === 1" size="small">同意</el-tag>
          <el-tag v-else-if="scope.row.isReplace === 2" size="small" type="success">不同意</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isOrder" header-align="center" align="center" label="是否已下单" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isOrder === 1" size="small">是</el-tag>
          <el-tag v-else-if="scope.row.isOrder === 2" size="small" type="success">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderTime" header-align="center" align="center" min-width="150" label="下单时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="completed" header-align="center" align="center" label="服务是否完成" min-width="120">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.completed === 1" size="small">是</el-tag>
          <el-tag v-else-if="scope.row.completed === 2" size="small" type="success">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="expectMoney" header-align="center" align="center" min-width="120" label="预计金额"></el-table-column>
      <el-table-column prop="realityMoney" header-align="center" align="center" min-width="150" label="实际金额"></el-table-column>
      <el-table-column prop="state" header-align="center" align="center" label="订单状态" min-width="100" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state === 1" size="small">已下单</el-tag>
          <el-tag v-else-if="scope.row.state === 2" size="small" type="success">已完成</el-tag>
          <el-tag v-else-if="scope.row.state === 3" size="small" type="warning">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" min-width="260" :label="$t('action.operation')" >
        <template slot-scope="scope">
          <per-button icon="fa fa-edit" :label="$t('action.edit')" @click="handleEdit(scope.row)"/>
          <per-button icon="fa fa-list-alt" :label="$t('action.detail')" type="warning" @click="handleDetail(scope.row)"/>
          <per-button icon="fa fa-trash" :label="$t('action.delete')" type="danger" @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
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
    <!--新增订单界面-->
    <el-dialog title="修改订单" width="80%" top="8vh" :visible.sync="orderVisible" :close-on-click-modal="false" :before-close="handleRentCancel">
      <el-tabs type="border-card">
        <el-tab-pane :label="rent.name" v-if="orderVisible"><rent-order @rentCarCancel="handleRentCancel" @rentCarSubmit="handleRentSubmit" :vinType="rent" :editForm="dataForm" :detail="detailOrder" :operation="addOrder"></rent-order></el-tab-pane>
       </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { Loading } from 'element-ui'
import { mapState } from 'vuex'
import PerButton from '@/components/PerButton'
import BreadCrumb from '@/components/BreadCrumb'
import { formatTime } from '@/utils/datetime'
import RentOrder from '@/components/RentOrder'
export default {
  components: {
    PerButton,
    BreadCrumb,
    RentOrder
  },
  data () {
    return {
      size: 'medium',
      loading: false,
      filters: {
        orderType: '',
        vin: '',
        serviceCard: '',
        userName: '',
        phone: '',
        serviceProvider: '',
        isOrder: '',
        orderNo: '',
        rentCity: '',
        completed: '',
        beginTime: '',
        endTime: '',
        orderTime: '',
        reportTime: ''
      },
      bredcrumb: [{id: 1, title: '首页'}, {id: 2, title: '车辆租赁管理'}, {id: 3, title: '车辆租赁订单'}],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      orderType: [{id: 1, name: '人工'}, {id: 2, name: '微信'}],
      whetherList: [{id: 1, name: '是'}, {id: 2, name: '否'}],
      orderList: [{id: 1, name: '已下单'}, {id: 2, name: '已完成'}, {id: 3, name: '已取消'}],
      orderVisible: false,
      rent: {},
      addOrder: false,
      detailOrder: false,
      repeatId: null,
      loadingService: {},
      dataForm: {}
    }
  },
  computed: {
    ...mapState({
      vinTypes: state => state.type.vinType
    })
  },
  methods: {
    // 获取分页数据
    findPage (data) {
      this.loading = true
      if (data) {
        this.pageRequest = data
      }
      this.searchParams()
      this.$api.order.findPage(this.pageRequest).then(res => {
        console.log('data', res.data)
        this.pageResult = res.data
        this.loading = false
      }).catch(err => {
        this.$message({message: err, type: 'error'})
      })
    },
    searchParams () {
      this.pageRequest.columnFilters = {
        id: this.repeatId,
        user: {
          vin: this.filters.vin,
          serviceCard: this.filters.serviceCard
        },
        userName: this.filters.userName,
        userTel: this.filters.phone,
        orderType: this.filters.orderType,
        serviceProvider: this.filters.serviceProvider,
        isOrder: this.filters.isOrder,
        orderNo: this.filters.orderNo,
        rentCity: this.filters.rentCity,
        completed: this.filters.completed,
        state: this.filters.state,
        typeId: 1
      }
      if (this.filters.reportTime.length > 0) {
        this.pageRequest.columnFilters.reportTimeStart = this.filters.reportTime[0]
        this.pageRequest.columnFilters.reportTimeEnd = this.filters.reportTime[1]
      }
      if (this.filters.beginTime.length > 0) {
        this.pageRequest.columnFilters.beginTimeStart = this.filters.beginTime[0]
        this.pageRequest.columnFilters.beginTimeEnd = this.filters.beginTime[1]
      }
      if (this.filters.endTime.length > 0) {
        this.pageRequest.columnFilters.endTimeStart = this.filters.endTime[0]
        this.pageRequest.columnFilters.endTimeEnd = this.filters.endTime[1]
      }
      if (this.filters.orderTime.length > 0) {
        this.pageRequest.columnFilters.orderTimeStart = this.filters.orderTime[0]
        this.pageRequest.columnFilters.orderTimeEnd = this.filters.orderTime[1]
      }
    },
    reset () {
      this.$refs.filters.resetFields()
      this.repeatId = null
    },
    exportExcel () {
      this.$confirm('是否导出订单', '提示', {}).then(() => {
        this.loadingService = Loading.service({fullscreen: true, text: '订单下载中', background: 'rgba(0, 0, 0, 0.7)'})
        this.searchParams()
        this.$api.exports.exportExcel(this.pageRequest).then(result => {
          let blob = new Blob([result])
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          let num = ''
          for (let i = 0; i < 10; i++) {
            num += Math.ceil(Math.random() * 10)
          }
          link.setAttribute('download', '汽车租赁订单_' + num + '.xlsx')
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
          this.loadingService.close()
        }).catch(err => {
          this.$message({message: err, type: 'error'})
          this.loadingService.close()
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 换页刷新
    refreshPageRequest (pageNum) {
      this.pageRequest.pageNum = pageNum
      this.findPage()
    },
    // 详情
    handleDetail (params) {
      this.detailOredit(params)
      this.detailOrder = true
    },
    // 编辑
    handleEdit (params) {
      this.detailOredit(params)
      this.detailOrder = false
      console.log('this.airport', this.airport)
    },
    handleDelete (data) {
      this.$confirm('确认删除选中订单吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.$api.order.batchDelete({id: data.id}).then(res => {
            if (res.code === 200) {
              this.$message({ message: '删除成功', type: 'success' })
              this.repeatId = null
              this.findPage()
            } else {
              this.$message({ message: '操作失败, ' + res.msg, type: 'error' })
            }
            this.loading = false
          })
        })
        .catch(err => {
          this.$message({message: err, type: 'error'})
        })
    },
    detailOredit (params) {
      this.orderVisible = true
      this.dataForm = Object.assign({}, params)
      this.rent = this.vinTypes.filter(val => val.type === parseInt(params.typeId))[0]
    },
    handleRentCancel () {
      console.log('close')
      this.orderVisible = false
    },
    handleRentSubmit (data) {
      console.log('data>>>', data)
      this.orderVisible = false
      this.repeatId = null
      this.findPage()
    },
    // 时间格式化
    dateFormat (row, column, cellValue, index) {
      if (column.property === 'user.reportTime') {
        return moment(cellValue).format('YYYY-MM-DD')
      } else if (row[column.property]) {
        return moment(row[column.property]).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    timeFormat (row, column, cellValue, index) {
      if (row[column.property]) {
        return formatTime(row[column.property])
      }
    }
  },
  mounted () {
    this.findPage()
  },
  created () {
    console.log('repeat:', this.$route.params)
    this.repeatId = this.$route.params.id || null
    console.log('repeatss:', this.repeatId)
  }
}
</script>

<style scoped>
</style>
