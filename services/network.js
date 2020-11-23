import {
  loading,
  hideLoading,
  totast,
  BASE_URL,
  USER_TOKEN,
  STATUS_CODE_TOKEN_OVERDUE,
  STATUS_CODE_SUCCESSE
} from './config'
/* import config from './config'

/* export default function(option){

  return new Promise((reslove,reject)=>{
    let TOKEN = wx.getStorageSync(USER_TOKEN)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: BASE_URL + option.url,
      method:option.method||'get',
      header:{
        'content-type':option.header['content-type'] || 'application/x-www-form-urlencoded',
        'token':TOKEN || ''
      },
      timeout:20000,
      data:option.data||{},
      success(res){
        wx.hideLoading()
        if(res.code == STATUS_CODE_TOKEN_OVERDUE){
          wx.showModal({
            title:'提示',
            content:'登录已过期,请重新登录!',
            confirmText:'去登录',
            success:(result)=>{
              if(res.confirm){
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            },
            fail:()=>{
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          })
        }else if(res.code == STATUS_CODE_LOGIN_SUCCESSE){
          return reslove(res)
        }
      },
      fail:(err)=>{
        wx.hideLoading()
        wx.showToast({
          title: '服务器网络错误!',
          icon: 'loading',
          duration: 1500
        })
        reject()
      }
    })
  })
} */

export default function(option,headerContentType){
  return new Promise((reslove,reject)=>{
    loading('加载中')
    wx.request({
      url: `${BASE_URL}${option.url}`,
      method:option.method||'get',
      header:{
        'content-type':headerContentType || 'application/json'
      },
      data:option.data||{},
      timeout:10000,
      success:reslove,
      fail:reject
    })
  }).catch(()=>{
    hideLoading()
    totast('系统错误',1500)
  })
}