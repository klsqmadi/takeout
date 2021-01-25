// subPages/order/handleGoods/handleGoods.js
import {
  RegExp
}from '../../../utils/RE'
import {
  getCategoryAndGoodsInfo,
  addGood,
  deleteGoods,
  modifyGoodSaleStatus,
  modifyGoodInfo
} from '../../../services/work'
import {
  BASE_URL,
  API_URL_addOrModifyGoodPicture,
  loading,
  hideLoading,
  totast,
  STATUS_CODE_getCategoryAndGoodsInfo_SUCCESS,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_addGood_SUCCESS,
  STATUS_CODE_addOrModifyGoodPicture_SUCCESS,
  STATUS_CODE_deleteGoods_SUCCESS,
  STATUS_CODE_modifyGoodSaleStatus_SUCCESS,
  STATUS_CODE_modifyGoodInfo_SUCCESS
} from '../../../services/config'
Page({
  data: {
    tabContent: ['出售中', '售罄的'],
    tabCurrentIndex: 0,
    TabCur: 0,
    TabCur1: 0,
    MainCur: 0,
    MainCur1: 0,
    VerticalNavTop: 0,
    VerticalNavTop1: 0,
    /* list: [{
      name: '热销',
      id: 0,
      goods: [{
          goodsName: '1香酥小鸡腿1个',
          introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
          saled: 120,
          price: 12.00,
          isChecked: false,
          iid: 0,
          standard: [{
            title: '杯型',
            type: [
              {
                typeName:'中杯',
                typeSaledMoney:100
              },
              {
                typeName:'大杯',
                typeSaledMoney:10
              },
              {
                typeName:'小杯',
                typeSaledMoney:1
              }
            ]
          }],
          selling: true
        },

      ]
    }], */
    list: [],
    list1: [],
    load: true,
    isCheckBoxShow: false,
    deletedGoods: [],
    deletedGoodsLength: 0,
    currentModalType: '',
    list1CurrentModalType: '',
    modalName: ['edit', 'delete', 'add', 'deleteNotice'],
    modal: {
      edit: {
        modalShow: false
      },
      delete: {
        modalShow: false
      },
      add: {
        modalShow: false
      },
      deleteNotice: {}
    },
    addGood: {
      addGoodIndex: '',
      addGoodIndex2: '',
      addGoodItemIndex: '',
      addGoodImage: [],
      addGoodName: '',
      addGoodIntroduce: '',
      addGoodPrice: '',
      saled: 0,
      standard: [],
      standardIndex: '',
      standardTypeIndex: 0,
      isStandardType: true
    },
    goodInputType:'',
    goodAttributeTitle:'',
    goodInputValue:'',
    pickerRanges: [],
    showInputModal: '',
    inputValue: '',
    inputValue1: '',
    showNoticeModal: '',
    noticeContent: ''
  },
  async onLoad() {
    this.data.RE = new RegExp()
    const {
      list,
      list1
    } = this.data
    //将list里的类名收集
    await this._getCategoryAndGoodsInfo(1).then(res => {
      loading('加载中')
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getCategoryAndGoodsInfo_SUCCESS) ){
        if(res.data.data){
          for (const item of res.data.data) {
            const category = {
              name: item.categoryName,
              id: item.categoryId,
              goods: []
            }
            for (const goodItem of item.dates) {
              const good = {
                imageUrl: BASE_URL + '/' + goodItem.commodityPhoto,
                goodsName: goodItem.commodityName,
                price: goodItem.commodityPrice,
                iid: goodItem.commodityId,
                introduce: goodItem.commodityDetail,
                selling: goodItem.saleStatus == 1 ? true : false,
                isChecked: false,
                saled: 0,
                standard: []
              }
              for (const specs of goodItem.specs) {
                const standard = {
                  title: specs.specName,
                  standardId: specs.specId,
                  type: []
                }
                for (const attributes of specs.attributes) {
                  const type = {
                    typeId: attributes.attributeId,
                    typeName: attributes.attributeName,
                    typeSaledMoney: attributes.attributePrice || 0
                  }
                  standard.type.push(type)
                }
                good.standard.push(standard)
              }
              category.goods.push(good)
            }
            list.push(category)
          }
        }
      } else {
        totast('系统错误,商品信息获取事变', 1500)
      }
      hideLoading()
    })
    await this._getCategoryAndGoodsInfo(0).then(res => {
      loading('加载中')
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getCategoryAndGoodsInfo_SUCCESS) ){
        if(res.data.data){
          for (const item of res.data.data) {
            const category = {
              name: item.categoryName,
              id: item.categoryId,
              goods: []
            }
            for (const goodItem of item.dates) {
              const good = {
                imageUrl: BASE_URL + '/' + goodItem.commodityPhoto,
                goodsName: goodItem.commodityName,
                price: goodItem.commodityPrice,
                iid: goodItem.commodityId,
                introduce: goodItem.commodityDetail,
                selling: goodItem.saleStatus == 1 ? true : false,
                isChecked: false,
                saled: 0,
                standard: []
              }
              for (const specs of goodItem.specs) {
                const standard = {
                  title: specs.specName,
                  standardId: specs.specId,
                  type: []
                }
                for (const attributes of specs.attributes) {
                  const type = {
                    typeId: attributes.attributeId,
                    typeName: attributes.attributeName,
                    typeSaledMoney: attributes.attributePrice || 0
                  }
                  standard.type.push(type)
                }
                good.standard.push(standard)
              }
              category.goods.push(good)
            }
            list1.push(category)
          }
        }
      } else {
        totast('系统错误,商品信息获取事变', 1500)
      }
      hideLoading()
    })
    await this.pickerRanges()
    this.setData({
      list: this.data.list,
      list1: this.data.list1
    })
  },
  onReady() {
  },
  onShow() {
    /* let token = wx.getStorageSync('token') || null
    let id = wx.getStorageSync('id') || null
    if (!token && !id) {
      wx.redirectTo({
        url: '/pages/wxLogin/wxLogin',
        success: res => {
          console.log(res);
        }
      })
    } */
  },
  _getCategoryAndGoodsInfo(saleStatus) {
    loading('加载中')
    return getCategoryAndGoodsInfo(saleStatus)
  },
  _addGood(categoryId, commodityDetail, commodityName, commodityPhoto, price, specs) {
    return addGood(categoryId, commodityDetail, commodityName, commodityPhoto, price, specs)
  },
  _deleteGoods(ids) {
    return deleteGoods(ids)
  },
  _modifyGoodSaleStatus(commodityId, status) {
    return modifyGoodSaleStatus(commodityId, status)
  },
  _modifyGoodInfo(commodityDetail, commodityId, commodityName, price, specs, commodityPhoto) {
    return modifyGoodInfo(commodityDetail, commodityId, commodityName, price, specs, commodityPhoto)
  },
  /**
   * 导航栏模块
   */
  tabSwitch(e) {
    //tab栏切换 点击事件
    const index = e.currentTarget.dataset.index
    this.setData({
      tabCurrentIndex: index
    })
  },
  tabSelect(e) {
    //垂直导航点击选择
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  tabSelect1(e) {
    //垂直导航点击选择
    this.setData({
      TabCur1: e.currentTarget.dataset.id,
      MainCur1: e.currentTarget.dataset.id,
      VerticalNavTop1: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    //垂直导航高度控制
    let that = this
    let list = this.data.list
    let tabHeight = 0
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id)
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight
          tabHeight = tabHeight + data.height
          list[i].bottom = tabHeight
        }).exec()
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  VerticalMain1(e) {
    //垂直导航高度控制
    let that = this
    let list = this.data.list1
    let tabHeight = 0
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main1-" + list[i].id)
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight
          tabHeight = tabHeight + data.height
          list[i].bottom = tabHeight
        }).exec()
      }
      that.setData({
        load: false,
        list1: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop1: (list[i].id - 1) * 50,
          TabCur1: list[i].id
        })
        return false
      }
    }
  },
  /**
   * ckechBox模块
   */
  controlCheckBoxShowOrHide(e, flag) {
    //显示隐藏checkbox
    //每次点击取消或删除商品将list.goods.isChecked 变为false
    if (flag === false || flag === true) {
      flag = flag
    } else if (flag === undefined) {
      flag = e.currentTarget.dataset.flag
    }
    /* flag = flag || e.currentTarget.dataset.flag */
    for (const item of this.data.list) {
      for (const value of item.goods) {
        value.isChecked = false
      }
    }
    this.setData({
      list: this.data.list,
      isCheckBoxShow: flag,
      deletedGoodsLength: 0
    })
  },
  clickChecked(e) {
    //checkBox 点击(打勾或取消) value改变
    const index = e.currentTarget.dataset.index
    const itemIndex = e.currentTarget.dataset.itemindex
    const iid = e.currentTarget.dataset.iid
    this.data.list[index].goods[itemIndex].isChecked = !this.data.list[index].goods[itemIndex].isChecked
    this.changeDeleteGoods(index, itemIndex, iid)
    this.setData({
      list: this.data.list
    })
  },
  changeDeleteGoods(index, itemIndex, iid) {
    //判断checkBox是否勾选,如勾选动作则把当前goods的id和iid作为一个对象推到deleteGoods里,如是取消动作则遍历deleteGoods把对应的对象删除
    if (this.data.list[index].goods[itemIndex].isChecked == true) {
      const deleteGood = {
        index,
        itemIndex,
        iid
      }
      this.data.deletedGoods.push(deleteGood)
      this.data.deletedGoodsLength++
    } else if (this.data.list[index].goods[itemIndex].isChecked == false) {
      this.data.deletedGoods = this.data.deletedGoods.filter(item => item.iid !== iid)
      this.data.deletedGoodsLength--
    }
    this.setData({
      deletedGoodsLength: this.data.deletedGoodsLength,
      deletedGoods: this.data.deletedGoods
    })
  },
  /**
   * 显示或隐藏modal框 工具函数
   */
  showModal(e, currentModalType) {
    currentModalType = currentModalType || e.currentTarget.dataset.currentmodaltype
    this.setData({
      currentModalType: currentModalType,
    })
  },
  hideModal(e) {
    if (this.data.currentModalType == 'add' || this.data.currentModalType == 'edit') {
      this.clearthisDataAddGood()
    }
    this.setData({
      currentModalType: '',
    })
  },
  getQueryInputValue(className, obj, param) {
    const query = wx.createSelectorQuery()
    query.select(className).fields({
      properties: ['value']
    }, res => {
      obj[param] = res.value
    }).exec();
  },
  clearthisDataAddGood() {
    let {
      addGood
    } = this.data
    addGood.addGoodIndex = addGood.addGoodItemIndex = addGood.addGoodIndex2 = null
    addGood.addGoodImage = []
    addGood.addGoodName = addGood.addGoodIntroduce = addGood.addGoodPrice = ''
    addGood.saled = 0
    addGood.standard = []
  },
  onTimeGetInputValue(e) {
    const {
      type
    } = e.currentTarget.dataset
    this.setData({
      [type]: e.detail.value
    })
  },
  showNoticeModal(e, content) {
    this.setData({
      showNoticeModal: 'noticeModal',
      noticeContent: content
    })
  },
  hideNoticeModal() {
    this.setData({
      showNoticeModal: '',
      noticeContent: ''
    })
  },
  showGoodAttributeModal(e){
    const {type} = e.currentTarget.dataset
    const name = ['名称','介绍','价格']
    const goodType = ['addGoodName','addGoodIntroduce','addGoodPrice']
    this.setData({
      goodInputValue:this.data.addGood[type],
      goodInputType:type,
      goodAttributeTitle:name[goodType.indexOf(type)],
      showInputModal:'goodAttribute'
    })
  },
  hideGoodAttributeModal(){
    this.setData({
      showInputModal:''
    })
  },
  eventInput(e){
    this.setData({
      goodInputValue:e.detail.value
    })
  },
  confirmGoodAttribute(){
    const {goodInputValue,goodInputType} = this.data
    const testValue = goodInputValue
    for (const item of testValue.split('')) {
      if(item == ' '){
        totast('输入存在空格,请检查',2000)
        return
      }
    }
    const temp = `addGood.${goodInputType}`
    if(goodInputType == 'addGoodPrice'){
      if(this.data.RE.isPositiveNumber(goodInputValue.trim())){
        this.setData({
          [temp]:goodInputValue,
        })
        this.hideGoodAttributeModal()
      }else{
        totast('请输入正确的数字(正数及小数点后两位)',2000)
      }
    }else{
      if(this.data.RE.isMinToMaxLength(goodInputValue.trim(),4,20)){
        this.setData({
          [temp]:goodInputValue,
        })
        this.hideGoodAttributeModal()
      }else{
        totast('请输入4~20位中文或数字',2000)
      }
    }
  },
  /**
   * 删除商品模块 相关函数
   */
  showDeleteModal(e) {
    //判断是否选择删除商品,如数量为0,弹出提示框
    if (this.data.deletedGoodsLength == 0) {
      this.showNoticeModal(e, '请选择要删除的商品')
      setTimeout(() => {
        this.hideNoticeModal()
      }, 1500)
    } else {
      this.showModal(e, this.data.modalName[1])
    }
  },
  deleteGoods(e) {
    /**
     * 该函数用于删除商品
     * @param (flag1)
     * @param (temp)
     */
    let flag1 = 0;
    let temp = 0;
    //对deleteGoods 进行多条件排序
    const arr1 = []
    for (const item of this.data.deletedGoods) {
      arr1.push(item.iid)
    }
    this._deleteGoods(arr1).then(res => {
      hideLoading()
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_deleteGoods_SUCCESS) {
        this.data.deletedGoods.sort((a, b) => {
          if (a["index"] == b["index"]) {
            if (a["itemIndex"] > b["itemIndex"])
              return 1
            else if (a["itemIndex"] < b["itemIndex"])
              return -1
            else return 0
          } else if (a["index"] > b["index"])
            return 1
          else return -1
        })
        for (const item of this.data.deletedGoods) {
          //temp用来判断是否index改变,是否切换了分类
          if (temp != item.index) {
            flag1 = 0
          }
          //判断itemIndex跟flag的大小,可能存在flag比itemIndex大的情况,
          this.data.list[item.index].goods.splice(item.itemIndex - flag1, 1)
          temp = item.index
          flag1++
        }
        this.setData({
          list: this.data.list,
          deletedGoodsLength: 0,
          deletedGoods: []
        })
        this.controlCheckBoxShowOrHide(e, false)
        this.hideModal()
      } else {
        totast('系统错误,删除商品失败,请重试', 1500)
      }
    })
  },
  /**
   * 增加商品模块 相关函数
   */
  addGoods(e) {
    /**
     * 函数用于确认新增商品
     * @param (addGoodIndex) 与要商品要前往的分类有关
     * 在api中传输,在success中清空addGood
     * 获取 新增商品名字,介绍,价格 input框内的值
     */
    const {
      addGoodIndex
    } = this.data.addGood
    //创建一个新的对象,因为addGood的属性与要添加商品的对象属性不一样
    let addGood = {
      goodsName: this.data.addGood.addGoodName,
      introduce: this.data.addGood.addGoodIntroduce,
      saled: 0,
      price: this.data.addGood.addGoodPrice,
      isChecked: false,
      iid: 10086,
      standard: JSON.parse(JSON.stringify(this.data.addGood.standard)),
      selling: true,
      imageUrl: this.data.addGood.addGoodImage
    }
    /* this.getQueryInputValue('.addGoodName', addGood, "goodsName")
    this.getQueryInputValue('.addGoodIntroduce', addGood, "introduce")
    this.getQueryInputValue('.addGoodPrice', addGood, "price") */
    //给一个setTimeout 为了同上面一样进入微任务队列,防止异步操作,下面作为主线程任务先行执行
    setTimeout(() => {
      //判断是否为空
      if (addGood.goodsName == '' || addGood.price == '' || addGoodIndex == null || addGoodIndex == '' || addGood.imageUrl == '') {
        totast('商品图片,类型,名称及价格不允许为空',2000)
        // this.showNoticeModal(e, '商品图片,类型,名称及价格不允许为空')
      } else {
        const commodityInfoQuery = {
          commodityDetail: addGood.introduce,
          commodityName: addGood.goodsName,
          price: addGood.price,
          categoryId: this.data.list[addGoodIndex].id,
          specs: []
        }
        if (addGood.standard) {
          for (const item of addGood.standard) {
            if(item.title == '请填写规格名称'){
              totast('当前规格存在默认名称,请及时更改',2000)
              return
            }
            const standard = {
              attributes: [],
              specName: item.title
            }
            if (item.type) {
              for (const attribute of item.type) {
                if(attribute.typeName == '请添加类型名称'){
                  totast('当前类型存在默认名称,请及时更改',2000)
                return
                }
                const attri = {
                  attributeName: attribute.typeName,
                  attributePrice: attribute.typeSaledMoney
                }
                standard.attributes.push(attri)
              }
            }
            commodityInfoQuery.specs.push(standard)
          }
        }
        loading('加载中')
        wx.uploadFile({
          filePath: addGood.imageUrl,
          name: 'file',
          url: BASE_URL + API_URL_addOrModifyGoodPicture,
          success: res => {
            if (res && (JSON.parse(res.data).code == STATUS_CODE_SUCCESSE || JSON.parse(res.data).code == STATUS_CODE_addOrModifyGoodPicture_SUCCESS) ){
              this._addGood(commodityInfoQuery.categoryId, commodityInfoQuery.commodityDetail, commodityInfoQuery.commodityName, JSON.parse(res.data).data, commodityInfoQuery.price, commodityInfoQuery.specs).then(result => {
                if (result && (result.data.code == STATUS_CODE_SUCCESSE || result.data.code == STATUS_CODE_addGood_SUCCESS) ){
                  addGood.iid = result.data.data
                  this.data.list[addGoodIndex].goods.push(addGood)
                  this.clearthisDataAddGood()
                  this.setData({
                    list: this.data.list,
                    addGood: this.data.addGood
                  })
                  this.hideModal()
                } else {
                  totast('系统错误,新增商品失败,请重试', 1500)
                }
              })
            } else {
              totast('系统错误,新增商品失败,请重试', 1500)
            }
            hideLoading()
          },
          fail(res) {
            hideLoading()
            totast('系统错误,新增商品失败,请重试', 1500)
          }
        })
        //往分类添加新的商品
      }
    }, 100)

  },
  pickerChange(e, index) {
    //切换类型时,index改变
    this.setData({
      ["addGood.addGoodIndex"]: e.detail.value
    })
  },
  pickerRanges() {
    //类型收集函数
    for (const item of this.data.list) {
      this.data.pickerRanges.push(item.name)
    }
    this.setData({
      pickerRanges: this.data.pickerRanges
    })
  },
  chooseImage() {
    //图片选择
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.data.addGood.addGoodImage = res.tempFilePaths[0]
        this.setData({
          ["addGood.addGoodImage"]: this.data.addGood.addGoodImage
        })
      }
    });
  },
  deleteImage(e) {
    //图片删除
    /* this.data.addGood.addGoodImage.splice(e.currentTarget.dataset.index, 1) */
    this.setData({
      ["addGood.addGoodImage"]: ''
    })
  },
  /**
   * 编辑商品模块 相关函数
   */
  showEditModal(e) {
    /**
     * 该函数用于显示编辑模态框
     * @param (index) (事件所传递参数，大类的索引)
     * @param (itemindex) (事件所传递参数，小类的索引)
     * @param (addGood) (页面全局变量，用于在编辑时,临时储存,确定编辑后,再赋值到原数组)
     * if判断当前是否为checkBox显示阶段,如果是，不给继续
     * 如果不是,index是大类索引,
     * 利用index和itemindex拿到当前点击的商品的信息,赋值给addGood
     */
    if (!this.data.isCheckBoxShow) {
      let {
        addGood
      } = this.data
      const {
        index,
        itemindex
      } = e.currentTarget.dataset
      const {
        goodsName,
        introduce,
        price,
        saled,
        standard,
        selling,
        imageUrl,
        iid
      } = this.data.list[index].goods[itemindex]
      addGood.addGoodName = goodsName
      addGood.addGoodIntroduce = introduce
      addGood.addGoodPrice = price
      addGood.saled = saled
      addGood.addGoodIndex2 = addGood.addGoodIndex = index
      addGood.addGoodItemIndex = itemindex
      addGood.standard = JSON.parse(JSON.stringify(standard))
      addGood.selling = selling
      addGood.addGoodImage = imageUrl
      addGood.iid = iid
      //JSON.parse(JSON.stringify) 因为standard是引用类型数据,担心会修改addGood影响到原数据
      this.setData({
        addGood: addGood
      })
      this.showModal(e, 'edit')
    }
  },
  hideEditModal() {
    /**
     * 该函数用于隐藏编辑模态框
     * @param (addGood) (页面全局变量,点击取消编辑时,将addGood赋空)
     */
    this.hideModal()
    const {
      addGood
    } = this.data
    addGood.addGoodIndex = addGood.addGoodItemIndex = addGood.addGoodIndex2 = null
    addGood.addGoodImage = ''
    addGood.addGoodName = addGood.addGoodIntroduce = addGood.addGoodIntroduce = ''
    addGood.saled = addGood.price = 0
    addGood.selling = true
    this.setData({
      addGood: this.data.addGood
    })
  },
  confirmEditGood(e) {
    /**
     * 函数用于(确认)编辑修改商品
     * @param (index) 与商品所在分类有关,不过是现在(当前)所在的分类
     * @param (index2) 与商品所在分类有关,不过是之前(第一次获取到的)所在的分类
     * @param (itemIndex) 与商品所在详细分类里的位置有关
     */
    const index2 = this.data.addGood.addGoodIndex2
    const index = this.data.addGood.addGoodIndex
    const itemIndex = this.data.addGood.addGoodItemIndex
    const addGood = {
      goodsName: this.data.addGood.addGoodName,
      introduce: this.data.addGood.addGoodIntroduce,
      saled: this.data.addGood.saled,
      price: this.data.addGood.addGoodPrice,
      isChecked: false,
      iid: this.data.addGood.iid,
      standard: JSON.parse(JSON.stringify(this.data.addGood.standard)),
      selling: this.data.addGood.selling,
      imageUrl: this.data.addGood.addGoodImage
    }
    const standard = []
    for (const item of addGood.standard) {
      if(item.title == '请填写规格名称'){
        totast('当前规格存在默认名称,请及时更改',2000)
        return
      }
      const obj = {
        "attributes": [],
        "specName": item.title
      }
      for (const item1 of item.type) {
        if(item1.typeName == '请添加类型名称'){
          totast('当前类型存在默认名称,请及时更改',2000)
        return
        }
        const attr = {
          "attributeId": item1.typeId,
          "attributeName": item1.typeName,
          "attributePrice": item1.typeSaledMoney,
        }
        obj["attributes"].push(attr)
      }
      standard.push(obj)
    }
    //获取input内的值
    // this.getQueryInputValue('.editGoodName', addGood, "goodsName")
    // this.getQueryInputValue('.editGoodIntroduce', addGood, "introduce")
    // this.getQueryInputValue('.editGoodPrice', addGood, "price")
    setTimeout(() => {
      //判断是否为空
      if (addGood.goodsName == '' || addGood.price == '') {
        totast('存在输入为空,请检查后重试',2000)
      } else {
        //判断是在出售中还是售罄中,true在出售中
        if (addGood.selling) {
          //判断是否更改了图片,是否需要调上传图片接口
          if (this.data.list[index2].goods[itemIndex].imageUrl == addGood.imageUrl) {
            this._modifyGoodInfo(addGood.introduce, addGood.iid, addGood.goodsName, addGood.price, standard).then(res => {
              if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyGoodInfo_SUCCESS) ){
                //在出售中
                //判断是否从原本所在的类切换到其他分类,相等即说明index相对第一次获取到的index2没有改变,即没有切换分类
                if (index == index2) {
                  //没有切换分类,拿到itemIndex,将对应的商品直接用addGood覆盖
                  this.data.list[index].goods[itemIndex] = addGood
                } else {
                  //切换分类,需要将之前分类里的商品删除,再在新的分类里添加新的商品
                  this.data.list[index].goods.push(addGood)
                  this.data.list[index2].goods.splice(itemIndex, 1)
                }
                this.clearthisDataAddGood()
                this.setData({
                  list: this.data.list,
                  list1: this.data.list1,
                  addGood: this.data.addGood
                })
                this.hideModal()
              } else {
                totast('系统错误,商品信息修改失败,请重试', 1500)
              }
              hideLoading()
            })
          } else {
            loading('加载中')
            wx.uploadFile({
              filePath: addGood.imageUrl,
              name: 'file',
              url: BASE_URL + API_URL_addOrModifyGoodPicture,
              success: res => {
                if (res && (JSON.parse(res.data).code == STATUS_CODE_SUCCESSE || JSON.parse(res.data).code == STATUS_CODE_addOrModifyGoodPicture_SUCCESS) ){
                  this._modifyGoodInfo(addGood.introduce, addGood.iid, addGood.goodsName, addGood.price, standard, JSON.parse(res.data).data).then(result => {
                    if (result && (result.data.code == STATUS_CODE_SUCCESSE || result.data.code == STATUS_CODE_modifyGoodInfo_SUCCESS) ){
                      if (index == index2) {
                        //没有切换分类,拿到itemIndex,将对应的商品直接用addGood覆盖
                        this.data.list[index].goods[itemIndex] = addGood
                      } else {
                        //切换分类,需要将之前分类里的商品删除,再在新的分类里添加新的商品
                        this.data.list[index].goods.push(addGood)
                        this.data.list[index2].goods.splice(itemIndex, 1)
                      }
                      this.clearthisDataAddGood()
                      this.setData({
                        list: this.data.list,
                        list1: this.data.list1,
                        addGood: this.data.addGood
                      })
                      this.hideModal()
                    } else {
                      totast('系统错误,商品信息修改失败,请重试', 1500)
                    }
                  })
                } else {
                  totast('系统错误,商品信息修改失败,请重试', 1500)
                }
                hideLoading()
              },
              fail: res => {
                hideLoading()
                totast('系统错误,商品信息修改失败,请重试', 1500)
              }

            })
          }
        } else {
          if (this.data.list[index2].goods[itemIndex].imageUrl == addGood.imageUrl) {
            this._modifyGoodInfo(addGood.introduce, addGood.iid, addGood.goodsName, addGood.price, standard).then(res => {
              if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyGoodInfo_SUCCESS) ){
                this._modifyGoodSaleStatus(addGood.iid, 0).then(result => {
                  if (result && (result.data.code == STATUS_CODE_SUCCESSE || result.data.code == STATUS_CODE_modifyGoodSaleStatus_SUCCESS) ){
                    //售罄中
                    //拿到当前所在的分类的名字
                    const categoryName = this.data.list[index].name
                    //去售罄中查询是否有这个分类的名字
                    let flag = this.data.list1.findIndex(item => item.name == categoryName)
                    //flag == -1说明售罄中不存在这个分类
                    if (flag == -1) {
                      //需要新建一个分类
                      const newList = {
                        name: categoryName,
                        id: this.data.list[index].id,
                        goods: []
                      }
                      //往售罄中添加新的分类,再在新的分类(售罄中)添加编辑好的商品,然后将编辑好的商品从原来的所在分类(出售中)删除
                      this.data.list1.push(newList)
                      this.data.list1[this.data.list1.length - 1].goods.push(addGood)
                      this.data.list[index2].goods.splice(itemIndex, 1)
                    } else {
                      //flag != -1 说明售罄中存在这个分离,往这个分类(售罄中)添加编辑好的商品,然后将编辑好的商品从原来的所在分类(出售中)删除
                      this.data.list1[flag].goods.push(addGood)
                      this.data.list[index2].goods.splice(itemIndex, 1)
                    }
                    this.clearthisDataAddGood()
                    this.setData({
                      list: this.data.list,
                      list1: this.data.list1,
                      addGood: this.data.addGood
                    })
                    this.hideModal()
                  } else {
                    totast('系统错误,商品信息修改失败,请重试', 1500)
                  }
                  hideLoading()
                })
              } else {
                totast('系统错误,商品信息修改失败,请重试', 1500)
              }
              hideLoading()
            })
          } else {
            loading('加载中')
            wx.uploadFile({
              filePath: addGood.imageUrl,
              name: 'file',
              url: BASE_URL + API_URL_addOrModifyGoodPicture,
              success: res => {
                if (JSON.parse(res.data).code == STATUS_CODE_SUCCESSE || JSON.parse(res.data).code == STATUS_CODE_addOrModifyGoodPicture_SUCCESS) {
                  this._modifyGoodInfo(addGood.introduce, addGood.iid, addGood.goodsName, addGood.price, standard, JSON.parse(res.data).data).then(res1 => {
                    hideLoading()
                    if (res1.data.code == STATUS_CODE_SUCCESSE || res1.data.code == STATUS_CODE_modifyGoodInfo_SUCCESS) {
                      this._modifyGoodSaleStatus(addGood.iid, 0).then(res2 => {
                        if (res2.data.code == STATUS_CODE_SUCCESSE || res2.data.code == STATUS_CODE_modifyGoodSaleStatus_SUCCESS) {
                          //售罄中
                          //拿到当前所在的分类的名字
                          const categoryName = this.data.list[index].name
                          //去售罄中查询是否有这个分类的名字
                          let flag = this.data.list1.findIndex(item => item.name == categoryName)
                          //flag == -1说明售罄中不存在这个分类
                          if (flag == -1) {
                            //需要新建一个分类
                            const newList = {
                              name: categoryName,
                              id: this.data.list[index].id,
                              goods: []
                            }
                            //往售罄中添加新的分类,再在新的分类(售罄中)添加编辑好的商品,然后将编辑好的商品从原来的所在分类(出售中)删除
                            this.data.list1.push(newList)
                            this.data.list1[this.data.list1.length - 1].goods.push(addGood)
                            this.data.list[index2].goods.splice(itemIndex, 1)
                          } else {
                            //flag != -1 说明售罄中存在这个分离,往这个分类(售罄中)添加编辑好的商品,然后将编辑好的商品从原来的所在分类(出售中)删除
                            this.data.list1[flag].goods.push(addGood)
                            this.data.list[index2].goods.splice(itemIndex, 1)
                          }
                          this.clearthisDataAddGood()
                          this.setData({
                            list: this.data.list,
                            list1: this.data.list1,
                            addGood: this.data.addGood
                          })
                          this.hideModal()
                        } else {
                          totast('系统错误,商品信息修改失败,请重试', 1500)
                        }
                      })
                    } else {
                      totast('系统错误,商品信息修改失败,请重试', 1500)
                    }
                  })
                } else {
                  totast('系统错误,商品信息修改失败,请重试', 1500)
                }
                hideLoading()
              },
              fail: res => {
                hideLoading()
                totast('系统错误,商品信息修改失败,请重试', 1500)
              }
            })
          }

        }
      }
    }, 100)
    //时间毫米数不够 ，坑
  },
  /**
   * 这三个函数是上面三个函数的复制份
   * 纯粹用于售罄
   */
  showEditModal1(e, list1CurrentModalType) {
    let {
      addGood
    } = this.data
    const {
      index,
      itemindex
    } = e.currentTarget.dataset
    const {
      goodsName,
      introduce,
      price,
      saled,
      standard,
      selling,
      imageUrl,
      iid
    } = this.data.list1[index].goods[itemindex]
    addGood.addGoodName = goodsName
    addGood.addGoodIntroduce = introduce
    addGood.addGoodPrice = price
    addGood.saled = saled
    addGood.addGoodIndex2 = addGood.addGoodIndex = index
    addGood.addGoodItemIndex = itemindex
    addGood.standard = JSON.parse(JSON.stringify(standard))
    addGood.selling = selling
    addGood.addGoodImage = imageUrl
    addGood.iid = iid
    this.setData({
      addGood: this.data.addGood,
      list1CurrentModalType: 'list1'
    })
  },
  hideEditModal1() {
    let {
      addGood
    } = this.data
    addGood.addGoodIndex = addGood.addGoodItemIndex = addGood.addGoodIndex2 = null
    addGood.addGoodImage = []
    addGood.addGoodName = addGood.addGoodIntroduce = addGood.addGoodIntroduce = ''
    addGood.saled = addGood.price = 0
    addGood.selling = true
    this.setData({
      addGood: this.data.addGood,
      list1CurrentModalType: ''
    })
  },
  confirmEditGood1() {
    const index = this.data.addGood.addGoodIndex
    const itemIndex = this.data.addGood.addGoodItemIndex
    const addGood = {
      goodsName: this.data.addGood.addGoodName,
      introduce: this.data.addGood.addGoodIntroduce,
      saled: this.data.addGood.saled,
      price: this.data.addGood.addGoodPrice,
      isChecked: false,
      iid: this.data.addGood.iid,
      standard: JSON.parse(JSON.stringify(this.data.addGood.standard)),
      selling: this.data.addGood.selling,
      imageUrl: this.data.addGood.addGoodImage
    }
    if (addGood.selling) {
      this._modifyGoodSaleStatus(addGood.iid, 1).then(res => {
        
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyGoodSaleStatus_SUCCESS) ){
          const categoryName = this.data.list1[index].name
          let flag = this.data.list.findIndex(item => item.name == categoryName)
          if (flag == -1) {
            const newList = {
              name: categoryName,
              id: this.data.list1[index].id,
              goods: []
            }
            this.data.list.push(newList)
            this.data.list[this.data.list.length - 1].goods.push(addGood)
            this.data.list1[index].goods.splice(itemIndex, 1)
          } else {
            this.data.list[flag].goods.push(addGood)
            this.data.list1[index].goods.splice(itemIndex, 1)
          }
          this.clearthisDataAddGood()
          this.setData({
            list: this.data.list,
            list1: this.data.list1,
            addGood: this.data.addGood,
            list1CurrentModalType: ''
          })
        } else {
          totast('系统错误,修正商品状态失败,请重试', 1500)
        
        }hideLoading()
      })
    }
  },
  /**
   * 新增商品和编辑商品公用模块--规格增删查改
   */
  sellingSlideClick() {
    /**
     * 函数用于切换 出售中和售罄的位置
     */
    let {
      addGood
    } = this.data
    addGood.selling = !addGood.selling
    const temp = `addGood.selling`
    this.setData({
      [temp]: addGood.selling
    })
  },
  hideInputModal() {
    /**
     * 函数用于隐藏inputModal，同时将standardTypeIndex设为undefined,即默认为类型
     */
    this.data.addGood.standardTypeIndex = undefined
    const temp = `addGood.standardTypeIndex`
    const temp1 = `addGood.standard`
    this.setData({
      showInputModal: '',
      [temp]: this.data.addGood.standardTypeIndex,
      [temp1]: this.data.addGood.standard
    })
  },
  deleteStandard(e) {
    /**
     * 函数用于删除类型或规格
     * @param (typeindex) 与类型索引有关,用于知道类型在当前规格的位置,如果typeindex == undefined 说明当前点击的是编辑类型
     * @param (index) 与规格索引有关,用于知道当前的规格位置
     */
    let {
      addGood
    } = this.data
    const {
      index,
      typeindex
    } = e.currentTarget.dataset
    if (typeindex === undefined) {
      addGood.standard.splice(index, 1)
    } else {
      addGood.standard[index].type.splice(typeindex, 1)
    }
    const temp = `addGood.standard`
    this.setData({
      [temp]: this.data.addGood.standard
    })
  },
  editStandard(e) {
    /**
     * 函数用于唤起inputModal,编辑修改（类型或规格的）Name
     * @param (typeindex) 与类型索引有关,用于知道类型在当前规格的位置,如果typeindex == undefined 说明当前点击的是编辑类型
     * @param (index) 与规格索引有关,用于知道当前的规格位置
     */
    const {
      addGood
    } = this.data
    const {
      index,
      typeindex
    } = e.currentTarget.dataset
    let temp = `addGood.isStandardType`
    addGood.standardIndex = index
    addGood.standardTypeIndex = typeindex

    if (typeindex === undefined) {
      this.setData({
        inputValue: addGood.standard[index].title,
        [temp]: false
      })
    } else {
      this.setData({
        inputValue: addGood.standard[index].type[typeindex].typeName,
        inputValue1: addGood.standard[index].type[typeindex].typeSaledMoney,
        [temp]: true
      })
    }
    this.setData({
      showInputModal: 'inputModal'
    })
  },
  confirmEditStandard() {
    /**
     * 用于(确定)编辑修改（规格或类型）的Name
     * @param (typeindex) 与类型索引有关,用于知道类型在当前规格的位置,如果typeindex == undefined 说明当前点击的是编辑类型
     * @param (standardIndex) 与规格索引有关,用于知道当前的规格位置
     */
    let {
      addGood,
      inputValue,
      inputValue1
    } = this.data
    let {
      standardIndex,
      standardTypeIndex
    } = addGood
    const testValue = inputValue
    const testValue1 = inputValue1 + ''
    for (const item of testValue.split('')) {
      if(item == ' '){
        totast('输入存在空格,请检查',2000)
        return
      }
    }
    if(standardTypeIndex !== undefined){
      for (const item of testValue1.split('')) {
        if(item == ' '){
          totast('输入存在空格,请检查',2000)
          return
        }
      }
    }
    if (standardTypeIndex === undefined) {
      if(this.data.RE.isMinToMaxLength(inputValue.trim(),1,10)){
        addGood.standard[standardIndex].title = inputValue
        this.hideInputModal()
      }else{
        totast('请输入1~10位中文或数字',2000)
      }
    } else {
      if(this.data.RE.isMinToMaxLength(inputValue.trim(),1,10)){
        addGood.standard[standardIndex].type[standardTypeIndex].typeName = inputValue
        if(this.data.RE.isPositiveNumber(inputValue1.trim())){
          addGood.standard[standardIndex].type[standardTypeIndex].typeSaledMoney = inputValue1
          this.hideInputModal()
        }else{
          totast('请输入正确且至多小数点后两位的数字',2000)
        }
      }else{
        totast('请输入1~10位中文或数字',2000)
      }
      
    }
  },
  addStandard() {
    /**
     * 函数用于添加规格
     * 新增规格
     */
    let {
      addGood
    } = this.data
    const standard = {
      title: '请填写规格名称',
      type: []
    }
    addGood.standard.push(standard)
    const temp = `addGood.standard`
    this.setData({
      [temp]: this.data.addGood.standard
    })
  },
  addStandardType(e) {
    /**
     * 函数用于添加类型
     * @param (index) 用于知道当前的规格位置
     */
    let {
      addGood
    } = this.data
    const {
      index
    } = e.currentTarget.dataset
    const type = {
      typeName: '请添加类型名称',
      typeSaledMoney: '0'
    }
    addGood.standard[index].type.push(type)
    const temp = `addGood.standard`
    this.setData({
      [temp]: this.data.addGood.standard
    })
  }
})