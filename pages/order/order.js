const app = getApp()
// pages/order/order.js
let bus = app.globalData.bus
Page({
  data: {
    tabCurrentIndex:0,
    currentType:'all',
    currentClickIndex:null,
    orders:{
      all:{
        page:0,
        newsRedDot:false,
        list:[
          {
            shopName:'CAT00000工作室',
            time:'2020-01-09 21:45:11',
            orderState:'待接单',
            orderNumber:1,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99,number:2
            },
              {itemName:'超级汉堡王',price:19.99,number:5},
              {itemName:'海贼王无敌薯条',price:29.99,number:1}
            ],
            itemsNumber:7,
            money:0.01,
            freight:0.01,
            remarks:'不要葱不要蒜头',
            specification:'香辣鸡腿堡/川香鸡柳/百事可乐'
          },
          {
            shopName:'CAT00000工作室',
            time:'2020-01-09 21:45:11',
            orderState:'待发货',
            orderNumber:2,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:29.99}
            ],
            itemsNumber:7,
            money:0.01,
            freight:0.01
          },
          {
            shopName:'CAT00000工作室',
            time:'2020-01-09 21:45:11',
            orderState:'待送达',
            orderNumber:3,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:29.99}
            ],
            itemsNumber:7,
            money:0.01,
            freight:0.01
          },
          {
            shopName:'CAT00000工作室',
            time:'2020-01-09 21:45:11',
            orderState:'待接单',
            orderNumber:4,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:29.99}
            ],
            itemsNumber:7,
            money:0.01,
            freight:0.01
          },
          {
            shopName:'CAT00000工作室',
            time:'2020-01-09 21:45:11',
            orderState:'交易成功',
            orderNumber:5,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:29.99}
            ],
            itemsNumber:7,
            money:0.01,
            freight:0.01
          },
          {
            shopName:'CAT00000工作室',
            time:'2020-01-09 21:45:11',
            orderState:'交易成功',
            orderNumber:6,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:29.99}
            ],
            itemsNumber:7,
            money:0.01,
            freight:0.01
          },
          {
            shopName:'CAT00000工作室',
            time:'2020-01-09 21:45:11',
            orderState:'交易成功',
            orderNumber:7,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:29.99}
            ],
            itemsNumber:7,
            money:0.01,
            freight:0.01
          },
        ] 
      },
      pendingOrders:{
        page:0,
        newsRedDot:true,
        list:[
          {
            shopName:'CAT工作室',
            time:'2020-01-09 21:45:11',
            orderState:'待接单',
            orderNumber:1,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:29.99},
            ],
            itemsNumber:3,
            money:0.01,
            freight:0.01
          },
          {
            shopName:'CAT00000工作室',
            time:'2020-01-09 21:45:11',
            orderState:'待接单',
            orderNumber:4,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:9.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:29.99}
            ],
            itemsNumber:7,
            money:0.01,
            freight:0.01
          }
          
        ]
      },
      pendingDelivered:{
        page:0,
        newsRedDot:true,
        list:[
          {
            shopName:'CAT11111工作室',
            time:'2020-01-09 21:45:11',
            orderState:'待发货',
            orderNumber:2,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:8.99},
              {itemName:'超级汉堡王',price:19.99},
              {itemName:'海贼王无敌薯条',price:28.99},
              {itemName:'海贼王无敌薯条',price:29.99}
            ],
            itemsNumber:4,
            money:0.01,
            freight:0.01
          }
          
        ]
      },
      pendingArrive:{
        page:0,
        newsRedDot:true,
        list:[
          {
            shopName:'CAT2222工作室',
            time:'2020-01-09 21:45:11',
            orderState:'待送达',
            orderNumber:3,
            image:'',
            items:[
              {itemName:'海贼王三兄弟奶茶',price:4.99},
              {itemName:'超级汉堡王',price:14.99},
              {itemName:'海贼王无敌薯条',price:24.99}
            ],
            itemsNumber:5,
            money:0.01,
            freight:0.01
          }
          
        ]
      }
    },
    currentModalType:''
  },
  onLoad(){
    wx.showLoading({
      title: '加载中',
    })
  },
  onReady(){
    wx.hideLoading()
  },
  onShow(){
    const {orders} = this.data
    //eventBus  接受从orderDetail 在点击(接单或拒绝接单)按钮时的行为
    //遍历order 找到与bus传过来的orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    bus.on('acceptOrder',orderNumber=>{
      for (const item of orders['all'].list) {
        if(item.orderNumber == orderNumber){
          item.orderState = '待发货'
          orders['pendingDelivered'].list.unshift(JSON.parse(JSON.stringify(item)))
          break
        }
      }
      for (const [key,item] of orders['pendingOrders'].list.entries()) {
        if(item.orderNumber == orderNumber){
          orders['pendingOrders'].list.splice(key,1)
          break
        }
      }
      if(this.data.currentType != 'pendingDelivered'){
        orders['pendingDelivered'].newsRedDot = true
      }
    })
    bus.on('confirmRefuseOrder',orderNumber=>{
      for (const item of orders['all'].list) {
        if(item.orderNumber == orderNumber){
          item.orderState = '拒绝接单'
          break
        }
      }
      for (const [key,item] of orders['pendingOrders'].list.entries()) {
        if(item.orderNumber == orderNumber){
          orders['pendingOrders'].list.splice(key,1)
          break
        }
      }
      if(this.data.currentType !== 'all'){
        orders['all'].newsRedDot = true
      }
    })
    this.setData({
      orders:orders
    })
  },
  /**
   * 订单页面
   */
  //tabcontro 点击事件
  tabSelect(e){
    const {orders} = this.data
    const {index} = e.currentTarget.dataset
    this.setData({
      tabCurrentIndex:index
    })
    if(index == 0){
      orders['all'].newsRedDot = false
      this.setData({
        currentType:'all',
        orders:orders
      })
    }else if(index == 1){
      orders['pendingOrders'].newsRedDot = false
      this.setData({
        currentType:'pendingOrders',
        orders:orders
      })
    }else if(index == 2){
      orders['pendingDelivered'].newsRedDot = false
      this.setData({
        currentType:'pendingDelivered',
        orders:orders
      })
    }else if(index == 3){
      orders['pendingArrive'].newsRedDot = false
      this.setData({
        currentType:'pendingArrive',
        orders:orders
      })
    }
  },
  /**
   * 页面跳转模块
   */
  goToOrderDetail(e){
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
      currentClickIndex:null
    })
  },
  /**
   * 接单 或拒绝接单  模块
   */
  confirmRefuseOrder(){
    //遍历order 与orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    const {currentType,currentClickIndex,orders} = this.data
    const {orderNumber} = orders[currentType].list[currentClickIndex]
    let index = null;
    if(currentType == 'all'){
      orders[currentType].list[currentClickIndex].orderState = '拒绝接单'
      for (const [key,item] of orders['pendingOrders'].list.entries()) {
        if(item.orderNumber == orderNumber){
          index = key
          break;
        }
      }
      orders['pendingOrders'].list.splice(index,1)
    }else if(currentType == 'pendingOrders'){
      for (const [key,item] of orders['all'].list.entries()) {
        if(item.orderNumber == orderNumber){
          index = key
          break;
        }
      }
      orders['all'].newsRedDot = true
      orders[currentType].list.splice(currentClickIndex,1)
      orders['all'].list[index].orderState = '拒绝接单'
    }
    this.setData({
      orders:orders
    })
    this.hideModal()
  },
  refuseReceiveOrder(e){
    this.setData({
      currentClickIndex:e.currentTarget.dataset.index
    })
    this.showModal(e,'show')
  },
  acceptOrder(e){
    //遍历order 与orderNumber匹配的item,更改item的orderState 同时删除在待接单的相同item
    this.setData({
      currentClickIndex:e.currentTarget.dataset.index
    })
    const {currentType,currentClickIndex,orders} = this.data
    const {orderNumber} = orders[currentType].list[currentClickIndex]
    let index = null;
    if(currentType == 'all'){
      orders[currentType].list[currentClickIndex].orderState = '待发货'
      for (const [key,item] of orders['pendingOrders'].list.entries()) {
        if(item.orderNumber == orderNumber){
          item.orderState = '待发货'
          orders['pendingDelivered'].list.unshift(JSON.parse(JSON.stringify(item)))
          index = key
          break;
        }
      }
      orders['pendingDelivered'].newsRedDot = true
      orders['pendingOrders'].list.splice(index,1)
    }else if(currentType == 'pendingOrders'){
      for (const [key,item] of orders['all'].list.entries()) {
        if(item.orderNumber == orderNumber){
          item.orderState = '待发货'
          orders['pendingDelivered'].list.unshift(JSON.parse(JSON.stringify(item)))
          break;
        }
      }
      orders['pendingDelivered'].newsRedDot = true
      orders[currentType].list.splice(currentClickIndex,1)
    }
    this.setData({
      orders:orders
    })
  }
})