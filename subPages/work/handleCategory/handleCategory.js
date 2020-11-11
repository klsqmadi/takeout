// subPages/order/handleCategory/handleCategory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames:0,
    category:[
      {category:'大类1',goods:['1111','1111','1111','1111','1111','1111']},
      {category:'大类2',goods:['2222','2222','2222','2222','2222','2222']},
      {category:'大类3',goods:['3333','3333','3333','3333','3333','3333']},
      {category:'大类4',goods:['4444','4444','4444','4444','4444','4444']},
      {category:'大类5',goods:['5555','5555','5555','5555','5555','5555']},
      {category:'大类6',goods:['6666','6666','6666','6666','6666','6666']}
    ],
    currentIndex:0,
    currentModalType:'',
    modalName:['edit','delete','add'],
    modal:{
      edit:{modalShow:false,inputValue:''},
      delete:{modalShow:false,inputValue:''},
      add:{modalShow:false,inputValue:''}
    }
  },
  /* onChange(e){
    const { key } = e.currentTarget.dataset;
    this.setData({
      [key]: e.detail,
    });
  }, */
  showModal(e,currentModalType){
    const index = e.currentTarget.dataset.index
    currentModalType = currentModalType || e.currentTarget.dataset.currentmodaltype
    this.data.modal[currentModalType].modalShow = true
    if(currentModalType == 'edit'){
      this.data.modal[currentModalType].inputValue = this.data.category[index].category
    }
   this.setData({
     currentModalType:currentModalType,
     modal:this.data.modal,
     currentIndex:index
   })
  },
  hideModal(e){
    /* this.data.modal[currentModalType].modalShow = false */
    this.setData({
      currentModalType:'',
      modal:this.data.modal
    })
  },
  //更改分类名
  modifyCategory(e){
    this.data.category[this.data.currentIndex].category = this.data.modal[this.data.currentModalType].inputValue
    this.setData({
      category:this.data.category
    })
    this.hideModal(e)
  },
  //监听input  实时响应value
  input(e){
    this.data.modal[this.data.currentModalType].inputValue = e.detail.value
    this.setData({
      modal:this.data.modal
    })
    
  },
  deleteCategory(e){
    this.data.category.splice(this.data.currentIndex,1)
    this.setData({
      category:this.data.category
    })
    this.hideModal(e)
  },
  addCategory(e){
    const data = {category:this.data.modal[this.data.currentModalType].inputValue,goods:[]}
    this.data.category.push(data)
    this.data.modal[this.data.currentModalType].inputValue = ''
    this.setData({
      category:this.data.category,
      modal:this.data.modal
    })
    this.hideModal()
  }
})