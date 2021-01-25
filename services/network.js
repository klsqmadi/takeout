import {
  loading,
  hideLoading,
  totast,
  BASE_URL,
  USER_TOKEN,
  STATUS_CODE_TOKEN_OVERDUE,
  STATUS_CODE_SUCCESSE
} from './config'

export default function (option, headerContentType) {
  return new Promise((reslove, reject) => {
      let TOKEN = wx.getStorageSync('token') || null
      let Bid = wx.getStorageSync('id') || null
      if (!TOKEN || !Bid) {
        hideLoading()
        wx.redirectTo({
          url: '/pages/wxLogin/wxLogin',
        })
      } else {
        const tempData = option.data || {}
        tempData.businessId = Bid
        loading('加载中')
        wx.request({
          url: `${BASE_URL}${option.url}`,
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
                      url: '/pages/wxLogin/wxLogin',
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
      }
    })
    .catch(() => {
      hideLoading()
      totast('系统错误,加载失败', 1500)
    })
}