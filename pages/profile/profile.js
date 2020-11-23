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
Page({
  data: {
    bizStatus: '停业中',
    receiveStatus: '自动接单',
    headImage:'',
    shopName:'默认店铺名字'
  },
  onLoad() {
    this._getShopInfo()
  },
  _getShopInfo() {
    getShopProfileInfo().then(res => {
      hideLoading()
      if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopInfo_SUCCESS){
        this.setData({
          bizStatus:res.data.data.runStatus,
          receiveStatus:res.data.data.autoOrder,
          headImage:BASE_URL+'/'+res.data.data.shopHead,
          shopName:res.data.data.shopName
        })
      }else{
        totast('系统错误',1500)
      }
    })
  }
})