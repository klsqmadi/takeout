// pages/wxLogin/wxLogin.js
import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_SUCCESSE,
  BASE_URL,
  STATUS_CODE_loginShop_SUCCESS,
  API_URL_loginShop
} from '../../services/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:''
  },
  onLoad(option) {
    this.login()
  },
  login(){
    wx.login({
      timeout: 1000,
      success:wxloginRes=>{
        this.setData({
          code:wxloginRes.code
        })
      },
      fail:res=>{
        this.login()
      }
    })
  },
  getPhone(res) {
    if (res.detail.errMsg == 'getPhoneNumber:ok') {
            wx.request({
              url: BASE_URL + API_URL_loginShop,
              method: 'POST',
              header:{
                'Content-Type':'application/x-www-form-urlencoded'
              },
              data: {
                code: this.data.code,
                // code: '0535Ugll2UuM664WhIml2qqPZD35Ugl1',
                encryptedData: res.detail.encryptedData,
                iv: res.detail.iv
              },
              success: apiRes => {
                if (apiRes.data.code == STATUS_CODE_SUCCESSE || apiRes.data.code == STATUS_CODE_loginShop_SUCCESS) {
                  wx.setStorageSync('id',apiRes.data.data.businessId)
                  wx.setStorageSync('token',apiRes.data.data.businessToken)
                  wx.navigateBack({
                    delta: 1,
                  })
                } else if(apiRes.data.code == 1544 || apiRes.data.code == 1504){
                  totast('登录超时,请重试',1500)
                  this.login()
                }else{
                  this.login()
                  totast('登录失败,请重试', 1500)
                }
                hideLoading()
              },
              fail: apiFail => {
                hideLoading()
                totast('登录失败,请重试', 1500)
              }
            })
          loading('加载中')
    } else if (res.detail.errMsg == 'getPhoneNumber:fail user deny') {
      totast('授权失败,请重新授权',1500)
    }
  }
})