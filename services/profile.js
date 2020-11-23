import request from './network'
import {
  API_URL_getShopProfileInfo,
  API_URL_modifyBizStatus,
  API_URL_modifyReceiveStatus,
  API_URL_getShopReviewStatus,
  API_URL_modifyShopInfo
} from './config'

export function getShopProfileInfo(){
  return request({
    url:API_URL_getShopProfileInfo
  })
}

export function modifyBizStatus(runStatus){
  return request({
    url:API_URL_modifyBizStatus,
    method:'POST',
    data:runStatus
  })
}

export function modifyReceiveStatu(autoStatus){
  return request({
    url:API_URL_modifyReceiveStatus,
    method:'POST',
    data:autoStatus
  })
}

export function getShopReviewStatus(shopId){
  return request({
    url:API_URL_getShopReviewStatus,
    method:'POST',
    data:{
      shopId:shopId
    }
  },'application/x-www-form-urlencoded')
}