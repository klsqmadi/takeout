// subPages/profile/storeInfo/storeInfo.js
import {
  RegExp
} from '../../../utils/RE'
import {
  BASE_URL,
  API_URL_modifyShopInfo,
  loading,
  hideLoading,
  totast,
  STATUS_CODE_getShopInfo_SUCCESS,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_modifyShopInfo_SUCCESS,
  STATUS_CODE_getShopReviewStatus_SUCCESS,
  STATUS_CODE_getAllSchool_SUCCESS,
  API_URL_getShopType,
  STATUS_CODE_getShopType_SUCCESS,
  API_URL_modifyPicture
} from '../../../services/config'
import {
  getShopProfileInfo,
  getShopReviewStatus,
  getAllSchool
} from '../../../services/profile'
Page({
  data: {
    showChangeButton: false,
    storeInfo: {
      storeImageUrl: null,
      storeName: '',
      storeAddress: '',
      storeIntroduce: '',
      phoneNumber: 1,
      schoolAddress: [],
      shopType: []
    },
    shopReviewStatus: 1,
    currentModalType: '',
    inputTitle: '',
    inputType: '',
    inputValue: '',
    showChangeButton: false,
    havedChooseImage: 0,
    schoolPickerRange: [],
    shopTypePickerRange: []
  },
  async onLoad() {
    this.data.RE = new RegExp()
    const {
      storeInfo
    } = this.data
    await this._getShopInfo().then(res => {
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopInfo_SUCCESS)) {
        const result = res.data.data
        storeInfo.storeImageUrl = BASE_URL + '/' + result.shopHead
        storeInfo.phoneNumber = result.contactPhone
        storeInfo.storeIntroduce = result.shopIntroduce
        storeInfo.shopId = result.shopId
        storeInfo.storeAddress = result.detailAddress
        storeInfo.storeName = result.shopName
        const tempCategory = {
          categoryName: result.shopCategory.slice(0, 2)
        }
        storeInfo.shopType.push(tempCategory)
        const tempCategory1 = {
          categoryName: result.shopCategory.slice(2)
        }
        if(tempCategory1.categoryName != '')storeInfo.shopType.push(tempCategory1)
        for (const item of result.campusAddress) {
          const obj = {
            campusName: item
          }
          storeInfo.schoolAddress.push(obj)
        }
        this.setData({
          storeInfo: this.data.storeInfo,
          shopReviewStatus:result.auditStatus
        })
      } else {
        totast('系统错误,获取店铺信息失败', 1500)
      }
      hideLoading()
    })
    await this._getShopReviewStatus(this.data.storeInfo.shopId).then(result => {
      if (result && (result.data.code == STATUS_CODE_SUCCESSE || result.data.code == STATUS_CODE_getShopReviewStatus_SUCCESS)) {
        if(result.data.data[0]){
          this.setData({
            shopReviewStatus: result.data.data[0].auditChecked
          })
        }
      } else {
        totast('系统错误,获取店铺信息失败', 1500)
      }
      hideLoading()
    })
    await this._getAllSchool()
    await this._getShopType()
  },
  _getShopInfo() {
    return getShopProfileInfo()
  },
  _getShopReviewStatus(shopId) {
    return getShopReviewStatus(shopId)
  },
  _modifyShopInfo(campusAddress, contactPhone, detailAddress, shopCategory, shopId, shopIntroduce, shopName, shopHead) {
    if(shopHead){
      return new Promise((reslove, reject) => {
        loading('加载中')
        wx.request({
          url: `${BASE_URL}${API_URL_modifyShopInfo}`,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
            /* 'content-type':'multipart/form-data' */
          },
          data: {
            campusAddress,
            contactPhone,
            detailAddress,
            shopCategory,
            shopId,
            shopIntroduce,
            shopName,
            shopHead
          },
          timeout: 10000,
          success: reslove,
          fail: reject
        })
      }).catch(() => {
        hideLoading()
        totast('系统错误', 1500)
      })
    }else{
      return new Promise((reslove, reject) => {
        loading('加载中')
        wx.request({
          url: `${BASE_URL}${API_URL_modifyShopInfo}`,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
            /* 'content-type':'multipart/form-data' */
          },
          data: {
            campusAddress,
            contactPhone,
            detailAddress,
            shopCategory,
            shopId,
            shopIntroduce,
            shopName
          },
          timeout: 10000,
          success: reslove,
          fail: reject
        })
      }).catch(() => {
        hideLoading()
        totast('系统错误', 1500)
      })
    }
  },
  _getAllSchool() {
    loading('加载中')
    getAllSchool().then(res => {
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getAllSchool_SUCCESS)) {
        this.setData({
          schoolPickerRange: res.data.data
        })
      } else {
        totast('系统错误,校区获取失败', 1500)
      }
      hideLoading()
    })
  },
  _getShopType() {
    loading('加载中')
    wx.request({
      url: BASE_URL + API_URL_getShopType,
      success: res => {
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopType_SUCCESS)) {
          this.setData({
            shopTypePickerRange: res.data.data
          })
        } else {
          totast('加载失败,请重试', 1500)
        }
        hideLoading()
      },
      fail: res => {
        hideLoading()
        totast('加载失败,请重试', 1500)
      }
    })
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
    const testValue = inputValue
    const storeInfo = `storeInfo.${inputType}`
    let flag = 0
    for (const item of testValue.split('')) {
      if (item == ' ') {
        totast('输入存在空格,请检查', 2000)
        return
      }
    }
    if (inputType == 'phoneNumber') {
      if (this.data.RE.isMobile(inputValue.trim())) {
        flag = 1
      } else {
        totast('请输入正确的手机号码', 2000)
      }
    } else {
      if (this.data.RE.isMinToMaxLength(inputValue.trim(), 2, 30)) {
        flag = 1
      } else {
        totast('请输入长度2~30的中文或数字', 2000)
      }
    }
    if (flag) {
      this.setData({
        [storeInfo]: inputValue,
        showChangeButton: true
      })
      this.hideModal()
    }
  },
  getImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          ["storeInfo.storeImageUrl"]: res.tempFilePaths[0],
          showChangeButton: true,
          havedChooseImage: 1
        })
      }
    })
  },
  deleteSchoolAddress(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      storeInfo,
      schoolPickerRange
    } = this.data
    let tempFlag = 0
    for (const item of this.data.schoolPickerRange) {
      if(item.campusName == storeInfo.schoolAddress[index].campusName){
        tempFlag = 1
        break
      }
    }
    tempFlag?'':schoolPickerRange.push(storeInfo.schoolAddress[index])
    storeInfo.schoolAddress.splice(index, 1)
    this.setData({
      storeInfo: this.data.storeInfo,
      schoolPickerRange: this.data.schoolPickerRange,
      showChangeButton: true
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
      showChangeButton: true
    })
  },
  showSchoolAddress() {
    this.setData({
      currentModalType: 'schoolAddress'
    })
  },
  finallyConfirmAndupLoadFile() {
    const {
      storeInfo
    } = this.data
    let campusArray = []
    let shopTypeArray = []
    for (const [key, item] of storeInfo.shopType.entries()) {
      shopTypeArray.push(item.categoryName)
    }
    for (const [key, item] of storeInfo.schoolAddress.entries()) {
      campusArray.push(item.campusName)
    }
    let shopType = shopTypeArray.join('')
    let schoolAddress = campusArray.join(',')
    loading('上传中')
    if (this.data.havedChooseImage) {
      wx.uploadFile({
        filePath: storeInfo.storeImageUrl,
        name: 'file',
        url: BASE_URL + API_URL_modifyPicture,
        success: res => {
          if (JSON.parse(res.data).code == STATUS_CODE_SUCCESSE || JSON.parse(res.data).code == 1205) {
            this._modifyShopInfo(schoolAddress, storeInfo.phoneNumber, storeInfo.storeAddress, shopType, storeInfo.shopId, storeInfo.storeIntroduce, storeInfo.storeName, JSON.parse(res.data).data).then(res2 => {
              if (res2 && (res2.data.code == STATUS_CODE_SUCCESSE || res2.data.code == STATUS_CODE_modifyShopInfo_SUCCESS)) {
                totast('信息修改成功', 1500, 'success')
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 1700)
              } else {
                totast('系统错误,修改信息失败', 1500)
              }
            })
          } else {
            totast('图片上传失败,请重试', 2000)
          }
          hideLoading()
        },
        fail: res => {
          hideLoading()
          totast('系统错误,修改失败', 1500)
        }
      })
    } else {
      this._modifyShopInfo(schoolAddress, storeInfo.phoneNumber, storeInfo.storeAddress, shopType, storeInfo.shopId, storeInfo.storeIntroduce, storeInfo.storeName).then(res => {
        hideLoading()
        if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyShopInfo_SUCCESS) {
          totast('信息修改成功', 1500, 'success')
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1700)
        } else {
          totast('系统错误,修改信息失败3', 1500)
        }
      })
    }
  },
  showShopType(e) {
    this.setData({
      currentModalType: 'shopType'
    })
  },
  addShopType(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      storeInfo,
      shopTypePickerRange
    } = this.data
    if (storeInfo.shopType.length >= 2) {
      totast('最多选择2个分类', 1000)
    } else {
      storeInfo.shopType.push(shopTypePickerRange[index])
      shopTypePickerRange.splice(index, 1)
      this.setData({
        storeInfo: this.data.storeInfo,
        shopTypePickerRange: this.data.shopTypePickerRange,
        showChangeButton:true
      })
    }
  },
  deleteShopType(e) {
    const {
      index
    } = e.currentTarget.dataset
    const {
      storeInfo,
      shopTypePickerRange
    } = this.data
    let tempFlag = 0
    for (const item of this.data.shopTypePickerRange) {
      if(storeInfo.shopType[index].categoryName == item.categoryName){
        tempFlag = 1
        break
      }
    }
    tempFlag?'':shopTypePickerRange.push(storeInfo.shopType[index])
    storeInfo.shopType.splice(index, 1)
    this.setData({
      storeInfo: this.data.storeInfo,
      shopTypePickerRange: this.data.shopTypePickerRange,
      showChangeButton:true
    })
  }
})