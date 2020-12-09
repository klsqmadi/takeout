import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_getOrders_SUCCES,
  STATUS_CODE_SUCCESS,
  STATUS_CODE_getHadNewShopOrder_SUCCESS, STATUS_CODE_SUCCESSE
} from '../services/config'
import {
  getOrders,
  getHadNewShopOrder
}from '../services/order'

class orderPolling{
  constructor(status){
    this.status = status
    this.arr = ['pendingOrders','pendingDelivered','pendingArrive']
    this.type = this.arr[this.arr.indexOf(this.status)]
    this.orderNumber = ''
    this.hadOrderChange = false
    this.interval = ''
    this._getOrdersNumber(this.status)
  }
  _getOrdersNumber = (status,pageNum = 1,size = 1)=>{
    getOrders(pageNum,size,status).then(res=>{
      if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getOrders_SUCCES){
        this.orderNumber = res.data.data.list[0].orderNumber
      }else{
        totast('系统错误,获取订单编号失败,请重试',1500)
      }
    })
  }
  _getHadNewShopOrder = ()=>{
    getHadNewShopOrder(this.orderNumber,this.status)
  }
  /* startPolling = ()=>{
    this.interval = setTimeout(()=>{
      getHadNewShopOrder(this.orderNumber,this.status).then(res=>{
        if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getHadNewShopOrder_SUCCESS){
          if(res.data.data){
            this.hadOrderChange = true
            totast('有新的订单状态发生变化,请查看',2000)
            bus.emit('hadOrderChange')
          }else{
            this.hadOrderChange = false
            bus.remove('hadOrderChange')
          }
        }else{
          totast('系统错误,获取订单编号失败,请重试',1500)
        }
      })
    },5000)
  }
  stopPolling = ()=>{
    clearTimeout(this.interval)
  } */
}

/* export class polling{
  constructor(receiveStatus){
    this.interval = ''
    this.receiveStatus = receiveStatus
    this.pendingOrdersPolling = new orderPolling('pendingOrders')
    this.pendingDeliveredPolling = new orderPolling('pendingDelivered')
    this.pendingArrivePolling = new orderPolling('pendingArrive')
  }
  startpoll = ()=>{
    if(this.receiveStatus){
      if(!this.pendingDeliveredPolling.hadOrderChange){
        getApp().globalData.bus.remove('pendingDeliveredHadChange')
        if(!this.pendingArrivePolling.hadOrderChange){
          bus.remove('pendingArriveHadChange')
          this.interval = setTimeout(()=>{
            Promise.all([this.pendingDeliveredPolling._getHadNewShopOrder(),this.pendingArrivePolling._getHadNewShopOrder()]).then(res=>{
              hideLoading()
              this.pendingDeliveredPolling.hadOrderChange = res[0].data.data
              this.pendingArrivePolling.hadOrderChange = res[1].data.data
              this.startpoll()
            })
          },5000)
        }else{
          bus.emit('pendingArriveHadChange')
          this.interval = setTimeout(()=>{
            Promise.all(this.pendingDeliveredPolling._getHadNewShopOrder()).then(res=>{
              hideLoading()
              this.pendingDeliveredPolling.hadOrderChange = res[0].data.data
              this.startpoll()
            })
          },5000)
        }
      }else{
        bus.emit('pendingDeliveredHadChange')
        if(!this.pendingArrivePolling.hadOrderChange){
          bus.remove('pendingArriveHadChangeHadChange')
          Promise.all(this.pendingArrivePolling._getHadNewShopOrder()).then(res=>{
            hideLoading()
            this.pendingArrivePolling.hadOrderChange = res[1].data.data
            this.startpoll()
          })
        }else{
          bus.emit('pendingArriveHadChangeHadChange')
        }
      }

    }
  }
  stoppoll = (callback)=>{
    clearTimeout(this.interval)
    callback()
  }
} */

