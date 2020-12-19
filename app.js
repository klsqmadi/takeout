//app.js
import bus from './utils/util'
import {
  BASE_URL,
  WEB_SOCKET_URL,
  loading,
  hideLoading,
  totast
} from './services/config'
let token = wx.getStorageSync('token') || null
let id = wx.getStorageSync('id') || null
let shopId = wx.getStorageSync('shopId') || null
App({
  onLaunch: function () {
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
  onLoad() {
    loading('加载中')
  },
  onReady() {
    hideLoading()
  },
  onShow() {
    this.wsConnect()
    /* if(token && id){
      this.wsConnect()
    } */
  },
  wsConnect(sid = shopId, identity = 'shop', lastestOrderDate) {
    this.wsClose()
    loading('加载中')
    wx.connectSocket({
      url: WEB_SOCKET_URL,
      timeout: 50000,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        this.wsOpen(sid, identity = 'shop', lastestOrderDate)
        hideLoading()
      },
      fail: (res) => {}
    })
  },
  wsMessage() {
    wx.onSocketMessage((res) => {
      let a = {}
      if (res.data !== '服务器连接成功！') {
        a = JSON.parse(res.data)
        this.globalData.bus.emit('orderDataChange', a,a.currentStatus)
        if (a.currentStatus == 1 || a.currentStatus == 2) {
          totast('你有新订单啦', 1000)
        } else {
          totast('你有订单变化啦', 1000)
        }
      }
    })
  },
  wsSend(sid, identity, lastestOrderDate) {
    if (lastestOrderDate) {
      wx.sendSocketMessage({
        data: JSON.stringify({
          sid,
          identity,
          lastestOrderDate
        }),
        success: res => {
          console.log('send', res);
          this.wsMessage()
        }
      })
    } else {
      wx.sendSocketMessage({
        data: JSON.stringify({
          sid,
          identity,
        }),
        success: res => {
          console.log('send', res);
          this.wsMessage()
        }
      })
    }
  },
  wsOpen(sid, identity, lastestOrderDate) {
    wx.onSocketOpen((result) => {
      console.log('open', result);

      this.wsSend(sid, identity, lastestOrderDate)
    })
  },
  wsClose() {
    wx.onSocketClose((result) => {

    })
  },
  globalData: {
    /**
     * 自定义导航栏 全局变量
     */
    StatusBar: null,
    Custom: null,
    CustomBar: null
  },

})