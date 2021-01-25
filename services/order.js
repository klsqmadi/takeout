import request from './network'
import {
  API_URL_getOrders,
  API_URL_getHadNewShopOrder,
  API_URL_getShopAllOrder,
  API_URL_modifyOrderStatus,
  API_URL_modifyOrderStatus_deliveryGoods,
  API_URL_refundMoneyToWX,
  API_URL_oncePaySharing
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

export function modifyOrderStatus_deliveryGoods(id){
  return request({
    url:API_URL_modifyOrderStatus_deliveryGoods,
    method:'POST',
    data:{
      id
    }
  },'application/x-www-form-urlencoded')
}

export function refundMoneyToWX(orderNumber,totalAmount,refundDesc){
  return request({
    url:API_URL_refundMoneyToWX,
    method:'POST',
    data:{
      orderNumber,
      totalAmount,
      refundDesc
    }
  },'application/x-www-form-urlencoded')
}

export function oncePaySharing(orderNumber,totalAmount,deliveryFee,shopId){
  return request({
    url:API_URL_oncePaySharing,
    method:'POST',
    data:{
      orderNumber,
      totalAmount,
      deliveryFee,
      shopId,
      shopName:'思捷体育'
    }
  },'application/x-www-form-urlencoded')
}