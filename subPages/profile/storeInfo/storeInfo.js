// subPages/profile/storeInfo/storeInfo.js
import{
  BASE_URL,
  API_URL_modifyShopInfo,
  loading,
  hideLoading,
  totast,
  STATUS_CODE_getShopInfo_SUCCESS,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_modifyShopInfo_SUCCESS,
  STATUS_CODE_getShopReviewStatus_SUCCESS,
  STATUS_CODE_getAllSchool_SUCCESS
}from '../../../services/config'
import{
  getShopProfileInfo,
  getShopReviewStatus,
  getAllSchool
}from '../../../services/profile'
Page({
  data: {
    showChangeButton: false,
    storeInfo: {
      storeImageUrl: null,
      storeName: '',
      storeAddress: '',
      storeIntroduce: '',
      phoneNumber: 1,
      schoolAddress: []
    },
    shopReviewStatus:1,
    currentModalType: '',
    inputTitle: '',
    inputType: '',
    inputValue: '',
    showChangeButton: false,
    havedChooseImage:0,
    schoolPickerRange: ['好大学', '啊实打实的撒', '的风格DVD发', '上的分歧日期', '陈晓旭插线板v插线板v出现', 'i我却日哦权威哦', ]
  },
  async onLoad(){
    const {storeInfo} = this.data
    await this._getShopInfo().then(res=>{
      hideLoading()
      if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getShopInfo_SUCCESS){
        const result = res.data.data
        storeInfo.storeImageUrl = BASE_URL + '/' + result.shopHead
        storeInfo.phoneNumber = result.contactPhone
        storeInfo.storeIntroduce = result.shopIntroduce
        storeInfo.shopId = result.shopId
        storeInfo.storeAddress = result.detailAddress
        storeInfo.storeName = result.shopName
        storeInfo.schoolAddress = result.campusAddress
        this.setData({
          storeInfo:this.data.storeInfo
        })
      }
      else{
        totast('系统错误,获取店铺信息失败',1500)
      }      
    })
    await this._getShopReviewStatus(1).then(result=>{
        hideLoading()
        if(result.data.code == STATUS_CODE_SUCCESSE || result.data.code == STATUS_CODE_getShopReviewStatus_SUCCESS){
          this.setData({
            shopReviewStatus:result.data.data[0].auditChecked
          })
        }else{
          totast('系统错误,获取店铺信息失败',1500)
        }
      })
    this._getAllSchool()
  },
  _getShopInfo(){
    return getShopProfileInfo()
  },
  _getShopReviewStatus(shopId){
    return getShopReviewStatus(shopId)
  },
  _modifyShopInfo(campusAddress,contactPhone,detailAddress,shopCategory,shopId,shopIntroduce,shopName){
    return new Promise((reslove,reject)=>{
      loading('加载中')
      wx.request({
        url: `${BASE_URL}${API_URL_modifyShopInfo}`,
        method:'POST',
        header:{
          'content-type':'application/x-www-form-urlencoded'
          /* 'content-type':'multipart/form-data' */
        },
        data:{
          campusAddress,contactPhone,detailAddress,shopCategory,shopId,shopIntroduce,shopName
        },
        timeout:10000,
        success:reslove,
        fail:reject
      })
    }).catch(()=>{
      hideLoading()
      totast('系统错误',1500)
    })
  },
  _getAllSchool(){
    getAllSchool().then(res=>{
      hideLoading()
      if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getAllSchool_SUCCESS){
        this.setData({
          schoolPickerRange:res.data.data
        })
      }else{
        totast('系统错误,校区获取失败',1500)
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
    const {inputType,inputValue} = this.data
    const storeInfo = `storeInfo.${inputType}`
    this.setData({
      [storeInfo]: inputValue,
      showChangeButton: true
    })
    this.hideModal()
  },
  getImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.setData({
          ["storeInfo.storeImageUrl"]: res.tempFilePaths[0],
          showChangeButton:true,
          havedChooseImage:1
        })
      }
    })
  },
  deleteSchoolAddress(e) {
    const {index} = e.currentTarget.dataset
    const {storeInfo,schoolPickerRange} = this.data
    schoolPickerRange.push(storeInfo.schoolAddress[index])
    storeInfo.schoolAddress.splice(index, 1)
    this.setData({
      storeInfo: this.data.storeInfo,
      schoolPickerRange:this.data.schoolPickerRange,
      showChangeButton:true
    })
  },
  addSchoolAddress(e) {
    const {index} = e.currentTarget.dataset
    const {storeInfo,schoolPickerRange} = this.data
    storeInfo.schoolAddress.push(schoolPickerRange[index])
    schoolPickerRange.splice(index,1)
    this.setData({
      storeInfo: this.data.storeInfo,
      schoolPickerRange:this.data.schoolPickerRange,
      showChangeButton:true
    })
  },
  showSchoolAddress() {
    this.setData({
      currentModalType: 'schoolAddress'
    })
  },
  finallyConfirmAndupLoadFile(){
    const {storeInfo} = this.data
    let schoolAddress = storeInfo.schoolAddress.join(',')
    loading('上传中')
    if(this.data.havedChooseImage){
      wx.uploadFile({
        filePath: storeInfo.storeImageUrl,
        name: 'file',
        url: BASE_URL + API_URL_modifyShopInfo,
        header:{
          'Content-Type': 'multipart/form-data'
        },
        formData:{
          campusAddress:schoolAddress,
          contactPhone:storeInfo.phoneNumber,
          detailAddress:storeInfo.storeAddress,
          shopName:storeInfo.storeName,
          shopIntroduce:storeInfo.storeIntroduce,
          shopId:storeInfo.shopId,
          shopCategory:1
        },
        success(res){
          hideLoading()
          if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyShopInfo_SUCCESS){
            totast('信息修改成功',1500,'success')
              setTimeout(()=>{
                wx.navigateBack({
                  delta: 1,
                })
              },1700)
          }else{
            totast('系统错误,修改信息失败',1500)
          }
        },
        fail(res){
          hideLoading()
          totast('系统错误,修改失败',1500)
        }
      })
    }else{
      this._modifyShopInfo(schoolAddress,storeInfo.phoneNumber,storeInfo.storeAddress,1,storeInfo.shopId,storeInfo.storeIntroduce,storeInfo.storeName).then(res=>{
        hideLoading()
        if(res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyShopInfo_SUCCESS){
          totast('信息修改成功',1500,'success')
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            })
          },1700)
        }else{
          totast('系统错误,修改信息失败3',1500)
        }
      })
    }
  }
})