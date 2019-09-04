<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.vin" placeholder="车架号"></el-input>
        </el-form-item>
         <el-form-item>
          <el-input v-model="filters.serviceCard" placeholder="服务卡号"></el-input>
        </el-form-item>
        <el-form-item>
          <per-button icon="fa fa-search" :label="$t('action.search')" type="primary" @click="findPage(null)"/>
        </el-form-item>
        <el-form-item>
          <per-button icon="fa fa-plus" :label="$t('action.add')" type="primary" @click="handleAdd"/>
        </el-form-item>
        <el-form-item>
          <el-upload
          style="display: inline"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadFalse"
          :before-upload="beforeAvatarUpload"
          :on-progress="uploadProgress"
          :action="importAction()">
            <el-button type="success" size = "mini" icon="el-icon-upload2">导入</el-button>
          </el-upload>
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
      <el-table-column prop="serviceType" header-align="center" align="center" min-width="120" label="卡券类型" :formatter="serviceTypeFormat"></el-table-column>
      <el-table-column prop="invoiceTime" header-align="center" align="center" min-width="150" label="开票日期" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="reportTime" header-align="center" align="center" min-width="150" label="上报时间" :formatter="dateFormat"></el-table-column>
      <el-table-column prop="dueCount" header-align="center" align="center" min-width="150" label="权益年限" ></el-table-column>
      <el-table-column prop="userName" header-align="center" align="center" min-width="120" label="车主姓名"></el-table-column>
      <el-table-column prop="phone" header-align="center" align="center" min-width="120" label="电话"></el-table-column>
      <el-table-column prop="openId" header-align="center" align="center" min-width="120" label="openId"></el-table-column>
      <el-table-column prop="carType" header-align="center" align="center" min-width="120" label="车型" ></el-table-column>
      <el-table-column prop="carLicense" header-align="center" align="center" min-width="120" label="车牌号" ></el-table-column>
      <el-table-column prop="idNo" header-align="center" align="center" min-width="150" label="身份证号码" ></el-table-column>
      <el-table-column prop="driverNo" header-align="center" align="center" min-width="150" label="驾驶证号码" ></el-table-column>
      <el-table-column prop="createTime" header-align="center" align="center" min-width="150" label="创建时间" :formatter="dateFormat"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" min-width="250" :label="$t('action.operation')" >
        <template slot-scope="scope">
          <per-button :label="$t('action.order')" type="success" @click="handleOrder(scope.row)"/>
          <per-button icon="fa fa-edit" :label="$t('action.edit')" @click="handleEdit(scope.row)"/>
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
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" top="8vh" width="77%" :visible.sync="dialogVisible" :close-on-click-modal="false" :before-close="cancelAdd" >
      <el-form :inline="true" :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" style="text-align:left;" :size="size" label-position="right">
        <el-form-item label="ID" prop="id" v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="dataForm.vin" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="serviceCard">
          <el-input v-model="dataForm.serviceCard" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="原卡号" prop="serviceCardOld">
          <el-input v-model="dataForm.serviceCardOld" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="开票日期" prop="invoiceTime">
          <el-date-picker v-model="dataForm.invoiceTime" type="date" style="width: 300px" ></el-date-picker>
        </el-form-item>
        <el-form-item label="上报时间" prop="reportTime">
          <el-date-picker v-model="dataForm.reportTime" @change="hasReportTime" type="date" style="width: 300px"></el-date-picker>
        </el-form-item>
        <el-form-item label="过期时间" prop="dueTime">
          <el-date-picker v-model="dataForm.dueTime" type="date" style="width: 300px" :disabled="true"></el-date-picker>
        </el-form-item>
        <el-form-item label="权益年限" prop="idNo">
          <el-input v-model="dataForm.dueCount" auto-complete="off" style="width: 300px" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="车型" prop="carType">
          <el-input v-model="dataForm.carType" auto-complete="off" style="width: 190px"></el-input>
          <el-button type="warning" size="small" plain @click="setCarType">点击生成车型</el-button>
        </el-form-item>
        <el-form-item label="卡券类型" prop="serviceType">
          <el-select v-model="dataForm.serviceType" placeholder="请选择" style="width: 300px">
            <el-option v-for="item in cardType" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车主姓名" prop="userName">
          <el-input v-model="dataForm.userName" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="dataForm.phone" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="openId" prop="openId">
          <el-input v-model="dataForm.openId" auto-complete="off" placeholder="(微信)" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="carLicense">
          <el-input v-model="dataForm.carLicense" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNo">
          <el-input v-model="dataForm.idNo" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="驾驶证号" prop="driverNo">
          <el-input v-model="dataForm.driverNo" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userAddr" size="large">
          <el-input v-model="dataForm.userAddr" auto-complete="off" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="车主权益" prop="vinType" style="width: 700px;">
          <el-checkbox-group v-model="dataForm.vinType" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in vinTypes" :label="item.type" :key="item.type">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div v-if="displayr">
          <el-form-item label="租赁-总次数" prop="rTotalCount" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.rTotalCount" :min="0" ></el-input-number>
          </el-form-item>
          <el-form-item label="租赁-已使用次数" prop="rTotalUsed" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.rTotalUsed" :min="0" :disabled="true"></el-input-number>
          </el-form-item>
          <el-form-item label="租赁-每年使用次数" prop="rCurrentCount" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.rCurrentCount" :min="0" ></el-input-number>
          </el-form-item>
          <br/>
        </div>
        <div v-if="displaya">
          <el-form-item label="接送-总次数" prop="aTotalCount" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.aTotalCount" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="接送-已使用次数" prop="aTotalUsed" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.aTotalUsed" :min="0" :disabled="true"></el-input-number>
          </el-form-item>
          <el-form-item label="接送-每年使用次数" prop="aCurrentCount" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.aCurrentCount" :min="0"></el-input-number>
          </el-form-item>
          <br/>
        </div>
        <div v-if="displayp">
          <el-form-item label="取送-总次数" prop="pTotalCount" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.pTotalCount" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="取送-已使用次数" prop="pTotalUsed" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.pTotalUsed" :min="0" :disabled="true"></el-input-number>
          </el-form-item>
          <el-form-item label="取送-每年使用次数" prop="pCurrentCount" style="width: 380px;" label-width="130px;">
            <el-input-number v-model="dataForm.pCurrentCount" :min="0"></el-input-number>
          </el-form-item>
        </div>
        <br/>
        <el-form-item label="备注" prop="remark" size="large">
          <el-input v-model="dataForm.remark" type="textarea" style="width: 800px;" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="handleCancelAdd">{{$t('action.cancel')}}</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading" >{{$t('action.submit')}}</el-button>
      </div>
    </el-dialog>
    <!--新增订单界面-->
    <el-dialog title="新增订单" width="83%" top="8vh" :visible.sync="orderVisible" :close-on-click-modal="false" :before-close="cancelTab">
      <el-tabs type="border-card">
        <el-tab-pane :label="airport.name" v-if="hasAirport"><airport-order @airportCancel="handleAirportCancel" @airportSubmit="handleAirportSubmit" @airportRedirect="handleAirportRed" :vinType="airport" :user="dataForm" :operation="addOrder"></airport-order></el-tab-pane>
        <el-tab-pane :label="pickup.name" v-if="hasPickup"><pickup-order @pickupCancel="handlePickupCancel" @pickupSubmit="handlePickupSubmit" @pickupRedirect="handlePcikupRed" :vinType="pickup" :user="dataForm" :operation="addOrder"></pickup-order></el-tab-pane>
        <el-tab-pane :label="rent.name" v-if="hasRent"><rent-order @rentCarCancel="handleRentCancel" @rentCarSubmit="handleRentSubmit" @rentRedirect="handleRentRed" :vinType="rent" :user="dataForm" :operation="addOrder"></rent-order></el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import moment from 'moment'
import { baseUrl } from '@/utils/global'
import { mapState } from 'vuex'
import PerButton from '@/components/PerButton'
import AirportOrder from '@/components/AirportOrder'
import PickupOrder from '@/components/PickupOrder'
import RentOrder from '@/components/RentOrder'
export default {
  components: {
    PerButton,
    AirportOrder,
    PickupOrder,
    RentOrder
  },
  data () {
    return {
      size: 'medium',
      loading: false,
      filters: {
        vin: '',
        serviceCard: ''
      },
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      orderVisible: false, // 下单界面是否显示
      editLoading: false,
      orderLoading: false,
      hasAirport: false, // 是否有接送机权益
      hasPickup: false, // 是否有取送车权益
      hasRent: false, // 是否有租车权益
      addOrder: true, // 新增订单
      displayr: false,
      displaya: false,
      displayp: false,
      airport: {},
      pickup: {},
      rent: {},
      filterVin: [],
      cardType: [{id: 0, name: '2017年Avenir卡'}, {id: 1, name: '2018年Avenir卡'}, {id: 2, name: '2019年Avenir卡'}],
      dataFormRules: {
        vin: [{ required: true, message: '请输入车架号', trigger: 'blur' }],
        serviceCard: [{ required: true, message: '请输入服务卡号', trigger: 'blur' }],
        reportTime: [{ required: true, message: '请输入上报时间', trigger: 'blur' }],
        vinType: [{ required: true, message: '请选择权益', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }]
      },
      loadingService: {},
      // 新增编辑界面数据
      dataForm: {
        id: '',
        userName: '',
        vin: '',
        phone: '',
        openId: '',
        serviceCard: '',
        serviceCardOld: '',
        serviceType: 0,
        carType: '',
        carLicense: '',
        idNo: '',
        driverNo: '',
        userAddr: '',
        invoiceTime: '',
        reportTime: '',
        dueTime: '',
        dueCount: '',
        aTotalCount: 0,
        aTotalUsed: 0,
        aCurrentCount: 0,
        pTotalCount: 0,
        pTotalUsed: 0,
        pCurrentCount: 0,
        rTotalCount: 0,
        rTotalUsed: 0,
        rCurrentCount: 0,
        vinType: [1, 2, 4],
        remark: ''
      }
    }
  },
  computed: {
    ...mapState({
      vinTypes: state => state.type.vinType,
      agentInfo: state => state.app.agentInfo
    })
  },
  methods: {
    // 获取分页数据
    findPage (data) {
      this.loading = true
      this.pageRequest.columnFilters = {
        vin: this.filters.vin,
        serviceCard: this.filters.serviceCard
      }
      this.$api.user.findPage(this.pageRequest).then(res => {
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
    handleCheckedCitiesChange (data) {
      console.log('form: ', this.dataForm.vinType)
      this.dataForm.vinType.includes(1) ? this.displayr = true : this.displayr = false
      this.dataForm.vinType.includes(2) ? this.displaya = true : this.displaya = false
      this.dataForm.vinType.includes(4) ? this.displayp = true : this.displayp = false
    },
    // 显示新增界面
    handleAdd () {
      if (this.vinTypes.length <= 0) {
        this.$confirm('请添加权益类型', '提示', {
          type: 'warning'
        }).then(() => {
          this.$router.push({path: '/type'})
        })
      } else {
        this.displayr = false
        this.displaya = false
        this.displayp = false
        this.dialogVisible = true
        this.operation = true
        this.dataForm = {
          id: '',
          userName: '',
          vin: '',
          phone: '',
          openId: '',
          serviceCard: '',
          serviceCardOld: '',
          serviceType: 0,
          carType: '',
          carLicense: '',
          idNo: '',
          driverNo: '',
          userAddr: '',
          invoiceTime: '',
          reportTime: '',
          dueTime: '',
          dueCount: '',
          aTotalCount: 20,
          aTotalUsed: 0,
          aCurrentCount: 4,
          pTotalCount: 20,
          pTotalUsed: 0,
          pCurrentCount: 4,
          rTotalCount: 5,
          rTotalUsed: 0,
          rCurrentCount: 1,
          vinType: [1, 2, 4],
          remark: ''
        }
        this.displayr = true
        this.displaya = true
        this.displayp = true
      }
    },
    // 显示编辑界面
    handleEdit (params) {
      this.dialogVisible = true
      this.operation = false
      this.dataForm = Object.assign({}, params)
      this.dataForm.vinType = []
      if (params.vinType) {
        let vintypes = params.vinType.split(',')
        let types = vintypes.map(item => {
          return this.vinTypes.filter(val => val.type === parseInt(item))[0].type
        })
        console.log('vinType', types)
        this.dataForm.vinType = types
        this.dataForm.vinType.includes(1) ? this.displayr = true : this.displayr = false
        this.dataForm.vinType.includes(2) ? this.displaya = true : this.displaya = false
        this.dataForm.vinType.includes(4) ? this.displayp = true : this.displayp = false
      }
      this.dataForm.serviceType = parseInt(params.serviceType)
    },
    // 批量删除
    handleDelete (data) {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.$api.user.batchDelete({id: data.id}).then(res => {
            if (res.code === 200) {
              this.$message({ message: '删除成功', type: 'success' })
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
    // 编辑
    submitForm () {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            let params = Object.assign({}, this.dataForm)
            params.vinType = params.vinType.join(',')
            this.operation ? params.createBy = this.agentInfo.agentName : params.updateBy = this.agentInfo.agentName
            this.$api.user.save(params).then(res => {
              this.editLoading = false
              if (res.code === 200) {
                this.$message({ message: '操作成功', type: 'success' })
                this.dialogVisible = false
                this.$refs['dataForm'].resetFields()
              } else {
                this.editLoading = false
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
    handleOrder (params) {
      if (!params.reportTime) {
        this.$confirm('用户还没有上报时间, 请添上报时间后在进行下单', '提示', {}).then(() => {})
      } else {
        if (params.vinType) {
          this.orderVisible = true
          this.dataForm = Object.assign({}, params)
          const vintypes = params.vinType.split(',')
          const vinMap = vintypes.map(item => {
            return this.vinTypes.filter(val => val.type === parseInt(item))[0]
          })
          vinMap.forEach(item => {
            if (item.type === 1) {
              this.hasRent = true
              this.rent = {type: item.type, name: item.name}
            } else if (item.type === 4) {
              this.hasPickup = true
              this.pickup = {type: item.type, name: item.name}
            } else if (item.type === 2) {
              this.hasAirport = true
              this.airport = {type: item.type, name: item.name}
            }
          })
          console.log('this.dataForm.vinType', this.dataForm.vinType)
        } else {
          this.$confirm('用户还没有权益, 请添加权益后在进行下单', '提示', {}).then(() => {})
        }
      }
    },
    // 计算权益年限及过期时间
    hasReportTime (val) {
      if (val) {
        if (moment(val).isBetween('2016-12-31 00:00:00', '2018-03-02 00:00:00')) {
          this.dataForm.dueTime = moment(val).add(6, 'y')
          this.dataForm.dueCount = 6
        } else {
          this.dataForm.dueTime = moment(val).add(5, 'y')
          this.dataForm.dueCount = 5
        }
        this.setCarType()
      } else {
        this.dataForm.dueTime = ''
        this.dataForm.dueCount = ''
        this.dataForm.carType = ''
      }
      console.log('reportTime: ', val)
    },
    // 根据车架号生成车型
    setCarType () {
      if (this.dataForm.vin && this.dataForm.reportTime) {
        let vin = this.dataForm.vin
        let time = this.dataForm.reportTime
        let type = ''
        let year = moment(time).year()
        if (vin.indexOf('GUL8') > 0) {
          if (moment(time).isBefore('2017-01-01 00:00:00')) {
            type = '2017款GL8'
          } else {
            type = year + '款GL8'
          }
        } else if (vin.indexOf('ZJ55') > 0) {
          if (moment(time).isBefore('2018-01-01 00:00:00')) {
            type = '2018款君越'
          } else {
            type = year + '款君越'
          }
        }
        if (type === '') {
          this.$message({message: '该车架号没有对应车型', type: 'error'})
        }
        this.dataForm.carType = type
      } else {
        this.$confirm('请输入车架号及上报时间', '提示', {})
      }
    },
    importAction () {
      return (baseUrl + '/user/import')
    },
    uploadSuccess (response, file, fileList) {
      this.loadingService.close()
      if (response.code === 200) {
        this.$message({message: '文件导入成功', type: 'success'})
      } else {
        this.$message({message: response.msg, type: 'error'})
      }
    },
    uploadFalse (response, file, fileList) {
      this.loadingService.close()
      this.$message({message: response.msg, type: 'error'})
    },
    uploadProgress (response, file, fileList) {
      this.loadingService = Loading.service({fullscreen: true, text: '文件上传中', background: 'rgba(0, 0, 0, 0.7)'})
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload (file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({message: '上传模板只能是 xls、xlsx格式!', type: 'error'})
      }
      // if (!isLt2M) {
      //   this.$message({message: '上传模板大小不能超过 10MB!', type: 'error'})
      // }
      return extension || extension2
    },
    handleAirportCancel () {
      this.cancelTab()
    },
    handleAirportSubmit () {
      this.orderVisible = false
      this.$router.push({path: '/airport/order'})
    },
    handleAirportRed (data) {
      this.orderVisible = false
      this.$router.push({name: '接送机订单', params: {id: data}})
    },
    handlePickupCancel () {
      this.cancelTab()
    },
    handlePickupSubmit () {
      this.orderVisible = false
      this.$router.push({path: '/pickup/order'})
    },
    handlePcikupRed (data) {
      this.orderVisible = false
      this.$router.push({name: '取送车订单', params: {id: data}})
    },
    handleRentCancel () {
      this.cancelTab()
    },
    handleRentSubmit () {
      this.orderVisible = false
      this.$router.push({path: '/rent/order'})
    },
    handleRentRed (data) {
      this.orderVisible = false
      this.$router.push({name: '车辆租赁订单', params: {id: data}})
    },
    cancelTab () {
      console.log('close')
      this.orderVisible = false
      this.hasAirport = false
      this.hasPickup = false
      this.hasRent = false
    },
    handleCancelAdd () {
      this.cancelAdd()
    },
    cancelAdd () {
      this.dialogVisible = false
      this.displayr = false
      this.displaya = false
      this.displayp = false
    },
    // 时间格式化
    dateFormat (row, column, cellValue, index) {
      if (row[column.property]) {
        return moment(row[column.property]).format('YYYY-MM-DD')
      }
    },
    // 卡券类型格式化
    serviceTypeFormat (row, column) {
      if (row.serviceType) {
        return this.cardType.filter(item => item.id === parseInt(row.serviceType))[0].name
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
