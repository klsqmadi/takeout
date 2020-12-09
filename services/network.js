import {
  loading,
  hideLoading,
  totast,
  BASE_URL,
  BASE_URL_3,
  USER_TOKEN,
  STATUS_CODE_TOKEN_OVERDUE,
  STATUS_CODE_SUCCESSE
} from './config'

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
const arr_BASE_URL = [BASE_URL, '', BASE_URL_3]
export default function (option, headerContentType, BASE_URL_Index = 1) {
  let TOKEN = wx.getStorageSync('token') || null
  let id = wx.getStorageSync('id') || null
  const BASE_url = arr_BASE_URL[BASE_URL_Index - 1]
  const tempData = option.data || {}
  tempData.businessId = id
  if (TOKEN && id) {
    return new Promise((reslove, reject) => {
      loading('加载中')
      wx.request({
        url: `${BASE_url}${option.url}`,
        method: option.method || 'get',
        header: {
          'content-type': headerContentType || 'application/json',
          // 'Authorization':TOKEN
          'businessToken': TOKEN
        },
        data: tempData,
        // data:option.data||{},
        timeout: option.timeout || 100000,
        success: res => {
          if (res.data.code == STATUS_CODE_TOKEN_OVERDUE) {
            wx.showModal({
              title: '提示',
              content: '登录已过期,请重新登录!',
              confirmText: '登录',
              success: (result) => {
                if (result.confirm) {
                  wx.navigateTo({
                    url: '/pages/login/login',
                  })
                }
              },
              fail: () => {
                wx.navigateTo({
                  url: '/pages/wxLogin/wxLogin',
                })
              }
            })
          } else {
            return reslove(res)
          }
        },
        // success:reslove,
        fail: reject
      })
    }).catch(() => {
      hideLoading()
      totast('系统错误', 1500)
    })
  }
}