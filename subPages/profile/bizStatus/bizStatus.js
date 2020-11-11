// subPages/profile/bizStatus/bizStatus.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStatus:'营业中',
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
  openStore(e){
    this.showModal(e,'show')
    this.setData({
      changeStatus:'营业',
    })
     
  },
  closeStore(e){
    this.showModal(e,'show')
    this.setData({
      changeStatus:'打烊',
    })
  },
  changeStatus(){
    if(this.data.changeStatus == '营业'){
      this.setData({
        currentStatus:'营业中'
      })
    }else if(this.data.changeStatus == '打烊'){
      this.setData({
        currentStatus:'打烊中'
      })
    }
    this.hideModal()
  }


  
})