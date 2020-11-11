const app = getApp()
//获取app.js的eventBus
let bus = app.globalData.bus
Page({
  data: {
    item:{
      ringCustomer:12345678900,
      ringExpressman:98765432100,
      shopName:'测试测试测试测试',
            time:'1111-1111-1111 11:11:11',
            orderState:'待接单',
            orderNumber:'1111 1111 1111 1111 1111',
            image:'',
            items:[
              {itemName:'测试测试',price:11.11,number:1,specification:'测试测试/测试测试/测试测试'},
              {itemName:'测试测试测试',price:11.11,number:1,specification:'测试/测试/测试'},
              {itemName:'测试测试测试测试',price:11.11,number:11,specification:'测试测试测试/测试测试测试/测试测试测试'}
            ],
            itemsNumber:1,
            money:11.11,
            freight:11,
            remarks:'测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
            address:'测试测试测试-测试测试测试测试测试测试测试测试测试测试测试测试(测试测试) 11111111111',
            deliveredMethod:'测试测试'
    },
    currentModalType:'',
    telephoneNumber:10000000000,
    currentTelephone:'customer',
    ring:null
  },
  onLoad(options){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    //拿到由父页面传过来的对象参数item,通过url传输过来
    if(options.item){
      const item = JSON.parse(options.item)
      item.ringCustomer = item.telephoneNumber || 12345678900
      item.ringExpressman = item.telephoneNumber || 98765432100
      this.setData({
        item:item
      })
    }
  },
  onReady(){
    wx.hideLoading()
  },
  onUnload(){
    bus.clear()
  },
  /**
   * 工具函数
   */
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
  /**
   * 接单或拒绝接单  模块
   */
  confirmRefuseOrder(){
    //eventBus 传到上一级页面
    const {item} = this.data
    bus.emit('confirmRefuseOrder',item.orderNumber)
    item.orderState = '拒绝接单'
    this.hideModal()
    this.setData({
      item:item
    })
  },
  refuseReceiveOrder(e){
    this.showModal(e,'show')
  },
  acceptOrder(){
    //eventBus 传到上一级页面
    const {item} = this.data
    item.orderState = '待发货'
    bus.emit('acceptOrder',item.orderNumber)
    this.setData({
      item:item
    })
  },
  /**
   * 电话联系 客户或骑手 模块
   */
  ringCustomer(e){
    const {item} = this.data
    this.setData({
      telephoneNumber:item.ringCustomer,
      currentTelephone:'customer'
    })
    this.showModal(e,'bottomModal')
  },
  ringExpressman(e){
    const {item} = this.data
    this.setData({
      telephoneNumber:item.ringExpressman,
      currentTelephone:'expressman'
    })
    this.showModal(e,'bottomModal')
  },
  confirmRing(){
    if(this.data.currentTelephone == 'customer'){
      this.setData({
        telephoneNumber:null,
        ring:'呼叫客户'
      })
    }else if(this.data.currentTelephone == 'expressman'){
      this.setData({
        telephoneNumber:null,
        ring:'呼叫骑手'
      })
    }
  }
})