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
    noticeContent: '系统错误'
  },
  onLoad() {
    this._getGoodsCategoryInfo()
  },
  onReady() {
    hideLoading()
  },
  onShow() {
    let token = wx.getStorageSync('token') || null
    let id = wx.getStorageSync('id') || null
    if (!token && !id) {
      wx.redirectTo({
        url: '/pages/wxLogin/wxLogin',
        success: res => {
          console.log(res);
        }
      })
    }
  },
  _getGoodsCategoryInfo() {
    getGoodsCategoryInfo().then(res => {
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_getGoodsCategoryInfo) {
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
  showModal(e, currentModalType) {
    const index = e.currentTarget.dataset.index
    currentModalType = currentModalType || e.currentTarget.dataset.currentmodaltype
    this.data.modal[currentModalType].modalShow = true
    if (currentModalType == 'edit') {
      this.data.modal[currentModalType].inputValue = this.data.category[index].category
    }
    this.setData({
      currentModalType: currentModalType,
      modal: this.data.modal,
      currentIndex: index
    })
  },
  hideModal(e) {
    /* this.data.modal[currentModalType].modalShow = false */
    this.setData({
      currentModalType: '',
      modal: this.data.modal
    })
  },
  //更改分类名
  async modifyCategory(e) {
    const {
      category,
      currentIndex
    } = this.data
    await this._modifyCategoryName(category[currentIndex].categoryId, this.data.modal[this.data.currentModalType].inputValue).then(res => {
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_modifyCategoryName_SUCCESS) {
        category[currentIndex].category = this.data.modal[this.data.currentModalType].inputValue
        this.setData({
          category: this.data.category
        })
      } else {
        totast('系统错误,更改失败', 1500)
      }
    })
    hideLoading()
    this.hideModal(e)
  },
  //监听input  实时响应value
  input(e) {
    this.data.modal[this.data.currentModalType].inputValue = e.detail.value
    this.setData({
      modal: this.data.modal
    })

  },
  deleteCategory(e) {
    const ids = []
    const categoryId = this.data.category[this.data.currentIndex].categoryId
    ids.push(categoryId)
    this._deleteCategory(ids).then(res => {
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_deleteCategory_SUCCESS) {
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
    this._addCategory(this.data.modal[this.data.currentModalType].inputValue).then(res => {
      if (res.data.code == STATUS_CODE_SUCCESSE || res.data.code == STATUS_CODE_addCategory_SUCCESS) {
        const data = {
          category: this.data.modal[this.data.currentModalType].inputValue,
          goods: []
        }
        data.categoryId = res.data.data
        this.data.category.push(data)
        this.data.modal[this.data.currentModalType].inputValue = ''
        this.setData({
          category: this.data.category,
          modal: this.data.modal
        })
      } else {
        totast('系统错误,添加失败', 1500)
      }
      hideLoading()
      this.hideModal(e)
    })
  },
})