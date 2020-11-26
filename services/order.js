import request from './network'
import {
  STATUS_CODE_getOrder_SUCCES,
  API_URL_getOrders
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