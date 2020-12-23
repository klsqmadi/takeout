// pages/registerFail/registerFail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopFlag:2
  },
  onLoad: function (options) {
    if(options.shopFlag){
      this.setData({
        shopFlag:options.shopFlag
      })
    }
  },
})