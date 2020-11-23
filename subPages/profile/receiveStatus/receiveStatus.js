// subPages/profile/receiveStatus/receiveStatus.js
import {
  modifyReceiveStatu
}from '../../../services/profile'
import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_modifyReceiveStatus_SUCCESS
} from '../../../services/config'
Page({
  data: {
    currentStatus:'自动接单',
    currentModalType:'',
    changeStatus:''
  },
  onLoad(){
    loading('加载中')
    const currentPage = getCurrentPages()
    this.setData({
      currentStatus: currentPage[0].data.receiveStatus
    })
  },
  onReady(){
    hideLoading()
  },
  _modifyReceiveStatus(autoStatus){
    return modifyReceiveStatu(autoStatus)
  },
  showModal(e, currentModalType) {
    currentModalType = currentModalType || e.currentTarget.dataset.currentmodaltype
    this.setData({
      currentModalType: currentModalType,
    })
  },
  hideModal(e) {
    this.setData({
      currentModalType: '',
    })
  },
  autoReceive(e){
    this.showModal(e,'show')
    this.setData({
      changeStatus:'自动接单',
    })
     
  },
  manualReceive(e){
    this.showModal(e,'show')
    this.setData({
      changeStatus:'手动接单',
    })
  },
  changeStatus(){
    const {changeStatus} = this.data
    const autoStatus = changeStatus == '自动接单'?1:0
    this._modifyReceiveStatus(autoStatus).then(res => {
      hideLoading()
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyReceiveStatus_SUCCESS) {
        if (changeStatus == '自动接单') {
          this.setData({
            currentStatus: '自动接单'
          })
        } else if (changeStatus == '手动接单') {
          this.setData({
            currentStatus: '手动接单'
          })
        }
      } else {
        totast('系统错误,更改失败',1500)
      }
      this.hideModal()
    })
  }
})