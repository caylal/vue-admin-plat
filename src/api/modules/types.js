import axios from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/type/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/type/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (params) => {
  return axios({
    url: '/type/findPage',
    method: 'get',
    params
  })
}
// 查询所有类型
export const findAll = () => {
  return axios({
    url: '/type/findAll',
    method: 'get'
  })
}
