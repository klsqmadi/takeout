import {
   loading 
  } from '../../../services/config'

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
    name:'',
    currentTelephone:'customer',
    ring:null
  },
  onLoad(options){
    loading('加载中')
    //拿到由父页面传过来的对象参数item,通过url传输过来
    if(options.item){
      const item = JSON.parse(options.item)
      console.log(item);
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
    //遍历order 与orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    const {currentType,currentClickIndex,orders} = this.data
    const {orderNumber,id,orderId,userId} = orders[currentType].list[currentClickIndex]
    this._modifyOrderStatus(id,orderNumber,orderId,userId,3).then(res=>{
      if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES){
        if(currentType == 'all'){
          orders[currentType].list[currentClickIndex].orderState = '拒绝接单'
          orders[currentType].list[currentClickIndex].status = 3
          for (const [key,item] of orders['pendingOrders'].list.entries()) {
            if(item.orderNumber == orderNumber){
              orders['pendingOrders'].list.splice(key,1)
              break
            }
          }
        }else if(currentType == 'pendingOrders'){
          for (const [key,item] of orders['all'].list.entries()) {
            if(item.orderNumber == orderNumber){
              orders['all'].list[key].orderState = '拒绝接单'
              orders['all'].list[key].status = 3
              orders['all'].pleaseRefresh = false
              break
            }else{
              orders['all'].pleaseRefresh = true
            }
          }
          orders[currentType].list.splice(currentClickIndex,1)
        }
        this.setData({
          orders:orders
        })
      }else{
        totast('系统错误,接单失败,请重试',1500)
      }
      hideLoading()
      this.hideModal()
    })
  },
  refuseReceiveOrder(e){
    this.setData({
      currentClickIndex:e.currentTarget.dataset.index
    })
    this.showModal(e,'show')
  },
  async acceptOrder(e){
    //遍历order 与orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    this.setData({
      currentClickIndex:e.currentTarget.dataset.index
    })
    const {currentType,currentClickIndex,orders} = this.data
    const {orderNumber,orderId,id,userId} = orders[currentType].list[currentClickIndex]
    let index = null;
    await this._modifyOrderStatus(id,orderNumber,orderId,userId,2).then(res=>{
      if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES){
        if(currentType == 'all'){
          orders[currentType].list[currentClickIndex].orderState = '待发货'
          orders[currentType].list[currentClickIndex].status = 2
          for (const [key,item] of orders['pendingOrders'].list.entries()) {
            if(item.orderNumber == orderNumber){
              item.orderState = '待发货'
              item.status = 2
              orders['pendingDelivered'].list.push(item)
              orders['pendingOrders'].list.splice(key,1)
              break
            }
          }
        }else if(currentType == 'pendingOrders'){
          for (const [key,item] of orders['all'].list.entries()) {
            if(item.orderNumber == orderNumber){
              item.orderState = '待发货'
              item.status = 2
              orders['all'].pleaseRefresh = false
              break
            }else{
              orders['all'].pleaseRefresh = true
            }
          }
          orders[currentType].list[currentClickIndex].status = 2
          orders[currentType].list[currentClickIndex].orderState = '待发货'
          orders['pendingDelivered'].list.push(orders[currentType].list[currentClickIndex])
          orders[currentType].list.splice(currentClickIndex,1)
        }
      }else{
        totast('系统错误,订单状态修改失败,请重试',1500)
      }
    })
    hideLoading()
    this.setData({
      orders:this.data.orders
    })
  },
  completeOrder(e){
    this.setData({
      currentClickIndex:e.currentTarget.dataset.index
    })
    this.showModal(e,'completeOrder')
  },
  confirmCompleteOrder(e){
    const {currentType,currentClickIndex,orders} = this.data
    const {orderNumber,id,orderId,userId} = orders[currentType].list[currentClickIndex]
    this._modifyOrderStatus(id,orderNumber,orderId,userId,10).then(res=>{
      hideLoading()
      if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES){
        if(currentType == 'all'){
          orders[currentType].list[currentClickIndex].orderState = '交易完成'
          orders[currentType].list[currentClickIndex].status = 10
          for (const [key,item] of orders['pendingDelivered'].list.entries()) {
            if(item.orderNumber == orderNumber){
              orders['pendingDelivered'].list.splice(key,1)
              break
            }
          }
        }else if(currentType == 'pendingDelivered'){
          for (const [key,item] of orders['all'].list.entries()) {
            if(item.orderNumber == orderNumber){
              orders['all'].list[key].orderState = '交易完成'
              orders['all'].list[key].status = 10
              orders['all'].pleaseRefresh = false
              break
            }else{
              orders['all'].pleaseRefresh = true
            }
          }
          orders[currentType].list.splice(currentClickIndex,1)
        }
        this.setData({
          orders:orders
        })
      }else{
        totast('系统错误,完成订单失败,请重试',1500)
      }
      this.hideModal()
    })
  },
  shopSend(e){
    
  },
  refund(e){
    this.setData({
      currentClickIndex:e.currentTarget.dataset.index
    })
    this.showModal(e,'refund')
  },
  confirmRefund(e){
    const {currentType,currentClickIndex,orders} = this.data
    const {orderNumber,id,orderId,userId,orderState} = orders[currentType].list[currentClickIndex]
    if(orderState == '待发货'){
      this._modifyOrderStatus(id,orderNumber,orderId,userId,4).then(res=>{
        if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES){
          if(currentType == 'all'){
            orders[currentType].list[currentClickIndex].orderState = '已退款'
            orders[currentType].list[currentClickIndex].status = 5
            for (const [key,item] of orders['pendingDelivered'].list.entries()) {
              if(item.orderNumber == orderNumber){
                orders['pendingDelivered'].list.splice(key,1)
                break
              }
            }
          }else if(currentType == 'pendingDelivered'){
            for (const [key,item] of orders['all'].list.entries()) {
              if(item.orderNumber == orderNumber){
                orders['all'].list[key].orderState = '已退款'
                orders['all'].list[key].status = 5
                orders['all'].pleaseRefresh = false
                break
              }else{
                orders['all'].pleaseRefresh = true
              }
            }
            orders[currentType].list.splice(currentClickIndex,1)
          }
          this.setData({
            orders:orders
          })
        }else{
          totast('系统错误,接单失败,请重试',1500)
        }
        hideLoading()
        this.hideModal()
      })
    }else if(orderState == '待送达'){
      this._modifyOrderStatus(id,orderNumber,orderId,userId,5).then(res=>{
        if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES){
          if(currentType == 'all'){
            orders[currentType].list[currentClickIndex].orderState = '已退款'
            orders[currentType].list[currentClickIndex].status = 5
            for (const [key,item] of orders['pendingArrive'].list.entries()) {
              if(item.orderNumber == orderNumber){
                orders['pendingArrive'].list.splice(key,1)
                break
              }
            }
          }else if(currentType == 'pendingArrive'){
            for (const [key,item] of orders['all'].list.entries()) {
              if(item.orderNumber == orderNumber){
                orders['all'].list[key].orderState = '已退款'
                orders['all'].list[key].status = 5
                orders['all'].pleaseRefresh = false
                break
              }else{
                orders['all'].pleaseRefresh = true
              }
            }
            orders[currentType].list.splice(currentClickIndex,1)
          }
          this.setData({
            orders:orders
          })
        }else{
          totast('系统错误,接单失败,请重试',1500)
        }
        hideLoading()
        this.hideModal()
      })
    }
  },
  /**
   * 电话联系 客户或骑手 模块
   */
  ringCustomer(e){
    const {item} = this.data
    this.setData({
      telephoneNumber:item.userPhone,
      name:item.userName,
      currentTelephone:'customer'
    })
    this.showModal(e,'bottomModal')
  },
  ringExpressman(e){
    const {item} = this.data
    this.setData({
      telephoneNumber:item.riderPhone,
      name:item.riderName,
      currentTelephone:'expressman'
    })
    this.showModal(e,'bottomModal')
  },
  confirmRing(){
    if(this.data.currentTelephone == 'customer'){
      this.setData({
        telephoneNumber:null,
        name:'',
        ring:'呼叫客户'
      })
    }else if(this.data.currentTelephone == 'expressman'){
      this.setData({
        telephoneNumber:null,
        name:'',
        ring:'呼叫骑手'
      })
    }
  }
})