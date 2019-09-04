import axios from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/order/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/order/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/order/findPage',
    method: 'post',
    data
  })
}

export const cancelOrder = (data) => {
  return axios({
    url: '/order/cancel',
    method: 'post',
    data
  })
}

export const countByVin = (data) => {
  return axios({
    url: '/order/countByVin',
    method: 'post',
    data
  })
}

export const exportExcel = (data) => {
  return axios({
    url: '/order/ExportDate',
    method: 'post',
    data
  })
}
