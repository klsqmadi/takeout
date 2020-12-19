// pages/work/work.js
import {
  /* getShopTodayMoney,
  getShopTotalPayment,
  getShopOrdersPaymentNumber,
  getShopOrdersNumber */
  getShopWorkInfo1
} from '../../services/work'
import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_getShopWorkInfo1_SUCCESS
  /* STATUS_CODE_getShopTodayMoney_SUCCESS,
  STATUS_CODE_getShopTotalPayment_SUCCESS,
  STATUS_CODE_getShopOrdersPaymentNumber_SUCCESS,
  STATUS_CODE_getShopOrderNumber_SUCCESS */
} from '../../services/config'
let shopId = wx.getStorageSync('shopId') || null
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
  onShow() {
    let token = wx.getStorageSync('token') || null
    let id = wx.getStorageSync('id') || null
    /* if (!token && !id) {
      wx.redirectTo({
        url: '/pages/wxLogin/wxLogin',
        success: res => {
          console.log(res);
        }
      })
    } */
    if (token && id) {
      this._getShopWorkInfo1().then(res => {
        hideLoading()
        if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopWorkInfo1_SUCCESS) {
          this.setData({
            todayMoney: res.data.data.todayIncome,
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
      })

    }
  },
  _getShopWorkInfo1() {
    return getShopWorkInfo1(shopId)
  }
})