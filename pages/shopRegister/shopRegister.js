// pages/shopRegister/shopRegister.js
import {
  BASE_URL,
  loading,
  hideLoading,
  totast,
  STATUS_CODE_getAllSchool_SUCCESS,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_addOrModifyGoodPicture_SUCCESS,
  API_URL_getAllSchool,
  API_URL_modifyPicture,
  API_URL_modifyShopLicense,
  STATUS_CODE_modifyShopLicense_SUCCESS,
  API_URL_getShopType,
  STATUS_CODE_getShopType_SUCCESS,
  API_URL_modifyShopInfo,
  STATUS_CODE_modifyShopInfo_SUCCESS
} from '../../services/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    busLicense: '',
    pictureArray: [{
        url: '',
        name: 'busLicense',
        chineseName: '营业执照'
      },
      {
        url: '',
        name: 'cardFront',
        chineseName: '身份证正面'
      },
      {
        url: '',
        name: 'cardBack',
        chineseName: '身份证反面'
      },
      {
        url: '',
        name: 'restLicense',
        chineseName: '餐饮许可证'
      },
      {
        url: '',
        name: 'shopIn',
        chineseName: '门店内部'
      },
      {
        url: '',
        name: 'shopOut',
        chineseName: '门店照片'
      }
    ],
    picturePath: [{
        url: '',
        name: 'busLicense',
        chineseName: '营业执照'
      },
      {
        url: '',
        name: 'cardFront',
        chineseName: '身份证正面'
      },
      {
        url: '',
        name: 'cardBack',
        chineseName: '身份证反面'
      },
      {
        url: '',
        name: 'restLicense',
        chineseName: '餐饮许可证'
      },
      {
        url: '',
        name: 'shopIn',
        chineseName: '门店内部'
      },
      {
        url: '',
        name: 'shopOut',
        chineseName: '门店照片'
      }
    ],
    showPicture: true,
    storeInfo: {
      shopHead: '',
      storeName: '',
      storeAddress: '',
      storeIntroduce: '',
      phoneNumber: 1,
      schoolAddress: [],
      shopType:[]
    },
    currentModalType: '',
    inputTitle: '',
    inputType: '',
    inputValue: '',
    showChangeButton: true,
    schoolPickerRange: ['好大学', '啊实打实的撒', '的风格DVD发', '上的分歧日期', '陈晓旭插线板v插线板v出现', 'i我却日哦权威哦', ],
    shopTypePickerRange:[],
    path:''
  },
  onLoad() {
    this._getAllSchool()
    this._getShopType()
  },
  back() {
    this.setData({
      showPicture: true
    })
  },
  finallyConfirmAndupLoadFile() {
    const {storeInfo} = this.data
    let campusArray = []
    let shopTypeArray = []
    for (const [key,item] of storeInfo.schoolAddress.entries()) {
      campusArray.push(item.campusName)
    }
    for (const [key,item] of storeInfo.shopType.entries()) {
      shopTypeArray.push(item.categoryName)
    }
    let schoolcampus = campusArray.join(',')
    let shopType = shopTypeArray.join('')
    loading('上传中')
    wx.request({
      url: BASE_URL + '/modifyShopInfo/initShopInfo',
      method:'POST',
      header:{
        'Content-Type':'application/x-www-form-urlencoded'
      },
      data:{
        campusAddress:schoolcampus,
        contactPhone:storeInfo.phoneNumber,
        detailAddress:storeInfo.storeAddress,
        shopCategory:shopType,
        shopHead:this.data.picturePath[5].url,
        shopIntroduce:storeInfo.storeIntroduce,
        shopName:storeInfo.storeName,
        licenseUuid:this.data.path
      },
      success:res=>{
        if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == 1204){
          totast('提交成功,审核中',1500)
          wx.switchTab({
            url: '/pages/work/work',
          })
        }else{
          totast('上传失败,请重试',1500)
        }
        hideLoading()
      },
      fail:res=>{
        hideLoading()
        totast('上传失败,请重试',1500)
      }
    })
  },
  _getShopType(){
    loading('加载中')
    wx.request({
      url: BASE_URL + API_URL_getShopType,
      success:res=>{
        if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopType_SUCCESS){
          this.setData({
            shopTypePickerRange:res.data.data
          })
        }else{
          totast('加载失败,请重试',1500)
        }
        hideLoading()
      },
      fail:res=>{
        hideLoading()
        totast('加载失败,请重试',1500)
      }
    })
  },
  _getAllSchool() {
    loading('加载中')
    wx.request({
      url: BASE_URL + API_URL_getAllSchool,
      success: res => {
        if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getAllSchool_SUCCESS) {
          this.setData({
            schoolPickerRange: res.data.data
          })
        } else {
          totast('系统错误,校区获取失败', 1500)
        }
        hideLoading()
      },
      fail: res => {
        hideLoading()
        totast('系统错误,请重试', 1500)
      }
    })
  },
  chooseImage(e) {
    const {
      index
    } = e.currentTarget.dataset
    let tempPicDataSrc = `pictureArray[${index}].url`
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        this.setData({
          [tempPicDataSrc]: res.tempFilePaths[0],
        })
      }
    })
  },
  startFirst(e) {
    let t = 0
    for (const item of this.data.pictureArray) {
      if (item.url == '') {
        totast('图片不允许为空', 1500)
        break
      } else {
        t++
      }
    }
    if (t == this.data.pictureArray.length) {
      this.firstNext(e,0)
    }
  },
  firstNext(e, index1) {
    let index = index1
    let {
      pictureArray
    } = this.data
    loading('上传中')
    wx.uploadFile({
      filePath: pictureArray[index].url,
      name: 'file',
      url: BASE_URL + API_URL_modifyPicture,
      formData: {
        name: pictureArray[index].name
      },
      success: res => {
        res = JSON.parse(res.data)
        if (res.code == STATUS_CODE_SUCCESSE || res.code == STATUS_CODE_addOrModifyGoodPicture_SUCCESS) {
          const temp = `picturePath[${index}].url`
          index++
          this.setData({
            [temp]: res.data.url
          })
          if (index == pictureArray.length) {
            loading('加载中')
            wx.request({
              url: BASE_URL + API_URL_modifyShopLicense,
              method:'POST',
              header:{
                'Content-Type':'application/x-www-form-urlencoded'
              },
              data:{
                busLicense:this.data.picturePath[0].url,
                cardBack:this.data.picturePath[2].url,
                cardFront:this.data.picturePath[1].url,
                restLicense:this.data.picturePath[3].url,
                shopIn:this.data.picturePath[4].url,
                shopOut:this.data.picturePath[5].url,
              },
              success:res=>{
                if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyShopLicense_SUCCESS){
                  hideLoading()
                  this.setData({
                    path:res.data.data,
                    showPicture: false
                  })
                }else{
                  totast('上传图片失败,请重试',1500)
                }
              },
              fail:res=>{
                hideLoading()
                totast('上传图片失败,请重试',1500)
              }
            })
          } else {
            this.firstNext(e, index)
          }
        } else {
          hideLoading()
          totast('上传失败,请重试', 1000)
        }
      },
      fail: res => {
        hideLoading()
        totast('上传失败,请重试', 1000)
      }
    })
  },
  showModal(e, currentModalType){
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
  eventInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  getInput(e, inputType) {
    this.showModal(e, 'show')
    this.data.inputType = e.currentTarget.dataset.inputtype
    const title = e.currentTarget.dataset.title
    const value = this.data.storeInfo[this.data.inputType]
    this.setData({
      inputType: this.data.inputType,
      inputValue: value,
      inputTitle: title
    })
  },
  confirm() {
    const {
      inputType,
      inputValue
    } = this.data
    const storeInfo = `storeInfo.${inputType}`
    this.setData({
      [storeInfo]: inputValue,
    })
    this.hideModal()
  },
  deleteSchoolAddress(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      storeInfo,
      schoolPickerRange
    } = this.data
    schoolPickerRange.push(storeInfo.schoolAddress[index])
    storeInfo.schoolAddress.splice(index, 1)
    this.setData({
      storeInfo: this.data.storeInfo,
      schoolPickerRange: this.data.schoolPickerRange,
    })
  },
  addSchoolAddress(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      storeInfo,
      schoolPickerRange
    } = this.data
    storeInfo.schoolAddress.push(schoolPickerRange[index])
    schoolPickerRange.splice(index, 1)
    this.setData({
      storeInfo: this.data.storeInfo,
      schoolPickerRange: this.data.schoolPickerRange,
    })
  },
  showSchoolAddress() {
    this.setData({
      currentModalType: 'schoolAddress'
    })
  },
  showShopType(e){
    this.setData({
      currentModalType: 'shopType'
    })
  },
  addShopType(e){
    const {
      index
    } = e.currentTarget.dataset
    const {
      storeInfo,
      shopTypePickerRange
    } = this.data
    if(storeInfo.shopType.length >= 2){
      totast('最多选择2个分类',1000)
    }else{
      storeInfo.shopType.push(shopTypePickerRange[index])
      shopTypePickerRange.splice(index, 1)
      this.setData({
        storeInfo: this.data.storeInfo,
        shopTypePickerRange: this.data.shopTypePickerRange,
      })
    }
  },
  deleteShopType(e){
    const {
      index
    } = e.currentTarget.dataset
    const {
      storeInfo,
      shopTypePickerRange
    } = this.data
    shopTypePickerRange.push(storeInfo.shopType[index])
    storeInfo.shopType.splice(index, 1)
    this.setData({
      storeInfo: this.data.storeInfo,
      shopTypePickerRange: this.data.shopTypePickerRange,
    })
  }
})