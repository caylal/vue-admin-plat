<template>
  <div class="page-container">
    <count-type :bredcrumb="bredcrumb" :data="dataList" @handleCount="handleCount"></count-type>
  </div>
</template>

<script>
import CountType from '@/components/CountType'
import { experData, countByExper } from '@/utils/datetime'
import moment from 'moment'
export default {
  components: {
    CountType
  },
  data () {
    return {
      size: 'medium',
      loading: false,
      bredcrumb: [{id: 1, title: '首页'}, {id: 2, title: '取送车管理'}, {id: 3, title: '取送车数据统计'}],
      dataList: [],
      changeType: 1
    }
  },
  methods: {
    // 类型统计
    countType (callback) {
      this.$api.count.countType({typeId: 4}).then(res => {
        console.log('pickup_countType', res.data)
        this.dataList = this.formatData(res.data)
      }).then(callback != null ? callback : '').catch(err => {
        this.$message({type: 'error', message: err})
      })
    },
    // 单量统计
    countTotal (callback) {
      this.$api.count.countTotal({typeId: 4}).then(res => {
        console.log('pickup_countTotal', res.data)
        this.dataList = res.data
      }).then(callback != null ? callback : '').catch(err => {
        this.$message({type: 'error', message: err})
      })
    },
    countExper (callback) {
      this.$api.count.countExper({typeId: 4}).then(res => {
        console.log('pickup_countExper', res.data)
        this.sevenGlData = this.formatExperData(res.data.sevenGl)
        this.eightGlData = this.formatExperData(res.data.eightGl)
        this.eightJyData = this.formatExperData(res.data.eightJy)
        this.nineGlData = this.formatExperData(res.data.nineGl)
        this.nineJyData = this.formatExperData(res.data.nineJy)
        this.dataList = experData({sevenGl: this.sevenGlData, eightGl: this.eightGlData, eightJy: this.eightJyData, nineGl: this.nineGlData, nineJy: this.nineJyData})
        console.log('sevenGl:', this.sevenGlData)
        console.log('eightGl:', this.eightGlData)
        console.log('eightJy:', this.eightJyData)
        console.log('nineGl:', this.nineGlData)
        console.log('nineJy:', this.nineJyData)
        console.log('exper_dataList:', this.dataList)
      }).then(callback != null ? callback : '').catch(err => {
        this.$message({type: 'error', message: err})
      })
    },
    handleCount (data) {
      if (data.id === 1) {
        this.countTotal(data.callback)
      } else if (data.id === 2) {
        this.countType(data.callback)
      } else {
        this.countExper(data.callback)
      }
    },
    // 格式化体验次数统计数据
    formatExperData (data) {
      let list = data.reduce((pre, current) => {
        let date = moment(current.useTime).year()
        pre[date] = pre[date] || []
        pre[date].push(current.count)
        return pre
      }, {})
      return countByExper(list)
    },
    // 格式化数据
    formatData (data) {
      if (data) {
        let beforeSeven = []
        let list = []
        data.forEach(item => {
          if (moment(item.useTime).isBefore('2017-01-01')) {
            beforeSeven.push(item)
          } else {
            let ll = {
              createTime: item.useTime,
              sevenGl: item.sevenGl,
              eightJy: item.eightJy,
              eightGl: item.eightGl,
              nineJy: item.nineJy,
              nineGl: item.nineGl
            }
            list.push(ll)
          }
        })
        console.log('list:', list)
        if (beforeSeven.length > 0) {
          list.forEach(item => {
            if (moment(item.createTime).isSame('2017-01-01', 'year')) {
              item.sevenGl = item.sevenGl + beforeSeven[0].sevenGl + beforeSeven[0].eightJy + beforeSeven[0].eightGl + beforeSeven[0].nineJy + beforeSeven[0].nineGl
            }
          })
        }
        return list
      }
    },
    // 时间格式化
    dateFormat (row, column, cellValue, index) {
      if (row[column.property]) {
        return moment(row[column.property]).format('YYYY')
      }
    }
  },
  mounted () {
    this.countTotal()
  }
}
</script>

<style scoped>
</style>
