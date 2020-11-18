// subPages/order/handleCategory/handleCategory.js
import {
  getGoodsCategoryInfo,
  deleteCategory,
  addCategory
} from '../../../services/work';

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
    }
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
    })
    this._getGoodsCategoryInfo()
  },
  onReady(){
    wx.hideLoading()
  },
  _getGoodsCategoryInfo() {
    getGoodsCategoryInfo().then(res => {
      let {category} = this.data
      for (const [index, item] of res.data.data.entries()) {
        const TempCategory = {
          category: item.categoryName,
          categoryId: item.categoryId,
          shopId: item.shopId
        }
        category.push(TempCategory)
      }
      this.setData({
        category:category
      })
    })
  },
  _deleteCategory(ids){
    return deleteCategory(ids)
  },
  _addCategory(){
    addCategory()
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
  modifyCategory(e) {
    this.data.category[this.data.currentIndex].category = this.data.modal[this.data.currentModalType].inputValue
    this.setData({
      category: this.data.category
    })
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
    this._deleteCategory(ids).then(res=>{
      reslove(res)
    }).then((res)=>{
      if(res.code)
      this.data.category.splice(this.data.currentIndex, 1)
      this.setData({
        category: this.data.category
      })
    })
    this.hideModal(e)
  },
  addCategory(e) {
    const data = {
      category: this.data.modal[this.data.currentModalType].inputValue,
      goods: []
    }
    this.data.category.push(data)
    this.data.modal[this.data.currentModalType].inputValue = ''
    this.setData({
      category: this.data.category,
      modal: this.data.modal
    })
    this.hideModal()
  }
})