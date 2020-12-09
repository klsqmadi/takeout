// pages/shopRegister/shopRegister.js
import {
  BASE_URL
}from '../../services/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    busLicense:'',
    pictureNameArray:['busLicense','cardFront','cardBack','restLicense','shopIn','shopOut'],
    pictureArray:{
      'busLicense':{
        url:'',
        name:'busLicense',
        chineseName:'营业执照'
      },
      'cardFront':{
        url:'',
        name:'cardFront',
        chineseName:'身份证正面'
      },
      'cardBack':{
        url:'',
        name:'cardBack',
        chineseName:'身份证反面'
      },
      'restLicense':{
        url:'',
        name:'restLicense',
        chineseName:'餐饮许可证'
      },
      'shopIn':{
        url:'',
        name:'shopIn',
        chineseName:'门店内部'
      },
      'shopOut':{
        url:'',
        name:'shopOut',
        chineseName:'门店照片'
      }
    },
  },
  chooseImage(e){
    console.log(1);
    
    const {type} = e.currentTarget.dataset
    
    let tempPicDataSrc = `pictureArray.${type}.url`
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], //从相册选择
      success: (res) => {
        this.setData({
          [tempPicDataSrc]: res.tempFilePaths[0],
        })
      }
    })
  },
  uploadPic(){
    for (const item of this.data.pictureArray) {
      wx.uploadFile({
        filePath: item.url,
        name: 'file',
        url: BASE_URL,
        data:{
          
        }
      })
      
    }
  }

})