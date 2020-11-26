import request from './network'
import {
  /*泽强的接口 */
  API_URL_getGoodsCategoryInfo,
  API_URL_deleteCategory,
  API_URL_addCategory,
  API_URL_modifyCategoryName,
  API_URL_getCategoryAndGoodsInfo,
  API_URL_addGoods,
  /*凯悦的接口 */
  API_URL_getShopWorkInfo1,
} from './config'

/*泽强的接口 */
export function getGoodsCategoryInfo(){
  return request({
    url:API_URL_getGoodsCategoryInfo
  })
}

export function deleteCategory(ids){
  return request({
    url:API_URL_deleteCategory,
    method:'POST',
    data:ids
  })
}

export function addCategory(categoryName){
  return request({
    url:API_URL_addCategory,
    method:'POST',
    data:categoryName
  })
}

export function modifyCategoryName(categoryId,categoryName){
  return request({
    url:API_URL_modifyCategoryName,
    method:'POST',
    data:{
      categoryId,
      categoryName
    }
  },'application/x-www-form-urlencoded')
}

export function getCategoryAndGoodsInfo(saleStatus){
  return request({
    url:API_URL_getCategoryAndGoodsInfo,
    method:'POST',
    data:{
      saleStatus
    }
  },'application/x-www-form-urlencoded')
}

export function addGoods(commodityInfoQuery,file){
  return request({
    url:API_URL_addGoods,
    method:'POST',
    data:{
      commodityInfoQuery,
      file
    }
  },'multipart/form-data')
}
/**
 * 凯悦的接口
 */
export function getShopWorkInfo1(){
  return request({
    url:API_URL_getShopWorkInfo1
  })
}


