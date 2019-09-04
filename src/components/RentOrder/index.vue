<template>
<div>
  <el-form :inline="true" :model="editForm" label-width="100px" ref="editForm" :rules="orderFormRules"  style="text-align:left;" :size="size" label-position="right">
    <el-form-item label="ID" prop="id" v-if="false">
      <el-input v-model="editForm.id" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="租车平台" style="width: 350px">
      <el-radio-group v-model="rentType" @change="changeRentType" :disabled="detail">
        <el-radio-button v-for="(type, index) in rentTypeList" :label="index + 1" :key="index">{{ type }}</el-radio-button>
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="来源" prop="orderType" style="width: 250px">
      <el-radio-group v-model="editForm.orderType" @change="changeType" :disabled="!operation" >
        <el-radio v-for="(type, index) in sourceTypeList" :label="index + 1" :key="index" :disabled="index == 1">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item style="width: 300px; text-align: center">
      <el-tag type="warning">当前为第 {{year}} 年：&nbsp; 总次数：{{editForm.user.rTotalCount}},&nbsp; &nbsp; 总已使用：{{editForm.user.rTotalUsed}}, &nbsp; &nbsp;  每年可使用：{{editForm.user.rCurrentCount}}, &nbsp;&nbsp; 第 {{year}} 年已使用： {{currentNum}}</el-tag>
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
      <el-input v-model="editForm.userName" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="userTel">
      <el-input v-model="editForm.userTel" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="openId" prop="openId" v-if="editForm.orderType == 2">
      <el-input v-model="editForm.openId" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="车型" prop="user.carType" v-if="!isRentType || !operation">
      <el-input v-model="editForm.user.carType" auto-complete="off" style="width: 300px" :disabled="userDisabled"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码" prop="idNo">
      <el-input v-model="editForm.idNo" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="驾驶证号码" prop="driverNo" v-if="!isRentType || !operation">
      <el-input v-model="editForm.driverNo" auto-complete="off" style="width: 300px" :disabled="detail && !operation"></el-input>
    </el-form-item>
    <el-form-item label="是否有信用卡" prop="isCredit" style="width: 400px" v-if="editForm.orderType == 1 && !operation" >
      <el-radio-group v-model="editForm.isCredit" :disabled="detail">
        <el-radio v-for="(type, index) in whetherList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="来电时间" prop="callTime" v-if="!isRentType || !operation">
      <!-- <el-input v-if="operation" v-model="editForm.callTime" auto-complete="off" style="width: 300px"></el-input> -->
      <el-date-picker v-model="editForm.callTime" type="datetime" style="width: 300px" :disabled="detail"></el-date-picker>
    </el-form-item>
    <el-form-item label="租车城市" prop="rentCity" v-if="!isRentType || !operation">
      <el-input v-model="editForm.rentCity" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="用户地址" prop="userAddr" v-if="!isRentType || !operation">
      <el-input v-model="editForm.userAddr" type="textarea" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="预约车型" prop="orderCarType" v-if="!isRentType || !operation">
      <el-input v-model="editForm.orderCarType" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="预约时间" prop="appointmentTime" v-if="!isRentType || !operation">
      <el-date-picker v-model="editForm.appointmentTime" type="datetime" style="width: 300px" :disabled="isRentType && !operation"></el-date-picker>
    </el-form-item>
    <el-form-item label="取车门店名称" prop="storeName" v-if="!isRentType || !operation">
      <el-input v-model="editForm.storeName" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="取车门店地址" prop="storeAddr" v-if="!isRentType || !operation">
      <el-input v-model="editForm.storeAddr" type="textarea" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="取车联系人" prop="contactName" v-if="!isRentType || !operation">
      <el-input v-model="editForm.contactName" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="取车门店电话" prop="contactTel" v-if="!isRentType || !operation">
      <el-input v-model="editForm.contactTel" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="取车时间" prop="beginTime" v-if="!isRentType || !operation ">
      <el-date-picker v-model="editForm.beginTime" type="datetime" style="width: 300px" :disabled="isRentType && !operation"></el-date-picker>
    </el-form-item>
    <el-form-item label="还车时间" prop="endTime" v-if="!isRentType || !operation">
      <el-date-picker v-model="editForm.endTime" @change="countDuration" type="datetime" style="width: 300px" :disabled="isRentType && !operation"></el-date-picker>
    </el-form-item>
    <el-form-item label="租车时长" prop="duration" v-if="!isRentType || !operation">
      <el-input v-model="editForm.duration" auto-complete="off" placeholder="天" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="还车门店名称" prop="returnName" v-if="!isRentType || !operation">
      <el-input v-model="editForm.returnName" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="还车门店地址" prop="dealerAddr" v-if="!isRentType || !operation">
      <el-input v-model="editForm.dealerAddr" type="textarea" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="还车门店电话" prop="returnTel" v-if="!isRentType || !operation">
      <el-input v-model="editForm.returnTel" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="服务商" prop="serviceProvider" v-if="!isRentType || !operation">
      <el-input v-model="editForm.serviceProvider" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="是否已下单" prop="isOrder" style="width: 400px" v-if="!operation">
      <el-radio-group v-model="editForm.isOrder" :disabled="isRentType && !operation">
        <el-radio v-for="(type, index) in whetherList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="下单时间" prop="orderTime" v-if="!isRentType || !operation">
      <el-date-picker v-model="editForm.orderTime" type="datetime" style="width: 300px" :disabled="isRentType && !operation"></el-date-picker>
    </el-form-item>
    <el-form-item label="下单手机" prop="orderTel" v-if="!isRentType || !operation">
      <el-input v-model="editForm.orderTel" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="是否有GL8车型" prop="isGl" style="width: 400px" label-width="120px" v-if="!isRentType || !operation">
      <el-radio-group v-model="editForm.isGl" :disabled="detail">
        <el-radio v-for="(type, index) in whetherList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="服务是否已完成" prop="completed" style="width: 400px" label-width="120px" v-if="!operation">
      <el-radio-group v-model="editForm.completed" :disabled="detail || orderStatus === 1">
        <el-radio v-for="(type, index) in whetherList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="无车型是否同意更换" prop="isReplace" style="width: 400px" label-width="150px" v-if="!operation">
      <el-radio-group v-model="editForm.isReplace" :disabled="detail">
        <el-radio v-for="(type, index) in agreeList" :label="index + 1" :key="index">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="更换的车型" prop="replaceCar" v-if="!operation">
      <el-input v-model="editForm.replaceCar" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="实际用车" prop="actualCar" v-if="!operation">
      <el-input v-model="editForm.actualCar" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="回访客服" prop="visitor" v-if="!operation">
      <el-input v-model="editForm.visitor" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="回访时间" prop="visitTime" v-if="!operation">
      <el-date-picker v-model="editForm.visitTime" type="datetime" style="width: 300px" :disabled="detail"></el-date-picker>
    </el-form-item>
    <el-form-item label="下单客服" prop="orderService" v-if="!isRentType || !operation">
      <el-input v-model="editForm.orderService" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="订单号" prop="orderNo" v-if="!operation">
      <el-input v-model="editForm.orderNo" auto-complete="off" style="width: 300px" :disabled="isRentType && !operation"></el-input>
    </el-form-item>
    <el-form-item label="录音编号" prop="recordNo" v-if="!isRentType || !operation">
      <el-input v-model="editForm.recordNo" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="预计金额" prop="expectMoney" v-if="!operation">
      <el-input v-model="editForm.expectMoney" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="实际金额" prop="realityMoney" v-if="!operation">
      <el-input v-model="editForm.realityMoney" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark" size="large" v-if="!isRentType || !operation">
      <el-input v-model="editForm.remark" type="textarea" style="width: 710px" :rows="2" :disabled="detail"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <div v-if="isRentType">
      <el-button :size="size" type="danger" :disabled="detail || orderStatus === 1 || editForm.state === 3" v-if="!operation && ((editForm.user.rTotalUsed >= editForm.user.rTotalCount) || (editForm.user.rTotalUsed >= editForm.user.rTotalCount) || (editForm.user.rCurrentCount <= currentNum) || (editForm.user.rCurrentCount <= currentNum))" @click="rentBuikSubmit">取消订单</el-button>
      <el-button :size="size" type="success" v-else :disabled="orderStatus === 1 || detail || editForm.state === 3 || (operation && ((editForm.user.rTotalUsed >= editForm.user.rTotalCount) || (editForm.user.rTotalUsed >= editForm.user.rTotalCount) || (editForm.user.rCurrentCount <= currentNum) || (editForm.user.rCurrentCount <= currentNum)))" @click="rentBuikSubmit">{{operation ? '添加订单' : '更新订单'}}</el-button>
      <!-- <el-button v-if="editForm.state !== 3 && !operation && editForm.state !== 2" :size="size" type="danger" @click="rentCancelOrder" :loading="cancelLoading">取消订单</el-button> -->
      <el-button v-if="!operation" :size="size" type="primary" :disabled="detail  || editForm.state === 3 ||(editForm.user.rTotalUsed >= editForm.user.rTotalCount && operation) || (editForm.user.rTotalUsed >= editForm.user.rTotalCount && !operation && orderStatus === 2) || (editForm.user.rCurrentCount <= currentNum && operation) || (editForm.user.rCurrentCount <= currentNum && !operation && orderStatus === 2)" @click="submitRentCarForm" :loading="orderLoading">平台提交</el-button>
      <el-button :size="size" @click="rentCarCancel">关闭</el-button>
    </div>
    <div v-else>
      <el-button v-if="editForm.state !== 3 && !operation && editForm.state !== 2" :size="size" type="danger" @click="rentCancelOrder" :loading="cancelLoading">取消订单</el-button>
      <el-button :size="size" type="primary" @click="submitRentCarForm" :disabled="detail || editForm.state === 3 || (editForm.user.rTotalUsed >= editForm.user.rTotalCount && operation) || (editForm.user.rTotalUsed >= editForm.user.rTotalCount && !operation && orderStatus === 2) || (editForm.user.rCurrentCount <= currentNum && operation) || (editForm.user.rCurrentCount <= currentNum && !operation && orderStatus === 2)" :loading="orderLoading" >{{$t('action.submit')}}</el-button>
      <el-button :size="size" @click="rentCarCancel">关闭</el-button>
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import { formatDatetime, formatNumber, IEVersion } from '@/utils/datetime'
import { rentOrderUrl, rentOrderUpdate } from '@/utils/global'
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
          isCredit: 1,
          rentCity: '',
          userAddr: '',
          orderCarType: '',
          appointmentTime: '',
          storeName: '',
          storeAddr: '',
          returnName: '',
          returnTel: '',
          dealerAddr: '',
          beginTime: '',
          endTime: '',
          duration: '',
          serviceProvider: '',
          orderTel: '',
          isOrder: 2,
          contactName: '',
          contactTel: '',
          isGl: 2,
          completed: 2,
          isReplace: 1,
          replaceCar: '',
          actualCar: '',
          visitor: '',
          visitTime: '',
          orderService: '',
          realityMoney: '',
          orderNo: '',
          recordNo: '',
          orderTime: '',
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
      rentTypeList: ['一嗨租车', '神州租车'],
      rentType: 2,
      isRentType: false,
      whetherList: ['是', '否'],
      agreeList: ['同意', '不同意'],
      orderLoading: false,
      userDisabled: true,
      cancelLoading: false,
      currentNum: 0,
      year: '',
      orderStatus: 0,
      orderFormRules: {
        'user.vin': [{ required: true, message: '请输入车架号', trigger: 'blur' }],
        'user.serviceCard': [{ required: true, message: '请输入卡号', trigger: 'blur' }],
        'userName': [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        'userTel': [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        'idNo': [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
        'beginTime': [{ required: true, message: '请输入取车时间', trigger: 'blur' }],
        'endTime': [{ required: true, message: '请输入还车时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 改变下单类型
    changeType (val) {
      if (val === 1 && this.operation) {
        this.editForm.isCredit = 1
      } else if (val === 2 && this.operation) {
        this.editForm.isCredit = ''
      }
      console.log('editForm:>>>', this.orderForm)
    },
    changeRentType (val) {
      if (val === 1) {
        this.isRentType = true
      } else {
        this.isRentType = false
      }
    },
    countDuration (val) {
      if (this.editForm.beginTime) {
        this.editForm.duration = this.numDate(this.editForm.beginTime, val)
      } else {
        this.editForm.duration = ''
      }
    },
    numDate (start, end) {
      let startdate = new Date(start)
      let enddate = new Date(end)
      let ut = enddate - start // 相差的毫秒
      let day = Math.floor(ut / (24 * 3600 * 1000)) // 计算天数
      let leavel = ut % (24 * 3600 * 1000) // 计算天数后剩余的时间
      let hour = Math.floor(leavel / (3600 * 1000)) // 计算剩余的小时
      let ll = leavel % (3600 * 1000) // 计算剩余毫秒
      let min = Math.floor(ll / (60 * 1000)) // 计算分钟
      return day + '天' + hour + '时' + min + '分'
    },
    // 取消提交
    rentCarCancel () {
      this.$emit('rentCarCancel')
    },
    rentCarSubmit () {
      this.$emit('rentCarSubmit')
    },
    // 重定向已存在订单
    redirectPage (data) {
      this.$emit('rentRedirect', data.id)
    },
    // 触发提交
    submitRentCarForm () {
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
                this.rentCarSubmit()
              } else if (res.code === 407) {
                this.$confirm(res.msg, '提示', {}).then(() => { this.redirectPage(res.data) })
              } else {
                this.$message({
                  message: '操作失败, ' + res.msg,
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
    // 跳转外部下单
    rentBuikSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm(this.operation ? '确认下单吗？' : '确认更新吗？', '提示', {}).then(() => {
            let obj = {
              userName: this.editForm.userName,
              idNo: this.editForm.idNo,
              mobile: this.editForm.userTel,
              vin: this.editForm.user.vin,
              avenirNo: this.editForm.user.serviceCard,
              openid: this.editForm.openId,
              orderNo: this.editForm.orderNo
            }
            let url = ''
            if (this.operation) {
              url = rentOrderUrl(obj)
            } else {
              url = rentOrderUpdate(obj)
            }
            window.open(url, '_blank')
            this.rentCarSubmit()
          })
        }
      })
    },
    rentCancelOrder () {
      this.$confirm('确认取消订单吗？', '提示', {}).then(() => {
        this.cancelLoading = true
        let params = Object.assign({}, this.editForm)
        params.updateBy = this.agentInfo.agentName
        this.$api.order.cancelOrder(params).then(res => {
          this.cancelLoading = false
          if (res.code === 200) {
            this.$message({ message: '操作成功', type: 'success' })
            this.rentCarSubmit()
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
      await this.$api.order.countByVin({ user: this.editForm.user, typeId: this.vinType.type }).then(res => {
        if (res.code === 200) {
          this.currentNum = res.data.countBy
          this.year = res.data.year
        }
      })
    }
  },
  async created () {
    console.log('editForm: ', this.editForm)
    if (IEVersion() !== -1) {
      this.editForm.useTime = moment(this.editForm.useTime).format('YYYY/MM/DD HH:mm:ss')
      this.editForm.callTime = moment(this.editForm.callTime).format('YYYY/MM/DD HH:mm:ss')
      this.editForm.orderTime = moment(this.editForm.orderTime).format('YYYY/MM/DD HH:mm:ss')
    }
    if (this.agentInfo.callTime !== '') {
      this.editForm.callTime = this.agentInfo.callTime
    }
    if (this.agentInfo.agentName !== 'admin' && this.agentInfo.agentName !== '') {
      this.editForm.orderService = this.agentInfo.agentName
    }
    if (this.agentInfo.recordNo !== '') {
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
