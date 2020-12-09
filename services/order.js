import request from './network'
import {
  API_URL_getOrders,
  API_URL_getHadNewShopOrder,
  API_URL_getShopAllOrder,
  API_URL_modifyOrderStatus
}from './config'

export function getOrders(pageNum,size,status){
  return request({
    url:API_URL_getOrders,
    method:'POST',
    data:{
      pageNum,
      size,
      status
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

export function getShopAllOrder(pageNumber,pageSize){
  return request({
    url:API_URL_getShopAllOrder,
    method:'POST',
    data:{
      pageNumber,pageSize
    }
  })
}

export function modifyOrderStatus(id,orderId,userId,status){
  return request({
    url:API_URL_modifyOrderStatus,
    method:'POST',
    data:{
      id,orderId,userId,status
    }
  })
}