import axios from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/user/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/user/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (params) => {
  return axios({
    url: '/user/findPage',
    method: 'get',
    params
  })
}
// 登录
export const login = data => {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}

// 登出
export const logout = () => {
  return axios({
    url: 'logout',
    method: 'get'
  })
}
