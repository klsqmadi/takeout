import bus from './utils/util'
import {
  BASE_URL,
  WEB_SOCKET_URL,
  loading,
  hideLoading,
  totast,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_getShopRegisterInfo_SUCCES
} from './services/config'
import {
  getShopRegisterInfo
} from './services/work'
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
  },
  onReady() {
  },
  onShow() {
      this.wsConnect()
  },
  onHide(){
    this.wsClose()
    
  },
  flagHadSuccessRegisterShop(){
    if (wx.getStorageSync('id')) {
      getShopRegisterInfo().then(res => {
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopRegisterInfo_SUCCES) ){
          if (res.data.data.status == 0) {
            // let token = wx.getStorageSync('token') || null
              wx.redirectTo({
                url: '/pages/wxLogin/wxLogin?registerStatus=' + res.data.data.status,
              })
          } else if (res.data.data.status == 2 || res.data.data.status == 3) {
            wx.redirectTo({
              url: '/pages/registerFail/registerFail?shopFlag=' + res.data.data.status,
            })
          } else if (res.data.data.status == 1){
            wx.setStorageSync('shopId', res.data.data.shopId)
          }
        } else {
          totast('店铺注册信息获取失败,请重新注册',2000)
        }
        hideLoading()
      })
    }else{
      
    }
  },
  async wsConnect(sid = wx.getStorageSync('shopId'), identity = 'shop') {
    if(wx.getStorageSync('id') && wx.getStorageSync('shopId')){
      await this.wsClose()
      loading('加载中')
      wx.connectSocket({
        url: WEB_SOCKET_URL,
        timeout: 2000,
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          this.wsOpen(sid, identity = 'shop')
          hideLoading()
        },
        fail: (res) => {
          totast('订单实时更新失败,请尝试重新进入',3000)
        }
      })
    }
  },
  wsMessage() {
    wx.onSocketMessage((res) => {
      console.log('message',res);
      let a = {}
      if (res.data !== '服务器连接成功！') {
        a = JSON.parse(res.data)
        this.globalData.bus.emit('orderDataChange', a, a.currentStatus)
        if (a.currentStatus == 1) {
          totast('你有新订单啦', 1500,'success')
        } else {
          totast('你的订单变化啦', 1500,'success')
        }
      }
    })
  },
  wsSend(sid, identity) {
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
  },
  wsOpen(sid, identity) {
    wx.onSocketOpen((result) => {
      console.log('open', result);

      this.wsSend(sid, identity)
    })
  },
  wsClose() {
    wx.onSocketClose((result) => {
      console.log('close',result);
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