// pages/work/work.js
import {
  /* getShopTodayMoney,
  getShopTotalPayment,
  getShopOrdersPaymentNumber,
  getShopOrdersNumber */
  getShopWorkInfo1,
  getShopRegisterInfo
} from '../../services/work'
import {
  API_URL_getShopWorkInfo1,
  API_URL_getShopWorkInfo2,
  BASE_URL,
  loading,
  hideLoading,
  totast,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_getShopWorkInfo1_SUCCESS,
  STATUS_CODE_getShopWorkInfo2_SUCCESS
} from '../../services/config'
const app = getApp()
Page({
  data: {
    todayMoney: 0,
    visitors: 0,
    ordersPaymentNumber: 0,
    totalPayment: 0,
    pendingOrders: 0,
    pendingDelivered: 0,
    pendingArrive: 0,
    historicalOrdersNumber: 0,
    monthViews: 0,
    monthSales: 0,
  },
  onload() {

  },
  async onShow() {
    await app.flagHadSuccessRegisterShop()
    if (wx.getStorageSync('token') && wx.getStorageSync('id') && wx.getStorageSync('shopId')) {
      loading('加载中')
      await wx.request({
        url: BASE_URL + API_URL_getShopWorkInfo1,
        data:{
          shopId:wx.getStorageSync('shopId')
        },
        success:res=>{
          if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopWorkInfo1_SUCCESS)) {
            this.setData({
              todayMoney: res.data.data.todayIncome.toFixed(2),
              ordersPaymentNumber: res.data.data.todayOrderQuantity,
              totalPayment: res.data.data.todaySalesVolume,
              pendingOrders: res.data.data.waitToReceive,
              pendingDelivered: res.data.data.waitToDeliver,
              pendingArrive: res.data.data.waitToComplete,
              historicalOrdersNumber: res.data.data.monthlyOrderQuantity
            })
          } else {
            totast('系统错误,信息获取失败,请重新刷新', 1500)
          }
          hideLoading()
        },
        fail:res=>{
          hideLoading()
          totast('信息获取失败', 1500,'error')
        }
      })
      loading('加载中')
      wx.request({
        url:BASE_URL + API_URL_getShopWorkInfo2,
        data:{
          shopId:wx.getStorageSync('shopId')
        },
        method:'POST',
        header:{
          'Content-Type':'application/x-www-form-urlencoded'
        },
        success:res=>{
          if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopWorkInfo2_SUCCESS)) {
            this.setData({
              visitors:res.data.data.glanceCountAll,
              monthViews:res.data.data.glanceCountMonthly,
              monthSales:res.data.data.commoditySaleMonthly
            })
          } else {
            totast('信息获取失败', 1500,'error')
          }
          hideLoading()
        },
        fail:res=>{
          hideLoading()
          totast('信息获取失败', 1500,'error')
        }
      })
    }
  },
})