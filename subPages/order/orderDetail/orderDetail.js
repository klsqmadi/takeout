import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_modifyOrderStatus_SUCCES,
  STATUS_CODE_refundMoneyToWX_SUCCESS,
  STATUS_CODE_modifyOrderStatus_deliveryGoods_SUCCESS
} from '../../../services/config'
import {
  modifyOrderStatus,
  refundMoneyToWX,
  modifyOrderStatus_deliveryGoods,
  oncePaySharing
} from '../../../services/order'
const app = getApp()
//获取app.js的eventBus
let bus = app.globalData.bus
Page({
  data: {
    item: {
      ringCustomer: 12345678900,
      ringExpressman: 98765432100,
      shopName: '测试测试测试测试',
      time: '1111-1111-1111 11:11:11',
      orderState: '待接单',
      orderNumber: '1111 1111 1111 1111 1111',
      image: '',
      items: [{
          itemName: '测试测试',
          price: 11.11,
          number: 1,
          specification: '测试测试/测试测试/测试测试'
        },
        {
          itemName: '测试测试测试',
          price: 11.11,
          number: 1,
          specification: '测试/测试/测试'
        },
        {
          itemName: '测试测试测试测试',
          price: 11.11,
          number: 11,
          specification: '测试测试测试/测试测试测试/测试测试测试'
        }
      ],
      itemsNumber: 1,
      money: 11.11,
      freight: 11,
      remarks: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      address: '测试测试测试-测试测试测试测试测试测试测试测试测试测试测试测试(测试测试) 11111111111',
      deliveredMethod: '测试测试'
    },
    currentModalType: '',
    telephoneNumber: 10000000000,
    name: '',
    currentTelephone: 'customer',
    ring: null
  },
  onLoad(options) {
    loading('加载中')
    //拿到由父页面传过来的对象参数item,通过url传输过来
    if (options.item) {
      const item = JSON.parse(options.item)
      console.log(item);
      this.setData({
        item: item
      })
    }
  },
  onReady() {
    wx.hideLoading()
  },
  onUnload() {
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
  confirmRefuseOrder() {
    //遍历order 与orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    const {
      item
    } = this.data
    const {
      id,
      orderNumber,
      orderId,
      userId,
      orderState,
      money
    } = item
    modifyOrderStatus(id, orderNumber, orderId, userId, 3).then(res => {
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES) {
        refundMoneyToWX(orderNumber, money, '商家主动退款').then(res => {
          if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_refundMoneyToWX_SUCCESS) {
            item.orderState = '拒绝接单'
            item.status = 5
            this.setData({
              item: this.data.item
            })
            totast('拒绝接单成功',2000,'success')
          } else {
            totast('拒接接单失败', 2000,'error')
          }
        })
      } else {
        totast('拒接接单失败', 1500,'error')
      }
      hideLoading()
      this.hideModal()
    })
  },
  refuseReceiveOrder(e) {
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    this.showModal(e, 'show')
  },
  acceptOrder(e) {
    //遍历order 与orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    const {
      item
    } = this.data
    const {
      id,
      orderNumber,
      orderId,
      userId
    } = item
    modifyOrderStatus(id, orderNumber, orderId, userId, 2).then(res => {
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES) {
        item.orderState = '待发货'
        item.status = 2
        item.isReserved?(item.isDelivered = 0):(item.isDelivered = 1)
        totast('接单成功',2000,'success')
        this.setData({
          item: this.data.item
        })
      } else {
        totast('接单失败', 1500,'error')
      }
    })
    hideLoading()
  },
  completeOrder(e) {
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    this.showModal(e, 'completeOrder')
  },
  confirmCompleteOrder(e) {
    const {
      item
    } = this.data
    const {
      id,
      orderNumber,
      orderId,
      userId,
      money,
      freight
    } = item
    modifyOrderStatus(id, orderNumber, orderId, userId, 10).then(res => {
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES) {
        oncePaySharing(orderNumber, money,freight,wx.getStorageSync('shopId')).then(res=>{
          if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_refundMoneyToWX_SUCCESS){
            item.orderState = '交易完成'
            item.status = 4
            this.setData({
              item: this.data.item
            })
            totast('订单已完成',2000,'success')
          }else{
            totast('订单完成失败', 2000,'error')
          }
        })
      } else {
        totast('完成订单失败', 1500,'error')
      }
      hideLoading()
      this.hideModal()
    })
  },
  shopSend(e) {
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    this.showModal(e, 'shopSend')
  },
  refund(e) {
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    this.showModal(e, 'refund')
  },
  shopDelivered(e){
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    this.showModal(e, 'shopDelivered')
  },
  confirmShopDelivered(){
    const {
      item
    } = this.data
    const {
      id,
      orderNumber,
      orderId,
      userId,
      orderState,
      money
    } = item
      loading('加载中')
      this._modifyOrderStatus(id, orderNumber, orderId, userId, 11).then(res=>{
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES)){
          item.orderState = '待送达'
          item.status = 3
          this.setData({
            item:this.data.item
          })
          totast('操作成功',2000,'success')
        }else{
          totast('操作失败,请重试',2000,'error')
        }
        hideLoading()
        this.hideModal()
      })
  },
  confirmRefund(e) {
    const {
      item
    } = this.data
    const {
      id,
      orderNumber,
      orderId,
      userId,
      orderState,
      money
    } = item
    loading('更改中')
    if (orderState == '待发货') {
      modifyOrderStatus(id, orderNumber, orderId, userId, 4).then(res => {
        if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES) {
          refundMoneyToWX(orderNumber, money, '商家主动退款').then(res => {
            if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_refundMoneyToWX_SUCCESS) {
              item.orderState = '已退款'
              item.status = 5
              this.setData({
                item: this.data.item
              })
              totast('退款成功', 2000,'success')
            } else {
              totast('退款失败,请重试', 2000,'error')
            }
          })
        } else {
          totast('系统错误,退款失败,请重试', 2000,'error')
        }
        this.hideModal()
        hideLoading()
      })
    } else if (orderState == '待送达') {
      this._modifyOrderStatus(id, orderNumber, orderId, userId, 5).then(res => {
        if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES) {
          refundMoneyToWX(orderNumber, money, '商家主动退款').then(res => {
            if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_refundMoneyToWX_SUCCESS) {
              item.orderState = '已退款'
              item.status = 5
              this.setData({
                item: this.data.item
              })
              totast('退款成功', 2000,'success')
            } else {
              totast('退款失败', 2000,'error')
            }
          })
        } else {
          totast('退款失败', 2000,'error')
        }
      })
      this.hideModal()
      hideLoading()
    }
  },
  confirmShopSend(e) {
    const {
      item
    } = this.data
    loading('发货中')
    modifyOrderStatus_deliveryGoods(item.id).then(res => {
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_deliveryGoods_SUCCESS) {
        item.isDelivered = 1
        this.setData({
          item: this.data.item,
          currentModalType: ''
        })
        totast('发货成功', 2000,'success')
      } else {
        totast('发货失败', 2000,'error')
      }
      hideLoading()
    })
  },
  /**
   * 电话联系 客户或骑手 模块
   */
  ringCustomer(e) {
    const {
      item
    } = this.data
    this.setData({
      telephoneNumber: item.userPhone,
      name: item.userName,
      currentTelephone: 'customer'
    })
    this.showModal(e, 'bottomModal')
  },
  ringExpressman(e) {
    const {
      item
    } = this.data
    this.setData({
      telephoneNumber: item.riderPhone,
      name: item.riderName,
      currentTelephone: 'expressman'
    })
    this.showModal(e, 'bottomModal')
  },
  confirmRing() {
    if (this.data.currentTelephone == 'customer') {
      this.setData({
        telephoneNumber: null,
        name: '',
        ring: '呼叫客户'
      })
    } else if (this.data.currentTelephone == 'expressman') {
      this.setData({
        telephoneNumber: null,
        name: '',
        ring: '呼叫骑手'
      })
    }
  },
  copyPhoneNumber() {
    wx.setClipboardData({
      data: this.data.telephoneNumber,
      success: () => {
        totast('复制成功', 1500,'success')
        this.hideModal()
      },
      fail: () => {
        totast('复制失败,请重试', 1500,'error')
        this.hideModal()
      }
    })
  }
})