<template>
  <div class="page-container">
    <bread-crumb :title="bredcrumb"></bread-crumb>
    <!--工具栏-->
    <div class="toolbar" style="padding-top:15px;">
       <!-- <el-button type="primary" :size="size" @click="changeCount(1)">单量统计</el-button>
       <el-button type="primary" :size="size" @click="changeCount(2)">车型统计</el-button>
      <el-button type="primary" :size="size" @click="changeCount(3)">体验次数统计</el-button> -->
      <el-radio-group v-model="changeType" @change="changeCount">
        <el-radio-button v-for="(type, index) in rentTypeList" :label="index + 1" :key="index">{{ type }}</el-radio-button>
      </el-radio-group>
    </div>
     <!--表格树内容栏-->
    <div style="margin-top: 15px;">
      <el-table v-if="changeType === 1" :data="data"  max-height="480" stripe size="mini" style="width: 100%;" v-loading="loading" :element-loading-text="$t('action.loading')" :header-cell-style="{'background-color': 'rgb(217, 230, 249)'}">
        <el-table-column prop="createTime" header-align="center" align="center" min-width="150" label="时间" fixed :formatter="dateFormat"></el-table-column>
        <el-table-column prop="total" header-align="center" align="center" min-width="150" label="总单量" ></el-table-column>
        <el-table-column prop="completed" header-align="center" align="center" min-width="150" label="服务完成单量"></el-table-column>
        <el-table-column prop="cancel" header-align="center" align="center" min-width="150" label="取消单" ></el-table-column>
        <el-table-column prop="handle" header-align="center" align="center" min-width="90" label="进行中订单"></el-table-column>
        <el-table-column prop="person" header-align="center" align="center" min-width="90" label="人工端单量"></el-table-column>
        <el-table-column prop="wechat" header-align="center" align="center" min-width="90" label="微信端单量" ></el-table-column>
        <el-table-column prop="average" header-align="center" align="center" min-width="90" label="客价单" ></el-table-column>
      </el-table>
    </div>
   <div>
      <el-table v-if="changeType === 2" :data="data"  max-height="480" stripe size="mini" style="width: 100%;" v-loading="loading" :element-loading-text="$t('action.loading')" :header-cell-style="{'background-color': 'rgb(217, 230, 249)'}">
        <el-table-column prop="createTime" header-align="center" align="center" min-width="150" label="时间" fixed :formatter="dateFormat"></el-table-column>
        <el-table-column prop="sevenGl" header-align="center" align="center" min-width="150" label="2017款GL8" ></el-table-column>
        <el-table-column prop="eightJy" header-align="center" align="center" min-width="150" label="2018款君越"></el-table-column>
        <el-table-column prop="eightGl" header-align="center" align="center" min-width="150" label="2018款GL8" ></el-table-column>
        <el-table-column prop="nineJy" header-align="center" align="center" min-width="90" label="2019款君越"></el-table-column>
        <el-table-column prop="nineGl" header-align="center" align="center" min-width="90" label="2019款GL8"></el-table-column>
      </el-table>
   </div>
   <div>
    <el-table v-if="changeType === 3" :data="data"  max-height="480" size="mini" style="width: 100%;" v-loading="loading" :element-loading-text="$t('action.loading')" :header-cell-style="{'background-color': 'rgb(217, 230, 249)'}">
      <el-table-column prop="createTime" header-align="center" align="center" min-width="100" label="时间" fixed :formatter="dateFormat"></el-table-column>
      <el-table-column label="2017年GL8表现" align="center">
        <el-table-column prop="sevenGlOne" label="1 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="sevenGlSec" label="2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="sevenGlThr" label="> 2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column label="总计" align="center" width="100">
          <template slot-scope="scope">
            {{(scope.row.sevenGlOne != undefined ? scope.row.sevenGlOne : 0 ) + (scope.row.sevenGlSec != undefined ? scope.row.sevenGlSec : 0) + (scope.row.sevenGlThr != undefined ? scope.row.sevenGlThr : 0)}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="2018年GL8表现" align="center">
        <el-table-column prop="eightGlOne" label="1 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="eightGlSec" label="2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="eightGlThr" label="> 2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column label="总计" align="center" width="100">
          <template slot-scope="scope">
            {{(scope.row.eightGlOne != undefined ? scope.row.eightGlOne : 0 ) + (scope.row.eightGlSec != undefined ? scope.row.eightGlSec : 0) + (scope.row.eightGlThr != undefined ? scope.row.eightGlThr : 0)}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="2018年君越表现" align="center">
        <el-table-column prop="eightJyOne" label="1 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="eightJySec" label="2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="eightJyThr" label="> 2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column label="总计" align="center" width="100">
          <template slot-scope="scope">
            {{(scope.row.eightJyOne != undefined ? scope.row.eightJyOne : 0 ) + (scope.row.eightJySec != undefined ? scope.row.eightJySec : 0) + (scope.row.eightJyThr != undefined ? scope.row.eightJyThr : 0)}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="2019年GL8表现" align="center">
        <el-table-column prop="nineGlOne" label="1 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="nineGlSec" label="2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="nineGlThr" label="> 2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column label="总计" align="center" width="100">
          <template slot-scope="scope">
            {{(scope.row.nineGlOne != undefined ? scope.row.nineGlOne : 0 ) + (scope.row.nineGlSec != undefined ? scope.row.nineGlSec : 0) + (scope.row.nineGlThr != undefined ? scope.row.nineGlThr : 0)}}
          </template>
        </el-table-column>
      </el-table-column>
       <el-table-column label="2019年君越表现" align="center">
        <el-table-column prop="nineJyOne" label="1 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="nineJySec" label="2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column prop="nineJyThr" label="> 2 次" align="center" width="100" :formatter="formartData"> </el-table-column>
        <el-table-column label="总计" align="center" width="100">
          <template slot-scope="scope">
            {{(scope.row.nineJyOne != undefined ? scope.row.nineJyOne : 0 ) + (scope.row.nineJySec != undefined ? scope.row.nineJySec : 0) + (scope.row.nineJyThr != undefined ? scope.row.nineJyThr : 0)}}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
   </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import moment from 'moment'
export default {
  components: {
    BreadCrumb
  },
  props: {
    bredcrumb: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      size: 'medium',
      loading: false,
      rentTypeList: ['按单量统计', '按车型统计', '按体验次数统计'],
      changeType: 1
    }
  },
  methods: {
    changeCount (type) {
      let callback = res => {
        this.loading = false
      }
      if (type === 1) {
        this.changeType = 1
        this.$emit('handleCount', {id: 1, callback: callback})
      } else if (type === 2) {
        this.changeType = 2
        this.$emit('handleCount', {id: 2, callback: callback})
      } else {
        this.changeType = 3
        this.$emit('handleCount', {id: 3, callback: callback})
      }
    },
    // 时间格式化
    dateFormat (row, column, cellValue, index) {
      if (row[column.property]) {
        return moment(row[column.property]).format('YYYY')
      }
    },
    formartData (row, column, cellValue, index) {
      if (!row[column.property]) {
        return 0
      } else {
        return cellValue
      }
    }
  }
}
</script>

<style scoped>
</style>
