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
/* export const BASE_URL = 'http://121.41.229.2:8081' */
export const BASE_URL = 'http://192.168.1.100:8080'

// export const BASE_URL = 'http://192.168.1.111:8080'  //凯悦的服务器
// export const BASE_URL = 'http://175.24.113.119:8080'
export const WEB_SOCKET_URL = 'ws://192.168.1.111:58080/ws'

export const BASE_URL_3 = 'http://47.93.19.109:18080' //东龙服务器
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
export const STATUS_CODE_addGood_SUCCESS = 1204
export const STATUS_CODE_addOrModifyGoodPicture_SUCCESS = 1205
export const STATUS_CODE_deleteGoods_SUCCESS = 1203
export const STATUS_CODE_modifyGoodSaleStatus_SUCCESS = 1202
export const STATUS_CODE_modifyGoodInfo_SUCCESS = 1202
export const STATUS_CODE_loginShop_SUCCESS = 1209


//凯悦的状态
export const STATUS_CODE_getShopWorkInfo1_SUCCESS = 3208
export const STATUS_CODE_getOrders_SUCCES = 3203
export const STATUS_CODE_getHadNewShopOrder_SUCCESS = 3209
export const STATUS_CODE_getShopAllOrder_SUCCESS = 3203
export const STATUS_CODE_modifyOrderStatus_SUCCES = 3255

// 东龙的状态
export const STATUS_CODE_getAllSchool_SUCCESS = 2213
/**
 * api 名称
 */
//泽强的接口
export const API_URL_loginShop = '/business/codeLogin'
export const API_URL_getShopProfileInfo = '/getShopInfo/businessGetShop'
export const API_URL_getShopReviewStatus = '/getShopInfo/shopIdGetShopUpdate'
export const API_URL_getGoodsCategoryInfo = '/getCommodityInfo/businessGetCategory'
export const API_URL_getCategoryAndGoodsInfo = '/getCommodityInfo/businessGetCommodity'

export const API_URL_addGood = '/modifyCommodity/insertCommodity'
export const API_URL_addCategory = '/modifyCategory/insertCategory'
export const API_URL_addOrModifyGoodPicture = '/modifyCommodity/updateHead'

export const API_URL_modifyShopInfo = '/modifyShopInfo/updateShopInfo'
export const API_URL_modifyBizStatus = '/modifyShopInfo/updateRunStatus'
export const API_URL_modifyCategoryName = '/modifyCategory/updateCategory'
export const API_URL_modifyReceiveStatus = '/modifyShopInfo/updateAutoOrder'
export const API_URL_modifyGoodSaleStatus = '/modifyCommodity/updateSaleStatus'
export const API_URL_modifyGoodInfo = '/modifyCommodity/updateCommodity'

export const API_URL_deleteCategory = '/modifyCategory/deleteCategory'
export const API_URL_deleteGoods = '/modifyCommodity/deleteCommodity'

// 凯悦的接口

export const API_URL_getShopWorkInfo1 = '/data/getStatisticalData'
export const API_URL_getOrders = '/order/getShopOrderByStatus'
export const API_URL_getHadNewShopOrder = '/order/hadNewShopOrder'
// export const API_URL_getShopAllOrder = '/order/selectTotalShopOrder'
export const API_URL_getShopAllOrder = '/order/selectShopOrderHistory'
export const API_URL_modifyOrderStatus = '/order/updateOrderStatus'

// 东龙的接口
export const API_URL_getAllSchool = '/campus/selectAll'
