import axios from 'axios'
import { baseUrl } from '@/utils/global'

export const exportExcel = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: baseUrl + '/order/ExportDate',
      data: data,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
