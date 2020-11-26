/**
 * 对小程序的 loading,hideLoading,totast 封装
 */
export function loading(loadingContent){
  wx.showLoading({
    title: loadingContent,
  })
}
export function hideLoading(){
  wx.hideLoading()
}
export function totast(text,timeout=1500,icon='none'){
  wx.showToast({
    title: text,
    duration:timeout,
    icon:icon
  })

}
/**
 * 配置一些跟网络请求相关的常量
 */

/* export const BASE_URL = 'http://175.24.113.119:8081' */ //泽强的服务器
/* export const BASE_URL = 'http://192.168.1.104:8081' */

export const BASE_URL = 'http://192.168.1.103:8080'  //凯悦的服务器
export const USER_TOKEN = 'USER_TOKEN'
export const STATUS_CODE_TOKEN_OVERDUE = 10000
export const STATUS_CODE_SUCCESSE = 200
export const STATUS_CODE_getGoodsCategoryInfo = 1200

export const STATUS_CODE_modifyCategoryName_SUCCESS = 1202
export const STATUS_CODE_deleteCategory_SUCCESS = 1203
export const STATUS_CODE_addCategory_SUCCESS = 1204
export const STATUS_CODE_getShopInfo_SUCCESS = 1200
export const STATUS_CODE_modifyBizStatus_SUCCESS = 1202
export const STATUS_CODE_modifyReceiveStatus_SUCCESS = 1202
export const STATUS_CODE_modifyShopInfo_SUCCESS = 1206
export const STATUS_CODE_getShopReviewStatus_SUCCESS = 1200
export const STATUS_CODE_getCategoryAndGoodsInfo_SUCCESS = 1200
export const STATUS_CODE_addGoods_SUCCESS = 1202


//凯悦的接口
export const STATUS_CODE_getShopWorkInfo1_SUCCESS = 3208
export const STATUS_CODE_getOrders_SUCCES = 3203
/**
 * api 名称
 */
//泽强的接口
export const API_URL_getGoodsCategoryInfo = '/getCommodityInfo/businessGetCategory'
export const API_URL_deleteCategory = '/modifyCategory/deleteCategory'
export const API_URL_addCategory = '/modifyCategory/insertCategory'
export const API_URL_modifyCategoryName = '/modifyCategory/updateCategory'
export const API_URL_getShopProfileInfo = '/getShopInfo/businessGetShop'
export const API_URL_modifyBizStatus = '/modifyShopInfo/updateRunStatus'
export const API_URL_modifyReceiveStatus = '/modifyShopInfo/updateAutoOrder'
export const API_URL_modifyShopInfo = '/modifyShopInfo/updateShopInfo'
export const API_URL_getShopReviewStatus = '/getShopInfo/shopIdGetShopUpdate'
export const API_URL_getCategoryAndGoodsInfo = '/getCommodityInfo/businessGetCommodity'
export const API_URL_addGoods = '/modifyCommodity/insertCommodity'

// 凯悦的接口

export const API_URL_getShopWorkInfo1 = '/data/getStatisticalData'
export const API_URL_getOrders = '/order/getShopOrderByStatus'
