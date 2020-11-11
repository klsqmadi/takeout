// subPages/profile/storeInfo/storeInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChangeButton:false,
    storeInfo:{
      storeImageUrl:null,
      storeName:'都发挥得更好的风格豆腐干地方是',
      sotreAddress:'不错v从v不错吧v吃不吃v吧v成本',
      sotreIntroduce:'库优衣库苦呀苦呀口语苦于',
      phoneNumber:12345678900
    },
    currentModalType:'',
    inputTitle:'',
    inputType:'',
    inputValue:'',
    showChangeButton:false
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
  eventInput(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  getInput(e,inputType){
    this.showModal(e,'show')
    this.data.inputType = e.currentTarget.dataset.inputtype
    const title = e.currentTarget.dataset.title
    const value = this.data.storeInfo[this.data.inputType]
    this.setData({
      inputType:this.data.inputType,
      inputValue:value,
      inputTitle:title
    })
  },
  confirm(){
    const {inputType,inputValue} = this.data
    const storeInfo = `storeInfo.${inputType}`
    this.setData({
      [storeInfo]:inputValue,
      showChangeButton:true
    })
    this.hideModal()
  }
})