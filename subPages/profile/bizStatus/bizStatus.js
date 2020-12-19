// subPages/profile/bizStatus/bizStatus.js
import {
  modifyBizStatus,
} from '../../../services/profile'
import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_modifyBizStatus_SUCCESS,
  STATUS_CODE_SUCCESSE
} from '../../../services/config'
Page({
  data: {
    currentStatus: '营业中',
    currentModalType: '',
    changeStatus: ''
  },
  onLoad() {
    loading('加载中')
    const currentPage = getCurrentPages()
    this.setData({
      currentStatus: currentPage[0].data.bizStatus == 2?'停业中':currentPage[0].data.bizStatus == 0?'营业中':'打烊'
    })
  },
  onReady() {
    hideLoading()
  },
  _modifyBizStatus(runStatus) {
    return modifyBizStatus(runStatus)
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
  openStore(e) {
    this.showModal(e, 'show')
    this.setData({
      changeStatus: '营业',
    })
  },
  closeStore(e) {
    this.showModal(e, 'show')
    this.setData({
      changeStatus: '打烊',
    })
  },
  changeStatus() {
    const {changeStatus} = this.data
    const runStatus = changeStatus == '营业'?0:1
    this._modifyBizStatus(runStatus).then(res => {
      hideLoading()
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyBizStatus_SUCCESS) {
        if (changeStatus == '营业') {
          this.setData({
            currentStatus: '营业'
          })
        } else if (changeStatus == '打烊') {
          this.setData({
            currentStatus: '打烊'
          })
        }
      } else {
        totast('系统错误,更改失败',1500)
      }
      this.hideModal()
    })
  }
})