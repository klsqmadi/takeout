// subPages/profile/receiveStatus/receiveStatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStatus:'自动接单',
    currentModalType:'',
    changeStatus:''
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
    if(this.data.changeStatus == '自动接单'){
      this.setData({
        currentStatus:'自动接单'
      })
    }else if(this.data.changeStatus == '手动接单'){
      this.setData({
        currentStatus:'手动接单'
      })
    }
    this.hideModal()
  }
  
})