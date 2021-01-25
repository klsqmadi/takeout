// subPages/order/handleCategory/handleCategory.js
import {
  getGoodsCategoryInfo,
  deleteCategory,
  addCategory,
  modifyCategoryName,
} from '../../../services/work';

import {
  loading,
  hideLoading,
  totast,
  STATUS_CODE_SUCCESSE,
  STATUS_CODE_getGoodsCategoryInfo,
  STATUS_CODE_modifyCategoryName_SUCCESS,
  STATUS_CODE_deleteCategory_SUCCESS,
  STATUS_CODE_addCategory_SUCCESS
} from '../../../services/config'
import {
  RegExp
}from '../../../utils/RE'
Page({
  data: {
    activeNames: 0,
    category: [],
    currentIndex: 0,
    currentModalType: '',
    modalName: ['edit', 'delete', 'add'],
    modal: {
      edit: {
        modalShow: false,
        inputValue: ''
      },
      delete: {
        modalShow: false,
        inputValue: ''
      },
      add: {
        modalShow: false,
        inputValue: ''
      }
    },
    noticeContent: '系统错误',
    inputValue:'',
  },
  onLoad() {
    this.data.RE = new RegExp()
    this._getGoodsCategoryInfo()
  },
  onReady() {
  },
  onShow() {
    
  },
  _getGoodsCategoryInfo() {
    loading('加载中')
    getGoodsCategoryInfo().then(res => {
      if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getGoodsCategoryInfo) ){
        if(res.data.data){
          let {
            category
          } = this.data
          for (const [index, item] of res.data.data.entries()) {
            const TempCategory = {
              category: item.categoryName,
              categoryId: item.categoryId,
              shopId: item.shopId
            }
            category.push(TempCategory)
          }
          this.setData({
            category: category
          })
        }
      } else {
        totast('系统错误,信息获取失败', 1500)
      }
      hideLoading()
    })
  },
  _deleteCategory(ids) {
    return deleteCategory(ids)
  },
  _addCategory(categoryName) {
    return addCategory(categoryName)
  },
  _modifyCategoryName(categoryyId, categoryName) {
    return modifyCategoryName(categoryyId, categoryName)
  },
  showModal(currentModalType) {
    this.setData({
      currentModalType:currentModalType
    })
  },
  showEditModal(e){
    const {index} = e.currentTarget.dataset
    this.showModal('edit')
    this.setData({
      currentIndex:index,
      inputValue:this.data.category[index].category
    })
  },
  showAddModal(){
    this.showModal('add')
  },
  showDeleteModal(e){
    this.showModal('delete')
    this.setData({
      currentIndex:e.currentTarget.dataset.index
    })
  },
  hideModal() {
    this.setData({
      currentModalType: ''
    })
  },
  //更改分类名
  modifyCategory(e) {
    const {
      category,
      currentIndex,
      inputValue
    } = this.data
    const testInputValue = inputValue
    for (const item of testInputValue.split('')) {
      if(item == ' '){
        totast('输入存在空格,请检查',1500)
        return
      }
    }
    if(this.data.RE.isMinToMaxLength(inputValue.trim(),1,10)){
      this._modifyCategoryName(category[currentIndex].categoryId,inputValue).then(res => {
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyCategoryName_SUCCESS) ){
          category[currentIndex].category = inputValue
          this.setData({
            category: this.data.category
          })
        } else {
          totast('系统错误,更改名称失败', 2000)
        }
        hideLoading()
        this.hideModal()
      })
    }else{
      totast('请输入1~10位中文或数字',2000)
    }
  },
  //监听input  实时响应value
  deleteCategory(e) {
    const ids = []
    const categoryId = this.data.category[this.data.currentIndex].categoryId
    ids.push(categoryId)
    this._deleteCategory(ids).then(res => {
      if (res&& (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_deleteCategory_SUCCESS) ){
        this.data.category.splice(this.data.currentIndex, 1)
        this.setData({
          category: this.data.category
        })
      } else {
        totast('系统错误,删除失败', 2000)
      }
      hideLoading()
      this.hideModal(e)
    })
  },
  addCategory(e) {
    const {inputValue} = this.data
    const testInputValue = inputValue
    for (const item of testInputValue.split('')) {
      if(item == ' '){
        totast('输入存在空格,请检查',1500)
        return
      }
    }
    if(this.data.RE.isMinToMaxLength(inputValue.trim(),1,10)){
      this._addCategory(inputValue).then(res => {
        if (res && (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_addCategory_SUCCESS) ){
          const data = {
            category: inputValue,
            goods: []
          }
          data.categoryId = res.data.data
          this.data.category.push(data)
          this.setData({
            category: this.data.category
          })
        } else {
          totast('系统错误,添加分类失败', 2000)
        }
        hideLoading()
        this.hideModal()
      })
    }else{
      totast('请输入1~10位中文或数字',2000)
    }
  },
  eventInput(e){
    this.setData({
      inputValue:e.detail.value
    })
  }
})