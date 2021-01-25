// subPages/order/takeCash/takeCash.js
import{
  getCurrentTime
}from '../../../utils/getCurrentTime'
import {
  STATUS_CODE_getSaleHistory_SUCCESS,
  STATUS_CODE_getOrderHistory_SUCCESS,
   STATUS_CODE_SUCCESSE, totast, hideLoading, loading
}from  '../../../services/config.js'
import {
  getSaleHistory,
  getOrderHistory
}from '../../../services/work'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seleteTime: {
      date: '',
      start: '2020-01-01',
      end: '',
      totalIncome: 0,
      monthlyIncome:0,
      monthlyOrderQuantity:0,
      pageNumber:1,
      totalPages:1
    },
    incomeDetail: [
    ]
  },
  async onLoad(){
    await this.initTime()
    await this.getOrderHistory()
    this.getSaleHistory()
  },
  onReachBottom(){
    this.getOrderHistory()
  },
  getOrderHistory(){
    let {seleteTime,incomeDetail} = this.data
    loading('加载中')
    if(seleteTime.totalPages >= seleteTime.pageNumber){
      getOrderHistory(seleteTime.date,seleteTime.pageNumber).then(res=>{
        if(res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getOrderHistory_SUCCESS)){
          seleteTime.pageNumber += 1
          seleteTime.totalPages =  res.data.data.pages
          for (const item of res.data.data.list) {
            incomeDetail.push(item)
          }
          this.setData({
            seleteTime:this.data.seleteTime,
            incomeDetail:this.data.incomeDetail
          })
        }else{
          totast('订单历史加载失败,请重试',2000)
        }
        hideLoading()
      })
    }else{
      totast('已经没有更多订单啦!!!', 2000)
    }
  },
  getSaleHistory(){
    const {seleteTime} = this.data
    loading('加载中')
    getSaleHistory(seleteTime.date).then(res=>{
      if(res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getSaleHistory_SUCCESS)){
        seleteTime.monthlyIncome = res.data.data.monthlyIncome.toFixed(2)
        seleteTime.monthlyOrderQuantity = res.data.data.monthlyOrderQuantity
        seleteTime.totalIncome = res.data.data.dailyIncome.toFixed(2)
        this.setData({
          seleteTime:this.data.seleteTime
        })
      }else{
        totast('订单历史加载失败,请重试',2000)
      }
      hideLoading()
    })
  },
  initTime(){
    const {seleteTime} = this.data
    seleteTime.date = getCurrentTime()
    seleteTime.end = getCurrentTime()
    this.setData({
      seleteTime:this.data.seleteTime
    })
  },
  async dateChange(e) {
    let {seleteTime} = this.data
    seleteTime.date = e.detail.value
    seleteTime.pageNumber = 1
    seleteTime.totalPages = 1
    await this.setData({
      seleteTime:this.data.seleteTime,
      incomeDetail:[]
    })
    await this.getOrderHistory()
    this.getSaleHistory()
  }
})