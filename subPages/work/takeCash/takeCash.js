// subPages/order/takeCash/takeCash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onShow(){
    let token = wx.getStorageSync('token') || null
    let id = wx.getStorageSync('id') || null
    if (!token && !id) {
      wx.redirectTo({
        url: '/pages/wxLogin/wxLogin',
        success: res => {
          console.log(res);
        }
      })
    }
  }
})