// pages/wxLogin/wxLogin.js
import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_SUCCESSE,
  BASE_URL,
  STATUS_CODE_loginShop_SUCCESS,
  API_URL_loginShop,
} from '../../services/config'
const app = getApp()
Page({
  data: {
    code:'',
    registerStatus:5
  },
  onLoad(option) {
    this.login()
    if(option.registerStatus){
      this.setData({
        registerStatus:option.registerStatus
      })
    }
  },
  login(){
    wx.setStorageSync('id', '')
    wx.setStorageSync('token', '')
    wx.setStorageSync('shopId', '')
    wx.login({
      timeout: 1000,
      success:wxloginRes=>{
        if(wxloginRes){
          this.setData({
            code:wxloginRes.code
          })

        }
      },
      fail:res=>{
        this.login()
      }
    })
  },
  getPhone(res) {
    if (res.detail.errMsg == 'getPhoneNumber:ok') {
      /* console.log(this.data.code)
      console.log(res.detail.encryptedData)
      console.log(res.detail.iv) */
            wx.request({
              url: BASE_URL + API_URL_loginShop,
              method: 'POST',
              header:{
                'Content-Type':'application/x-www-form-urlencoded'
              },
              data: {
                code: this.data.code,
                encryptedData: res.detail.encryptedData,
                iv: res.detail.iv
              },
              success: apiRes => {
                if (apiRes && (apiRes.data.code == STATUS_CODE_SUCCESSE || apiRes.data.code == STATUS_CODE_loginShop_SUCCESS) ){
                  wx.setStorageSync('id',apiRes.data.data.businessId)
                  wx.setStorageSync('token',apiRes.data.data.businessToken)
                  if(apiRes.data.data.shopId) wx.setStorageSync('shopId',apiRes.data.data.shopId)
                  // wx.setStorageSync('isRegister', apiRes.data.data.isRegister)
                  if(apiRes.data.data.isRegister == 1){
                    app.wsConnect()
                    wx.switchTab({
                      url:'/pages/work/work'
                    })
                  }else if(apiRes.data.data.isRegister == 0){
                    this.setData({
                      registerStatus:apiRes.data.data.isRegister
                    })
                  }else if(apiRes.data.data.isRegister == 2 || apiRes.data.data.isRegister == 3){
                    wx.navigateTo({
                      url: '/pages/registerFail/registerFail?shopFlag=' + apiRes.data.data.isRegister,
                    })
                  }else{
                    wx.navigateTo({
                      url: '/pages/registerFail/registerFail?shopFlag=4',
                    })
                  }
                } else if(apiRes.data.code == 1544 || apiRes.data.code == 1504){
                  totast('登录超时',2000,'error')
                  // totast(apiRes.data.data,1500)
                  this.login()
                }else{
                  this.login()
                  totast('登录失败', 2000,'error')
                  // totast(apiRes.data.data,1500)
                }
                hideLoading()
              },
              fail: apiFail => {
                hideLoading()
                totast('登录失败', 2000,'error')
              }
            })
          loading('加载中')
    } else if (res.detail.errMsg == 'getPhoneNumber:fail user deny') {
      totast('授权失败',2000,'error')
    }
  },
  goToRegister(){
    wx.navigateTo({
      url: '/pages/shopRegister/shopRegister',
    })
  }
})