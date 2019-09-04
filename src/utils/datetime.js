/**
 * 时间日期相关操作
 */

/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018-09-23 11:54:16
 * @param datetime 国际化日期格式
 */

export const formatDatetime = (date) => {
  return setTime(date)
}

const setTime = (date, add) => {
  if (date instanceof Date === false) {
    if (IEVersion() !== -1) {
      date = date.replace(new RegExp('-', 'g'), '/')
    }
  }
  const dateMat = date != null ? new Date(date) : new Date()
  const year = add ? dateMat.getFullYear() + add : dateMat.getFullYear()
  const month = dateMat.getMonth() + 1
  const day = dateMat.getDate()
  const hour = dateMat.getHours()
  const min = dateMat.getMinutes()
  const second = dateMat.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, min, second].map(formatNumber).join(':')
}

export const formatNumber = (n) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export const formatDueTime = (date, add) => {
  return setTime(date, add)
}

export const formatTime = second => {
  if (parseInt(second) > 60) {
    let sec = parseInt(second) % 60
    let min = parseInt(second / 60)
    if (min > 60) {
      min = parseInt(second / 60) % 60
      let hour = parseInt(parseInt(second / 60) / 60)
      if (hour > 24) {
        hour = parseInt(parseInt(second / 60) / 60) % 24
        let day = parseInt(parseInt(parseInt(second / 60) / 60) / 24)
        return day + ' 天 ' + [hour, min, sec].map(formatNumber).join(':')
      } else {
        return [hour, min, sec].map(formatNumber).join(':')
      }
    } else {
      return [0, min, sec].map(formatNumber).join(':')
    }
  }
}

export const IEVersion = () => {
  let userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  let isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    let fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 7
    } else if (fIEVersion === 8) {
      return 8
    } else if (fIEVersion === 9) {
      return 9
    } else if (fIEVersion === 10) {
      return 10
    }
  } else if (isEdge) {
    return 'edge'
  } else if (isIE11) {
    return 11
  } else {
    return -1 // 不是ie浏览器
  }
}
// 计算次数
export const countByExper = data => {
  let list = []
  Object.keys(data).map((key, item) => {
    let d = data[key]
    let o = 0
    let t = 0
    let thr = 0
    d.forEach(item => {
      item === 1 && o++
      item === 2 && t++
      item > 2 && thr++
    })
    let re = {
      createTime: key,
      one: o,
      two: t,
      three: thr
    }
    list.push(re)
  })
  return list
}
export const experData = (data) => {
  const { sevenGl, eightGl, eightJy, nineGl, nineJy } = data
  let list = []
  if (sevenGl.length > 0) {
    sevenGl.forEach(item => {
      let l = {createTime: item.createTime, sevenGlOne: item.one, sevenGlSec: item.two, sevenGlThr: item.three}
      list.push(l)
    })
  }
  if (eightGl.length > 0) {
    eightGl.forEach(item => {
      let exist = list.filter(val => val.createTime === item.createTime)
      if (exist.length > 0) {
        exist[0].eightGlOne = item.one
        exist[0].eightGlSec = item.two
        exist[0].eightGlThr = item.three
      } else {
        list.push({createTime: item.createTime, eightGlOne: item.one, eightGlSec: item.two, eightGlThr: item.three})
      }
    })
  }
  if (eightJy.length > 0) {
    eightJy.forEach(item => {
      let exist = list.filter(val => val.createTime === item.createTime)
      if (exist.length > 0) {
        exist[0].eightJyOne = item.one
        exist[0].eightJySec = item.two
        exist[0].eightJyThr = item.three
      } else {
        list.push({createTime: item.createTime, eightJyOne: item.one, eightJySec: item.two, eightJyThr: item.three})
      }
    })
  }
  if (nineGl.length > 0) {
    nineGl.forEach(item => {
      let exist = list.filter(val => val.createTime === item.createTime)
      if (exist.length > 0) {
        exist[0].nineGlOne = item.one
        exist[0].nineGlSec = item.two
        exist[0].nineGlThr = item.three
      } else {
        list.push({createTime: item.createTime, nineGlOne: item.one, nineGlSec: item.two, nineGlThr: item.three})
      }
    })
  }
  if (nineJy.length > 0) {
    nineJy.forEach(item => {
      let exist = list.filter(val => val.createTime === item.createTime)
      if (exist.length > 0) {
        exist[0].nineJyOne = item.one
        exist[0].nineJySec = item.two
        exist[0].nineJyThr = item.three
      } else {
        list.push({createTime: item.createTime, nineJyOne: item.one, nineJySec: item.two, nineJyThr: item.three})
      }
    })
  }
  let result = list.sort((a, b) => {
    return a.createTime - b.createTime
  })
  console.log('this.data: ', result)
  return result
}
