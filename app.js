//app.js
import bus from './utils/util'
App({
  onLaunch: function() {
    //全局注册eventBus,在子页面中通过getApp 拿到App实例,再App.globalData.bus拿到eventBus
    this.globalData.bus = bus
    /**
     * colorui自定义导航栏，获取手机info，适配屏幕尺寸
     */
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
},
  globalData: {
    /**
     * 自定义导航栏 全局变量
     */
    StatusBar:null,
    Custom:null,
    CustomBar:null
  }
})