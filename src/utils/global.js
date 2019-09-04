/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
// export const baseUrl = 'http://cosavenir.vcyber.com:8031'
// 测试环境
// export const baseUrl = 'http://testcosavenir.vcyber.com:8031'
// 开发环境
export const baseUrl = 'http://localhost:8088'

// 第三方下单地址
export const rentOrderUrl = (data) => {
  const {userName, idNo, mobile, vin, avenirNo} = data
  // 测试地址
  // let url = `http://test.hibuick.com.cn/index.php/transfer_register/showAvenirAdd?username=${userName}&id_card_no=${idNo}&mobile=${mobile}&vin=${vin}&avenir_no=${avenirNo}`
  // 正式环境
  let url = `http://www.hibuick.com.cn/index.php/transfer_register/showAvenirAdd?username=${userName}&id_card_no=${idNo}&mobile=${mobile}&vin=${vin}&avenir_no=${avenirNo}`
  return url
}
// 第三方修改订单地址
export const rentOrderUpdate = (data) => {
  const {orderNo, userName, idNo, mobile, vin, avenirNo, openid} = data
  if (openid) {
    // 测试地址
    // return `http://test.hibuick.com.cn/index.php/transfer_register/showAvenirUpdate?order_id=${orderNo}&vin=${vin}&avenir_no=${avenirNo}&username=${userName}&mobile=${mobile}&id_card_no=${idNo}&openid=${openid}`
    // 正式地址
    return `http://www.hibuick.com.cn/index.php/transfer_register/showAvenirUpdate?order_id=${orderNo}&vin=${vin}&avenir_no=${avenirNo}&username=${userName}&mobile=${mobile}&id_card_no=${idNo}&openid=${openid}`
  } else {
    // 测试
    // return `http://test.hibuick.com.cn/index.php/transfer_register/showAvenirUpdate?order_id=${orderNo}&vin=${vin}&avenir_no=${avenirNo}&username=${userName}&mobile=${mobile}&id_card_no=${idNo}`
    // 正式地址
    return `http://www.hibuick.com.cn/index.php/transfer_register/showAvenirUpdate?order_id=${orderNo}&vin=${vin}&avenir_no=${avenirNo}&username=${userName}&mobile=${mobile}&id_card_no=${idNo}`
  }
}

// export default {
//   baseUrl: baseUrl,
//   orderUrl: (data) => rentOrderUrl(data)
// }
