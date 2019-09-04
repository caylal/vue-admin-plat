<template>
<div>
  <el-form :inline="true" :model="editForm" label-width="100px" ref="editForm" :rules="orderFormRules"  style="text-align:left;" :size="size" label-position="right">
    <el-form-item label="ID" prop="id" v-if="false">
      <el-input v-model="editForm.id" :disabled="true" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="来源" prop="orderType" style="width: 250px">
      <el-radio-group v-model="editForm.orderType" @change="changeType" :disabled="!operation">
        <el-radio v-for="(type, index) in sourceTypeList" :label="index + 1" :key="index" :disabled="index == 1">{{ type }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item style="width: 300px; text-align: center">
       <el-tag type="warning">当前为第 {{year}} 年：&nbsp; 总次数：{{editForm.user.pTotalCount}},&nbsp; &nbsp; 总已使用：{{editForm.user.pTotalUsed}}, &nbsp; &nbsp;  每年可使用：{{editForm.user.pCurrentCount}}, &nbsp;&nbsp; 第 {{year}} 年已使用： {{currentNum}}</el-tag>
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
    <el-form-item label="车型" prop="user.carType">
      <el-input v-model="editForm.user.carType" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="车牌号" prop="user.carLicense">
      <el-input v-model="editForm.user.carLicense" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="来电时间" prop="callTime" v-if="editForm.orderType == 1">
      <!-- <el-input v-if="operation" v-model="editForm.callTime" auto-complete="off" style="width: 300px"></el-input> -->
      <el-date-picker v-model="editForm.callTime" type="datetime" style="width: 300px" :disabled="detail"></el-date-picker>
    </el-form-item>
    <el-form-item label="用户地址" prop="userAddr">
      <el-input v-model="editForm.userAddr" type="textarea" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="经销商地址" prop="dealerAddr">
      <el-input v-model="editForm.dealerAddr" type="textarea" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="出发时间" prop="useTime">
      <el-date-picker v-model="editForm.useTime" type="datetime" style="width: 300px" :disabled="detail"></el-date-picker>
    </el-form-item>
    <el-form-item label="联系人姓名" prop="contactName">
      <el-input v-model="editForm.contactName" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="联系人电话" prop="contactTel">
      <el-input v-model="editForm.contactTel" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="上门取/送车" prop="useCarType" style="width: 400px" >
      <el-radio-group v-model="editForm.useCarType" :disabled="detail">
        <el-radio v-for="(type, index) in takeCarType" :label="index + 1" :key="index">{{ type }}</el-radio>
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
    <el-form-item label="记录客服" prop="orderService">
      <el-input v-model="editForm.orderService" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="录音编号" prop="recordNo">
      <el-input v-model="editForm.recordNo" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="订单号" prop="orderNo" v-if="!operation">
      <el-input v-model="editForm.orderNo" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="下单时间" prop="orderTime">
      <el-date-picker v-model="editForm.orderTime" type="datetime" style="width: 300px"></el-date-picker>
    </el-form-item>
    <el-form-item label="金额" prop="realityMoney" v-if="!operation">
      <el-input v-model="editForm.realityMoney" auto-complete="off" style="width: 300px" :disabled="detail"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark" size="large">
      <el-input v-model="editForm.remark" type="textarea" style="width: 710px" :rows="2" :disabled="detail"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button v-if="editForm.state !== 3 && !operation && editForm.state !== 2" :size="size" type="danger" @click="pickupCancelOrder" :loading="cancelLoading">取消订单</el-button>
    <el-button :size="size" type="primary" @click="submitPickupForm" :disabled="detail || editForm.state === 3 || (editForm.user.pTotalUsed >= editForm.user.pTotalCount && operation) || (editForm.user.pTotalUsed >= editForm.user.pTotalCount && !operation && orderStatus === 2) || (editForm.user.pCurrentCount <= currentNum && operation) || (editForm.user.pCurrentCount <= currentNum && !operation && orderStatus === 2)" :loading="orderLoading" >{{$t('action.submit')}}</el-button>
    <el-button :size="size" @click="pickipCancel">关闭</el-button>
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
          callTime: '',
          userAddr: '',
          dealerAddr: '',
          useTime: '',
          contactName: '',
          contactTel: '',
          useCarType: 1,
          isOrder: 2,
          completed: 2,
          expectMoney: '',
          realityMoney: '',
          orderService: '',
          recordNo: '',
          orderNo: '',
          orderTime: '',
          remark: ''
        }
      }
    },
    operation: Boolean, // true 添加，false 编辑
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
      takeCarType: ['取车', '送车'],
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
    // 改变下单类型
    changeType (val) {
    },
    // 取消提交
    pickipCancel () {
      this.$emit('pickupCancel')
    },
    pickupSubmit () {
      this.$emit('pickupSubmit', this.editForm.typeId)
    },
    // 重定向已存在订单
    redirectPage (data) {
      this.$emit('pickupRedirect', data.id)
    },
    // 触发提交
    submitPickupForm () {
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
                this.pickupSubmit()
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
    pickupCancelOrder () {
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
            this.pickupSubmit()
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
