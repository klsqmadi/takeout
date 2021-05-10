// pages/profile/profile.js
import {
  getShopProfileInfo
} from '../../services/profile'
import {
  BASE_URL,
  loading,
  hideLoading,
  totast,
  STATUS_CODE_getShopInfo_SUCCESS,
  STATUS_CODE_SUCCESSE
} from '../../services/config'
/* let token = wx.getStorageSync('token') || null
let id = wx.getStorageSync('id') || null */
Page({
  data: {
    bizStatus: 3,
    receiveStatus: 2,
    headImage:'',
    shopName:'未设置'
  },
  onLoad() {
   
  },
  _getShopInfo() {
    loading('加载中')
    getShopProfileInfo().then(res => {
      if(res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopInfo_SUCCESS)){
        this.setData({
          bizStatus:res.data.data.runStatus,
          receiveStatus:res.data.data.autoOrder,
          headImage:BASE_URL+'/'+res.data.data.shopHead,
          shopName:res.data.data.shopName,
          businessName:res.data.data.businessName
        })
      }else{
        totast('系统错误',2000,'error')
      }hideLoading()
    })
  },
  onShow(){
    this._getShopInfo()
  }
})