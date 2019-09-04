import axios from '../axios'

/*
 * 统计模块
 */

// 接送姐统计
export const countAirport = (data) => {
  return axios({
    url: '/statistics/countByAirport',
    method: 'post',
    data
  })
}
// 取送车统计
export const countPickup = (data) => {
  return axios({
    url: '/statistics/countByPickup',
    method: 'post',
    data
  })
}
// 租车统计
export const countRent = (data) => {
  return axios({
    url: '/statistics/countByRent',
    method: 'post',
    data
  })
}
// 单量统计
export const countTotal = (data) => {
  return axios({
    url: 'count/countTotal',
    method: 'post',
    data
  })
}
// 按类型统计
export const countType = (data) => {
  return axios({
    url: '/count/countType',
    method: 'post',
    data
  })
}
export const countExper = (data) => {
  return axios({
    url: '/count/countExper',
    method: 'post',
    data
  })
}
