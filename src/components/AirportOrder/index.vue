<template>
<div>
  <el-form :inline="true" :model="editForm" label-width="100px" ref="editForm" :rules="orderFormRules"  style="text-align:left;" :size="size" label-position="right">
    <el-form-item label="ID" prop="id" v-if="false">
      <el-input v-model="editForm.id" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="来源" prop="orderType" style="width: 250px">
      <el-radio-group v-model="editForm.orderType" :disabled="!operation">
        <el-radio v-for="(type, index) in sourceTypeList" :label="index + 1" :key="index" :disabled="index == 1">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item style="width: 300px; text-align: center">
      <el-tag type="warning">当前为第 {{year}} 年：&nbsp; 总次数：{{editForm.user.aTotalCount}},&nbsp; &nbsp; 总已使用：{{editForm.user.aTotalUsed}}, &nbsp; &nbsp;  每年可使用：{{editForm.user.aCurrentCount}}, &nbsp;&nbsp; 第 {{year}} 年已使用： {{currentNum}}</el-tag>
    </el-form-item>
    <el-form-item v-if="editForm.state === 3" style="width: 500px; text-align: center">
      <el-tag type="danger">该订单已取消</el-tag>
    </el-form-item>
    <br/>
    <el-form-item label="车架号" prop="user.vin">
      <el-input v-model="editForm.user.vin" auto-complete="off" style="width: 300px" :disabled="userDisabled"></el-input>
    </el-form-item>
    <el-form-item label="服务卡号" prop="user.serviceCard">
      <el-input v-model="editForm.user.serviceCard" auto-complete="off" style="width: 300px" :disabled="userDisabled"></el-input>
    </el-form-item>
    <el-form-item label="用户姓名" prop="userName">
      <el-input v-model="editForm.userName" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="userTel">
      <el-input v-model="editForm.userTel" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="openId" prop="openId" v-if="editForm.orderType == 2">
      <el-input v-model="editForm.openId" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="车型" prop="user.carType">
      <el-input v-model="editForm.user.carType" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="来电时间" prop="callTime" v-if="editForm.orderType == 1">
      <!-- <el-input v-if="operation" v-model="editForm.callTime" auto-complete="off" style="width: 300px"></el-input> -->
      <el-date-picker v-model="editForm.callTime" type="datetime" style="width: 300px" :disabled="detail"></el-date-picker>
    </el-form-item>
    <el-form-item label="航班信息" prop="flight">
      <el-input v-model="editForm.flight" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="机场/站" prop="airport" v-if="editForm.orderType == 1">
      <el-input v-model="editForm.airport" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="接车地址" prop="address">
      <el-input v-model="editForm.address" type="textarea" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="目的地址" prop="destination">
      <el-input v-model="editForm.destination" type="textarea" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="用车时间" prop="useTime">
      <el-date-picker v-model="editForm.useTime" type="datetime" style="width: 300px" :disabled="detail"></el-date-picker>
    </el-form-item>
    <el-form-item label="接机时间" prop="airportPickupTime">
      <el-input v-model="editForm.airportPickupTime" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="预约时间" prop="appointmentTime" v-if="editForm.orderType == 2">
      <el-date-picker v-model="editForm.appointmentTime" type="datetime" style="width: 300px" :disabled="detail"></el-date-picker>
    </el-form-item>
    <el-form-item label="用车类型" prop="useCarType" style="width: 400px">
      <el-radio-group v-model="editForm.useCarType" :disabled="detail">
        <el-radio v-for="(type, index) in userCarTypeList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="乘车人数" prop="number" style="width: 400px">
      <el-input v-model="editForm.number" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="是否需要下单" prop="needOrder" style="width: 400px">
      <el-radio-group v-model="editForm.needOrder" :disabled="detail">
        <el-radio v-for="(type, index) in whetherList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否已下单" prop="isOrder" style="width: 400px" v-if="!operation">
      <el-radio-group v-model="editForm.isOrder" :disabled="detail">
        <el-radio v-for="(type, index) in whetherList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="服务是否已完成" prop="completed" style="width: 400px" label-width="120px" v-if="!operation">
      <el-radio-group v-model="editForm.completed" :disabled="detail || orderStatus === 1">
        <el-radio v-for="(type, index) in whetherList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否回访成功" prop="isVisit" v-if="editForm.orderType == 2" style="width: 400px">
      <el-radio-group v-model="editForm.isVisit" :disabled="detail">
        <el-radio v-for="(type, index) in whetherList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="回访人" prop="visitor" v-if="editForm.orderType == 2">
      <el-input v-model="editForm.visitor" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="回访时间" prop="visitTime" v-if="editForm.orderType == 2">
      <el-date-picker v-model="editForm.visitTime" type="datetime" style="width: 300px" :disabled="detail"></el-date-picker>
    </el-form-item>
    <el-form-item label="下单客服" prop="orderService" >
      <el-input v-model="editForm.orderService" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="下单时间" prop="orderTime" >
      <el-date-picker v-model="editForm.orderTime" type="datetime" style="width: 300px"></el-date-picker>
    </el-form-item>
    <el-form-item label="订单号" prop="orderNo" v-if="!operation">
      <el-input v-model="editForm.orderNo" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="录音编号" prop="recordNo">
      <el-input v-model="editForm.recordNo" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="预计金额" prop="expectMoney" v-if="!operation">
      <el-input v-model="editForm.expectMoney" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="实际金额" prop="realityMoney" v-if="!operation">
      <el-input v-model="editForm.realityMoney" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark" size="large">
      <el-input v-model="editForm.remark" type="textarea" style="width: 710px" :rows="2" :disabled="detail"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button v-if="editForm.state !== 3 && !operation && editForm.state !== 2" :size="size" type="danger" @click="airportCancelOrder" :loading="cancelLoading">取消订单</el-button>
    <el-button :size="size" type="primary" @click="submitAirportForm" :disabled="detail || editForm.state === 3 || (editForm.user.aTotalUsed >= editForm.user.aTotalCount && operation) || (editForm.user.aTotalUsed >= editForm.user.aTotalCount && !operation && orderStatus === 2) || (editForm.user.aCurrentCount <= currentNum && operation) || (editForm.user.aCurrentCount <= currentNum && !operation && orderStatus === 2)" :loading="orderLoading" >{{$t('action.submit')}}</el-button>
    <el-button :size="size" @click="airportCancel">关闭</el-button>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import { formatDatetime, formatNumber, IEVersion } from '@/utils/datetime'
import moment from 'moment'
export default {
  props: {
    user: {
      type: Object,
      default: function () {
        return {}
      }
    },
    vinType: {
      type: Object,
      default: function () {
        return {}
      }
    },
    editForm: {
      type: Object,
      default: function () {
        return {
          id: '',
          typeId: this.vinType.type,
          orderType: 1,
          user: this.user,
          userTel: this.user.phone,
          userName: this.user.userName,
          openId: this.user.openId,
          callTime: '',
          flight: '',
          airport: '',
          address: '',
          destination: '',
          useTime: '',
          airportPickupTime: '',
          appointmentTime: '',
          useCarType: 1,
          number: '',
          isVisit: 2,
          needOrder: 2,
          visitor: '',
          visitTime: '',
          orderService: '',
          isOrder: 2,
          completed: 2,
          orderTime: '',
          expectMoney: '',
          realityMoney: '',
          orderNo: '',
          recordNo: '',
          remark: ''
        }
      }
    },
    operation: Boolean,
    detail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      agentInfo: state => state.app.agentInfo
    })
  },
  data () {
    return {
      size: 'medium',
      sourceTypeList: ['人工', '微信'],
      userCarTypeList: ['接机', '送机'],
      whetherList: ['是', '否'],
      orderLoading: false,
      userDisabled: true,
      cancelLoading: false,
      currentNum: 0,
      year: '',
      orderStatus: 0,
      orderFormRules: {
        'user.vin': [{ required: true, message: '请输入车架号', trigger: 'blur' }],
        'useTime': [{ required: true, message: '请输入用车时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 取消提交
    airportCancel () {
      this.$emit('airportCancel')
    },
    airportSubmit () {
      this.$emit('airportSubmit', this.editForm.typeId)
    },
    // 重定向已存在订单
    redirectPage (data) {
      this.$emit('airportRedirect', data.id)
    },
    // 触发提交
    submitAirportForm () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.orderLoading = true
            let params = Object.assign({}, this.editForm)
            this.operation ? params.createBy = this.agentInfo.agentName : params.updateBy = this.agentInfo.agentName
            if (!this.operation) {
              params.update_time = new Date()
            }
            this.$api.order.save(params).then(res => {
              this.orderLoading = false
              if (res.code === 200) {
                this.$message({ message: '操作成功', type: 'success' })
                this.airportSubmit()
              } else if (res.code === 407) {
                this.$confirm(res.msg, '提示', {}).then(() => { this.redirectPage(res.data) })
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
            }).catch(err => {
              this.$message({ message: err, type: 'error' })
            })
          })
        }
      })
    },
    airportCancelOrder () {
      this.$confirm('确认取消订单吗？', '提示', {}).then(() => {
        this.cancelLoading = true
        let user = sessionStorage.getItem('userInfo')
        let paramsInfo = JSON.parse(sessionStorage.getItem('paramsInfo'))
        let params = Object.assign({}, this.editForm)
        params.updateBy = (paramsInfo && paramsInfo.agentName) ? paramsInfo.agentName : user
        this.$api.order.cancelOrder(params).then(res => {
          this.cancelLoading = false
          if (res.code === 200) {
            this.$message({ message: '操作成功', type: 'success' })
            this.airportSubmit()
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(err => {
          this.$message({ message: err, type: 'error' })
        })
      })
    },
    async getCount () {
      await this.$api.order.countByVin({user: this.editForm.user, typeId: this.vinType.type}).then(res => {
        if (res.code === 200) {
          this.currentNum = res.data.countBy
          this.year = res.data.year
        }
      })
    }
  },
  async created () {
    console.log('editForm: ', this.editForm)
    console.log('agentInfo:', this.agentInfo)
    if (IEVersion() !== -1) {
      this.editForm.useTime = moment(this.editForm.useTime).format('YYYY/MM/DD HH:mm:ss')
      this.editForm.callTime = moment(this.editForm.callTime).format('YYYY/MM/DD HH:mm:ss')
      this.editForm.orderTime = moment(this.editForm.orderTime).format('YYYY/MM/DD HH:mm:ss')
    }
    if (this.editForm.orderType === 1 && this.agentInfo.callTime !== '') {
      this.editForm.callTime = this.agentInfo.callTime
    }
    if (this.agentInfo.agentName !== 'admin' && this.agentInfo.agentName !== '') {
      this.editForm.orderService = this.agentInfo.agentName
    }
    if (this.editForm.orderType === 1 && this.agentInfo.recordNo !== '') {
      // 已有录音并且该录音不包含state内的录音即拼接
      if (this.editForm.recordNo !== '' && this.editForm.recordNo.indexOf(this.agentInfo.recordNo) < 0) {
        this.editForm.recordNo += ',' + this.agentInfo.recordNo
      } else if (this.editForm.recordNo === '') {
        this.editForm.recordNo = this.agentInfo.recordNo
      }
    }
    this.orderStatus = this.editForm.completed
    await this.getCount()
  }
}
</script>
<style scoped>
</style>
