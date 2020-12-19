import request from './network'
import {
  API_URL_getOrders,
  API_URL_getHadNewShopOrder,
  API_URL_getShopAllOrder,
  API_URL_modifyOrderStatus
}from './config'

export function getOrders(pageNum,size,status,shopId){
  return request({
    url:API_URL_getOrders,
    method:'POST',
    data:{
      pageNum,
      size,
      status,
      shopId
    }
  })
}

export function getHadNewShopOrder(orderNumber,status){
  return request({
    url:API_URL_getHadNewShopOrder,
    method:'POST',
    data:{
      orderNumber,status
    }
  })
}

export function getShopAllOrder(pageNum,size,shopId){
  return request({
    url:API_URL_getShopAllOrder,
    method:'POST',
    data:{
      pageNum,size,shopId
    }
  })
}

export function modifyOrderStatus(id,orderNumber,orderId,userId,status){
  return request({
    url:API_URL_modifyOrderStatus,
    method:'POST',
    data:{
      id,orderNumber,orderId,userId,status
    }
  })
}