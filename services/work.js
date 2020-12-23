import request from './network'
import {
  /*泽强的接口 */
  API_URL_getGoodsCategoryInfo,
  API_URL_deleteCategory,
  API_URL_addCategory,
  API_URL_modifyCategoryName,
  API_URL_getCategoryAndGoodsInfo,
  API_URL_addGood,
  API_URL_deleteGoods,  
  API_URL_modifyGoodSaleStatus,
  API_URL_modifyGoodInfo,
  API_URL_getShopRegisterInfo,
  /*凯悦的接口 */
  API_URL_getShopWorkInfo1,
} from './config'

/*泽强的接口 */
export function getGoodsCategoryInfo(){
  return request({
    url:API_URL_getGoodsCategoryInfo,
    method:'POST'
  },'application/x-www-form-urlencoded')
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
    data:{
      categoryName
    }
  },'application/x-www-form-urlencoded')
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

export function addGood(categoryId,commodityDetail,commodityName,commodityPhoto,price,specs){
  return request({
    url:API_URL_addGood,
    method:'POST',
    data:{
      categoryId,commodityDetail,commodityName,commodityPhoto,price,specs
    }
  })
}

export function deleteGoods(ids){
  return request({
    url:API_URL_deleteGoods,
    method:'POST',
    data:{
      ids
    }
  },'application/x-www-form-urlencoded')
}

export function modifyGoodSaleStatus(commodityId,status){
  return request({
    url:API_URL_modifyGoodSaleStatus,
    method:'POST',
    data:{
      commodityId,status
    }
  },'application/x-www-form-urlencoded')
}

export function modifyGoodInfo(commodityDetail,commodityId,commodityName,price,specs,commodityPhoto){
  return request({
    url:API_URL_modifyGoodInfo,
    method:'POST',
    data:{
      commodityDetail,commodityId,commodityName,price,specs,commodityPhoto
    }
  })
}
/**
 * 凯悦的接口
 */
export function getShopWorkInfo1(shopId){
  return request({
    url:API_URL_getShopWorkInfo1,
    data:{
      shopId
    }
  })
}

export function getShopRegisterInfo(){
  return request({
    url:API_URL_getShopRegisterInfo,
    method:'POST'
  },'application/x-www-form-urlencoded')
}


