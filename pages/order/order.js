import {
  getOrders,
  getShopAllOrder,
  modifyOrderStatus,
  modifyOrderStatus_deliveryGoods,
  refundMoneyToWX,
  oncePaySharing
} from '../../services/order'
import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_getOrders_SUCCES,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_getShopAllOrder_SUCCESS,
  STATUS_CODE_modifyOrderStatus_SUCCES,
  STATUS_CODE_modifyOrderStatus_deliveryGoods_SUCCESS,
  STATUS_CODE_refundMoneyToWX_SUCCESS
} from '../../services/config'
import {
  dateFn
} from '../../utils/formatTime'
const app = getApp()
// pages/order/order.js
let bus = app.globalData.bus
/* let token = wx.getStorageSync('token') || null
let id = wx.getStorageSync('id') || null
let shopId = wx.getStorageSync('shopId') || null */
Page({
  data: {
    tabCurrentIndex: 0,
    currentType: 'all',
    currentClickIndex: null,
    orders: {
      all: {
        page: 0,
        newsRedDot: false,
        pleaseRefresh: false,
        totalPages: 1,
        list: [
          // {
          //   shopName:'CAT00000工作室',
          //   time:'2020-01-09 21:45:11',
          //   orderState:'待接单',
          //   orderNumber:1,
          //   image:'',
          //   items:[
          //     {goodsName:'海贼王三兄弟奶茶',totalPrice:9.99,quantity:2
          //   },
          //     {goodsName:'超级汉堡王',totalPrice:19.99,quantity:5},
          //     {goodsName:'海贼王无敌薯条',totalPrice:29.99,quantity:1}
          //   ],
          //   itemsNumber:7,
          //   money:0.01,
          //   freight:0.01,
          //   remarks:'不要葱不要蒜头',
          //   specification:'香辣鸡腿堡/川香鸡柳/百事可乐'
          // },

        ]
      },
      pendingOrders: {
        page: 0,
        newsRedDot: false,
        list: []
      },
      pendingDelivered: {
        page: 0,
        newsRedDot: false,
        list: []
      },
      pendingArrive: {
        page: 0,
        newsRedDot: false,
        list: []
      }
    },
    currentModalType: ''
  },
  async onLoad() {

  },
  onReady() {},
  async onShow() {
    await this.initOrders()
    await this._getShopAllOrder()
    await this._getOrders('pendingOrders')
    await this._getOrders('pendingDelivered')
    await this._getOrders('pendingArrive')
    const {
      orders
    } = this.data
    this.setData({
      orders: orders
    })
    bus.on('orderDataChange', (res) => {
      loading('订单状态变化')
      console.log('busOn', res);
      const statusArray1 = ['待接单', '待发货', '待送达', '交易完成', '退款','待发货']
      const data = res
      let list = {}
      if (data.data) {
        const item = data.data
        const good = {
          picSrc:item.commodities[0].picture,
          id: item.id,
          orderId: item.orderId,
          orderNumber: item.orderNumber,
          itemsNumber: 0,
          money: item.totalAmount,
          deliveryAddress: item.deliveryAddress,
          userPhone: item.userPhone,
          userName: item.userName,
          totalQuantity: item.totalQuantity,
          freight: item.deliveryFee,
          time: dateFn(item.date),
          completeTime: item.completeTime,
          orderState: statusArray1[item.status - 1] || '订单异常',
          deliveryStatus: item.deliveryStatus,
          status: item.status,
          isReserved: item.isReserved,
          reservedTime: item.reservedTime || '',
          remarks: item.remarks || '用户无备注',
          riderName: item.riderName,
          riderPhone: item.riderPhone,
          commodities: item.commodities,
          items: [],
          userId: item.userId,
          isDelivered: item.isDelivered == 0 ? 0 : 1
        }
        for (const item of good.commodities) {
          good.itemsNumber += item.quantity
        }
        if (good.commodities.length > 4) {
          good.items.push(good.commodities[0])
          good.items.push(good.commodities[1])
          good.items.push(good.commodities[2])
        } else if (good.commodities.length == 4) {
          good.items.push(good.commodities[0])
          good.items.push(good.commodities[1])
          good.items.push(good.commodities[2])
          good.items.push(good.commodities[3])
        } else {
          good.items.push(...good.commodities)
        }
        list = good
      }
      const orderStatus = data.currentStatus
      const statusArray = ['all', 'pendingOrders', 'pendingDelivered', 'pendingArrive', 'orderSuccess']
      if (orderStatus == 1) {
        const pendingOrders = this.data.orders[statusArray[orderStatus]]
        pendingOrders.list.push(list)
        pendingOrders.newsRedDot = true
      } else if (orderStatus == 2) {
        const pendingDelivered = this.data.orders[statusArray[orderStatus]]
        pendingDelivered.list.push(list)
        pendingDelivered.newsRedDot = true
      } else if (orderStatus == 3) {
        let tempList = {}
        const pendingDeliveredList = this.data.orders[statusArray[orderStatus - 1]].list
        const pendingArriveList = this.data.orders[statusArray[orderStatus]]
        pendingArriveList.newsRedDot = true
        for (const [key, item] of pendingDeliveredList.entries()) {
          if (item.orderNumber == data.orderNumber) {
            item.orderState = '待送达'
            tempList = JSON.parse(JSON.stringify(item))
            pendingArriveList.list.push(tempList)
            pendingDeliveredList.splice(key, 1)
            break
          }
        }
      } else if (orderStatus == 4) {
        const pendingArriveList = this.data.orders[statusArray[orderStatus - 1]].list
        for (const [key, item] of pendingArriveList.entries()) {
          if (item.orderNumber == data.orderNumber) {
            pendingArriveList.splice(key, 1)
            break;
          }
        }
      }else if(orderStatus == 6){
        const pendingDelivered = this.data.orders['pendingDelivered']
        for (const item of pendingDelivered.list) {
          if(item.orderNumber == list.orderNumber){
            item.riderId = list.riderId,
            item.riderName = list.riderName,
            item.riderPhone = list.riderPhone,
            item.status = 6
            break
          }
        }
        pendingDelivered.newsRedDot = true
      }
      this.data.orders['all'].pleaseRefresh = true
      this.setData({
        orders: this.data.orders
      })
      hideLoading()
    })
  },
  onHide() {
    bus.remove('orderDataChange')
  },
  onReachBottom() {
    if (this.data.tabCurrentIndex == 0) {
      const goods = this.data.orders['all']
      const statusArray = ['待接单', '待发货', '待送达', '交易完成', '已退款', '待发货']
      if (goods.totalPages > goods.page) {
        getShopAllOrder(goods.page + 1, 10, wx.getStorageSync('shopId')).then(res => {
          if (res && (res.data.code == STATUS_CODE_getShopAllOrder_SUCCESS || res.data.code == STATUS_CODE_SUCCESSE)) {
            if (res.data.data.list) {
              goods.page += 1;
              // this.data.orders['all'].list = []
              goods.newsRedDot = false
              goods.pleaseRefresh = false
              for (const item of res.data.data.list) {
                const good = {
                  picSrc:item.commodities[0].picture,
                  commodities: item.commodities,
                  completeTime: item.completeTime,
                  time: item.date || item.paymentTime || '',
                  deliveryAddress: item.deliveryAddress || '用户自取',
                  freight: item.deliveryFee,
                  deliveryStatus: item.deliveryStatus,
                  id: item.id,
                  isReserved: item.isReserved,
                  orderId: item.orderId,
                  orderNumber: item.orderNumber,
                  itemsNumber: 0,
                  orderState:/*  item.status == 1 ? '待接单' : item.status == 2 ? '待发货' : item.status == 3 ? '待送达' : item.status == 4 ? '交易完成' : '退款' */statusArray[item.status - 1] || '订单异常',
                  remarks: item.remarks || '无',
                  riderId:item.riderId,
                  riderName: item.riderName,
                  riderPhone: item.riderPhone,
                  status: item.status,
                  money: item.totalAmount,
                  totalQuantity: item.totalQuantity,
                  userPhone: item.userPhone,
                  userName: item.userName,
                  reservedTime: item.reservedTime || '非预定',
                  items: [],
                  userId: item.userId,
                  isDelivered: item.isDelivered == 0 ? 0 : 1
                }
                for (const item of good.commodities) {
                  good.itemsNumber += item.quantity
                }
                if (good.commodities.length > 4) {
                  good.items.push(good.commodities[0])
                  good.items.push(good.commodities[1])
                  good.items.push(good.commodities[2])
                } else if (good.commodities.length == 4) {
                  good.items.push(good.commodities[0])
                  good.items.push(good.commodities[1])
                  good.items.push(good.commodities[2])
                  good.items.push(good.commodities[3])
                } else {
                  good.items.push(...good.commodities)
                }
                goods.list.push(good)
              }
              this.setData({
                orders: this.data.orders
              })
            }
          } else {
            totast('系统错误,订单查询失败', 1500)
          }
          hideLoading()
        })
      } else {
        totast('已经没有更多订单啦!!!', 1500)
      }
    }
  },
  initOrders() {
    this.data.orders['all'].page = 0
    this.data.orders['all'].list = []
    this.data.orders['pendingOrders'].page = 0
    this.data.orders['pendingOrders'].list = []
    this.data.orders['pendingDelivered'].page = 0
    this.data.orders['pendingDelivered'].list = []
    this.data.orders['pendingArrive'].page = 0
    this.data.orders['pendingArrive'].list = []

  },
  async _getOrders(type, size = 10) {
    let shopId = wx.getStorageSync('shopId')
    const statusArray = ['待接单', '待发货', '待送达', '交易完成', '已退款', '待发货']
    const arr = ['pendingOrders', 'pendingDelivered', 'pendingArrive']
    const goods = this.data.orders[type]
    const status = arr.indexOf(type) + 1
    getOrders(goods.page + 1, size, status, shopId).then(async res => {
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getOrders_SUCCES)) {
        if (res.data.data.list) {
          goods.page += 1
          for (const item of res.data.data.list) {
            const good = {
              picSrc:item.commodities[0].picture,
              id: item.id,
              orderId: item.orderId,
              orderNumber: item.orderNumber,
              itemsNumber: 0,
              money: item.totalAmount,
              deliveryAddress: item.deliveryAddress || '自取',
              userPhone: item.userPhone,
              userName: item.userName,
              totalQuantity: item.totalQuantity,
              freight: item.deliveryFee,
              time: item.date || item.paymentTime || '',
              completeTime: item.completeTime,
              orderState: /* status == 1 ? '待接单' : status == 2 ? '待发货' : '待送达' */statusArray[item.status - 1] || '订单异常',
              deliveryStatus: item.deliveryStatus,
              status: item.status,
              isReserved: item.isReserved,
              reservedTime: item.reservedTime || '非预定',
              remarks: item.remarks || '无',
              riderId:item.riderId,
              riderName: item.riderName,
              riderPhone: item.riderPhone,
              commodities: item.commodities,
              items: [],
              userId: item.userId,
              isDelivered: item.isDelivered == 0 ? 0 : 1
            }
            for (const item of good.commodities) {
              good.itemsNumber += item.quantity
            }
            if (good.commodities.length > 4) {
              good.items.push(good.commodities[0])
              good.items.push(good.commodities[1])
              good.items.push(good.commodities[2])
            } else if (good.commodities.length == 4) {
              good.items.push(good.commodities[0])
              good.items.push(good.commodities[1])
              good.items.push(good.commodities[2])
              good.items.push(good.commodities[3])
            } else {
              good.items.push(...good.commodities)
            }
            goods.list.push(good)
          }
          const updateOldDate = this.data.orders[type]
          const updateNewDate = `orders.${type}`
          this.setData({
            [updateNewDate]: updateOldDate
          })
          if (res.data.data.pages > goods.page) {
            await this._getOrders(type)
          }
          this.setData({
            orders: this.data.orders
          })
        }
      } else {
        totast('系统错误,订单获取失败,请重新刷新', 1500)
      }
      hideLoading()
    })
  },
  _getShopAllOrder(pageSize = 10) {
    const goods = this.data.orders['all']
    const statusArray = ['待接单', '待发货', '待送达', '交易完成', '已退款', '待发货']
    getShopAllOrder(goods.page + 1, pageSize, wx.getStorageSync('shopId')).then(res => {
      if (res && (res.data.code == STATUS_CODE_getShopAllOrder_SUCCESS || res.data.code == STATUS_CODE_SUCCESSE)) {
        if (res.data.data.list) {
          goods.page += 1;
          goods.newsRedDot = false
          goods.pleaseRefresh = false
          goods.totalPages = res.data.data.pages
          for (const item of res.data.data.list) {
            const good = {
              picSrc:item.commodities[0].picture,
              commodities: item.commodities,
              completeTime: item.completeTime,
              time: item.date || item.paymentTime || '',
              deliveryAddress: item.deliveryAddress || '用户自取',
              freight: item.deliveryFee,
              deliveryStatus: item.deliveryStatus,
              id: item.id,
              isReserved: item.isReserved,
              orderId: item.orderId,
              orderNumber: item.orderNumber,
              itemsNumber: 0,
              orderState: statusArray[item.status - 1] || '订单异常',
              // orderState:item.status == 1?'待接单':item.status == 2?'待发货':item.status == 3?'待送达':item.status == 4?'交易完成':'退款',
              remarks: item.remarks || '无',
              riderId:item.riderId,
              riderName: item.riderName,
              riderPhone: item.riderPhone,
              status: item.status,
              money: item.totalAmount,
              totalQuantity: item.totalQuantity,
              userPhone: item.userPhone,
              userName: item.userName,
              reservedTime: item.reservedTime || '非预定',
              items: [],
              userId: item.userId,
              isDelivered: item.isDelivered == 0 ? 0 : 1
            }
            for (const item of good.commodities) {
              good.itemsNumber += item.quantity
            }
            if (good.commodities.length > 4) {
              good.items.push(good.commodities[0])
              good.items.push(good.commodities[1])
              good.items.push(good.commodities[2])
            } else if (good.commodities.length == 4) {
              good.items.push(good.commodities[0])
              good.items.push(good.commodities[1])
              good.items.push(good.commodities[2])
              good.items.push(good.commodities[3])
            } else {
              good.items.push(...good.commodities)
            }
            goods.list.push(good)
          }
          console.log(goods);
          this.setData({
            orders: this.data.orders
          })
        }
      } else {
        totast('订单查询失败', 2000,'error')
      }
      hideLoading()
    })
  },
  _modifyOrderStatus(id, orderNumber, orderId, userId, status) {
    return modifyOrderStatus(id, orderNumber, orderId, userId, status)
  },
  refreshOrder(e) {
    const {
      type
    } = e.currentTarget.dataset
    this.data.orders[type].page = 0
    if (type == 'all') {
      this.data.orders['all'].list = []
      this._getShopAllOrder()
    } else {
      this.data.orders[type].list = []
      this._getOrders(type, 10)
    }
  },
  /**
   * 订单页面
   */
  //tabcontro 点击事件  
  tabSelect(e) {
    const {
      orders
    } = this.data
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      tabCurrentIndex: index
    })
    if (index == 0) {
      orders['all'].newsRedDot = false
      this.setData({
        currentType: 'all',
        orders: orders
      })
    } else if (index == 1) {
      orders['pendingOrders'].newsRedDot = false
      this.setData({
        currentType: 'pendingOrders',
        orders: orders
      })
    } else if (index == 2) {
      orders['pendingDelivered'].newsRedDot = false
      this.setData({
        currentType: 'pendingDelivered',
        orders: orders
      })
    } else if (index == 3) {
      orders['pendingArrive'].newsRedDot = false
      this.setData({
        currentType: 'pendingArrive',
        orders: orders
      })
    }
  },
  /**
   * 页面跳转模块
   */
  goToOrderDetail(e) {
    wx.navigateTo({
      url: '/subPages/order/orderDetail/orderDetail?item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
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
      currentClickIndex: null
    })
  },
  /**
   * 接单 或拒绝接单  模块
   */
  confirmRefuseOrder() {
    //遍历order 与orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    const {
      currentType,
      currentClickIndex,
      orders
    } = this.data
    const {
      orderNumber,
      id,
      orderId,
      userId,
      orderState,
      money
    } = orders[currentType].list[currentClickIndex]
    this._modifyOrderStatus(id, orderNumber, orderId, userId, 3).then(res => {
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES)) {
        refundMoneyToWX(orderNumber, money, '商家主动退款').then(res=>{
          if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_refundMoneyToWX_SUCCESS){
            if (currentType == 'all') {
              orders[currentType].list[currentClickIndex].orderState = '拒绝接单'
              orders[currentType].list[currentClickIndex].status = 5
              for (const [key, item] of orders['pendingOrders'].list.entries()) {
                if (item.orderNumber == orderNumber) {
                  orders['pendingOrders'].list.splice(key, 1)
                  break
                }
              }
            } else if (currentType == 'pendingOrders') {
              for (const [key, item] of orders['all'].list.entries()) {
                if (item.orderNumber == orderNumber) {
                  orders['all'].list[key].orderState = '拒绝接单'
                  orders['all'].list[key].status = 5
                  orders['all'].pleaseRefresh = false
                  break
                } else {
                  orders['all'].pleaseRefresh = true
                }
              }
              orders[currentType].list.splice(currentClickIndex, 1)
            }
            this.setData({
              orders: orders
            })
            totast('操作成功',2000,'success')
          }else{
            totast('拒绝接单失败', 2000,'error')
          }
        })
      } else {
        totast('拒绝接单失败', 1500,'error')
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
  async acceptOrder(e) {
    //遍历order 与orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    const {
      currentType,
      currentClickIndex,
      orders
    } = this.data
    const {
      orderNumber,
      orderId,
      id,
      userId
    } = orders[currentType].list[currentClickIndex]
    await this._modifyOrderStatus(id, orderNumber, orderId, userId, 2).then(res => {
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES)) {
        if (currentType == 'all') {
          orders[currentType].list[currentClickIndex].orderState = '待发货'
          orders[currentType].list[currentClickIndex].status = 2
          orders[currentType].list[currentClickIndex].isReserved?(orders[currentType].list[currentClickIndex].isDelivered = 0):(orders[currentType].list[currentClickIndex].isDelivered = 1)
          // orders[currentType].list[currentClickIndex].isDelivered = 1
          for (const [key, item] of orders['pendingOrders'].list.entries()) {
            if (item.orderNumber == orderNumber) {
              item.orderState = '待发货'
              item.status = 2
              item.isReserved?(item.isDelivered = 0):(item.isDelivered = 1)
              // item.isDelivered = 1
              orders['pendingDelivered'].list.push(item)
              orders['pendingOrders'].list.splice(key, 1)
              break
            }
          }
        } else if (currentType == 'pendingOrders') {
          for (const [key, item] of orders['all'].list.entries()) {
            if (item.orderNumber == orderNumber) {
              item.orderState = '待发货'
              item.status = 2
              item.isReserved?(item.isDelivered = 0):(item.isDelivered = 1)
              // item.isDelivered = 1
              orders['all'].pleaseRefresh = false
              break
            } else {
              orders['all'].pleaseRefresh = true
            }
          }
          orders[currentType].list[currentClickIndex].status = 2
          orders[currentType].list[currentClickIndex].isReserved?(orders[currentType].list[currentClickIndex].isDelivered = 0):(orders[currentType].list[currentClickIndex].isDelivered = 1)
          orders[currentType].list[currentClickIndex].orderState = '待发货'
          // orders[currentType].list[currentClickIndex].isDelivered = 1
          orders['pendingDelivered'].list.push(orders[currentType].list[currentClickIndex])
          orders[currentType].list.splice(currentClickIndex, 1)
        }
        this.setData({
          orders: this.data.orders
        })
        totast('接单成功',2000,'success')
      } else {
        totast('系统错误,订单状态修改失败', 1500)
      }
      hideLoading()

    })
  },
  completeOrder(e) {
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    this.showModal(e, 'completeOrder')
  },
  confirmCompleteOrder(e) {
    const {
      currentType,
      currentClickIndex,
      orders
    } = this.data
    const {
      orderNumber,
      id,
      orderId,
      userId,
      money,
      freight
    } = orders[currentType].list[currentClickIndex]
    this._modifyOrderStatus(id, orderNumber, orderId, userId, 10).then(res => {
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES)) {
        oncePaySharing(orderNumber, money,freight,wx.getStorageSync('shopId')).then(res=>{
          if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_refundMoneyToWX_SUCCESS){
            if (currentType == 'all') {
              orders[currentType].list[currentClickIndex].orderState = '交易完成'
              orders[currentType].list[currentClickIndex].status = 4
              for (const [key, item] of orders['pendingArrive'].list.entries()) {
                if (item.orderNumber == orderNumber) {
                  orders['pendingArrive'].list.splice(key, 1)
                  break
                }
              }
            } else if (currentType == 'pendingArrive' || currentType == 'pendingDelivered') {
              for (const [key, item] of orders['all'].list.entries()) {
                if (item.orderNumber == orderNumber) {
                  orders['all'].list[key].orderState = '交易完成'
                  orders['all'].list[key].status = 4
                  orders['all'].pleaseRefresh = false
                  break
                } else {
                  orders['all'].pleaseRefresh = true
                }
              }
              orders[currentType].list.splice(currentClickIndex, 1)
            }
            this.setData({
              orders: orders
            })
            totast('订单已完成',2000,'success')
          }else{
            totast('订单完成失败', 2000,'error')
          }
        })
      } else {
        totast('订单完成失败', 2000,'error')
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
  confirmShopSend(e) {
    const {
      currentClickIndex,
      currentType
    } = this.data
    loading('发货中')
    if(currentType == 'all'){
      modifyOrderStatus_deliveryGoods(this.data.orders['all'].list[currentClickIndex].id).then(res => {
        if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_deliveryGoods_SUCCESS) {
          this.data.orders['all'].list[currentClickIndex].isDelivered = 1
          for (const [index,item] of this.data.orders['pendingDelivered'].list.entries()) {
            if(item.orderNumber == this.data.orders['all'].list[currentClickIndex].orderNumber){
              item.isDelivered = 1
              break
            }
          }
          this.setData({
            orders: this.data.orders,
            currentModalType: ''
          })
          totast('发货成功', 2000,'success')
        } else {
          totast('发货失败', 2000,'error')
        }
        hideLoading()
      })
    }else if(currentType == 'pendingDelivered'){
      modifyOrderStatus_deliveryGoods(this.data.orders['pendingDelivered'].list[currentClickIndex].id).then(res => {
        if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_deliveryGoods_SUCCESS) {
          this.data.orders['pendingDelivered'].list[currentClickIndex].isDelivered = 1
          for (const [index,item] of this.data.orders['all'].list.entries()) {
            if(item.orderNumber == this.data.orders['pendingDelivered'].list[currentClickIndex].orderNumber){
              item.isDelivered = 1
              break
            }
          }
          this.setData({
            orders: this.data.orders,
            currentModalType: ''
          })
          totast('发货成功', 2000,'success')
        } else {
          totast('发货失败', 2000,'error')
        }
        hideLoading()
      })

    }
  },
  refund(e) {
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    this.showModal(e, 'refund')
  },
  confirmRefund(e) {
    const {
      currentType,
      currentClickIndex,
      orders
    } = this.data
    const {
      orderNumber,
      id,
      orderId,
      userId,
      orderState,
      money
    } = orders[currentType].list[currentClickIndex]
    if (orderState == '待发货') {
      this._modifyOrderStatus(id, orderNumber, orderId, userId, 4).then(res => {
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES)) {
          refundMoneyToWX(orderNumber, money, '商家主动退款').then(res => {
            if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_refundMoneyToWX_SUCCESS) {
              if (currentType == 'all') {
                orders[currentType].list[currentClickIndex].orderState = '已退款'
                orders[currentType].list[currentClickIndex].status = 5
                for (const [key, item] of orders['pendingDelivered'].list.entries()) {
                  if (item.orderNumber == orderNumber) {
                    orders['pendingDelivered'].list.splice(key, 1)
                    break
                  }
                }
                this.setData({
                  orders: orders
                })
              } else if (currentType == 'pendingDelivered') {
                for (const [key, item] of orders['all'].list.entries()) {
                  if (item.orderNumber == orderNumber) {
                    orders['all'].list[key].orderState = '已退款'
                    orders['all'].list[key].status = 5
                    orders['all'].pleaseRefresh = false
                    break
                  } else {
                    orders['all'].pleaseRefresh = true
                  }
                }
                orders[currentType].list.splice(currentClickIndex, 1)
                this.setData({
                  orders: orders
                })
              }
              totast('退款成功', 2000,'success')
            } else {
              totast('退款失败', 2000,'error')
            }
          })
        } else {
          totast('退款失败', 2000,'error')
        }
        hideLoading()
        this.hideModal()
      })
    } else if (orderState == '待送达') {
      this._modifyOrderStatus(id, orderNumber, orderId, userId, 5).then(res => {
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES)) {
          refundMoneyToWX(orderNumber, money, '商家主动退款').then(res => {
            if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_refundMoneyToWX_SUCCESS) {
              if (currentType == 'all') {
                orders[currentType].list[currentClickIndex].orderState = '已退款'
                orders[currentType].list[currentClickIndex].status = 5
                for (const [key, item] of orders['pendingArrive'].list.entries()) {
                  if (item.orderNumber == orderNumber) {
                    orders['pendingArrive'].list.splice(key, 1)
                    break
                  }
                }
                this.setData({
                  orders: orders
                })
              } else if (currentType == 'pendingArrive') {
                for (const [key, item] of orders['all'].list.entries()) {
                  if (item.orderNumber == orderNumber) {
                    orders['all'].list[key].orderState = '已退款'
                    orders['all'].list[key].status = 5
                    orders['all'].pleaseRefresh = false
                    break
                  } else {
                    orders['all'].pleaseRefresh = true
                  }
                }
                orders[currentType].list.splice(currentClickIndex, 1)
              }
              this.setData({
                orders: orders
              })
              totast('退款成功', 2000,'success')
            } else {
              totast('退款失败', 2000,'error')
            }
          })
        } else {
          totast('退款失败', 2000,'error')
        }
        hideLoading()
        this.hideModal()
      })
    }
  },
  shopDelivered(e){
    this.setData({
      currentClickIndex: e.currentTarget.dataset.index
    })
    this.showModal(e, 'shopDelivered')
  },
  confirmShopDelivered(){
    const {
      currentType,
      currentClickIndex,
      orders
    } = this.data
    const {
      orderNumber,
      id,
      orderId,
      userId,
      status,
      orderState,
      money
    } = orders[currentType].list[currentClickIndex]
    if(currentType == 'all'){
      loading('加载中')
      this._modifyOrderStatus(id, orderNumber, orderId, userId, 11).then(res=>{
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES)){
          orders[currentType].list[currentClickIndex].orderState = '待送达'
          orders[currentType].list[currentClickIndex].status = 3
          console.log(11);
          for (const [index,item] of orders['pendingDelivered'].list.entries()) {
            console.log(1);
            if(item.orderNumber == orderNumber){
              item.orderState = '待送达'
              item.status = 3
              console.log(3);
              orders['pendingArrive'].list.push(item)
              console.log(4);
              orders['pendingDelivered'].list.splice(index,1)
              console.log(5);
              break
            }
          }
          this.setData({
            orders:this.data.orders
          })
          totast('操作成功',2000,'success')
        }else{
          totast('操作失败',2000,'error')
        }
        hideLoading()
        this.hideModal()
      })
    }else if(currentType == 'pendingDelivered'){
      loading('加载中')
      this._modifyOrderStatus(id, orderNumber, orderId, userId, 11).then(res=>{
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyOrderStatus_SUCCES)){
          for (const item of orders['all'].list) {
            if(item.orderNumber == orderNumber){
              item.status = 3
              item.orderState = '待送达'
              break
            }
          }
          orders[currentType].list[currentClickIndex].orderState = '待送达'
          orders[currentType].list[currentClickIndex].status = 3
          const tempList = orders[currentType].list[currentClickIndex]
          orders['pendingArrive'].list.push(tempList)
          orders['pendingDelivered'].list.splice(currentClickIndex,1)
          this.setData({
            orders:this.data.orders
          })
          totast('操作成功',2000,'success')
        }else{
          totast('操作失败',2000,'error')
        }
        hideLoading()
        this.hideModal()
      })
    }
  }
})