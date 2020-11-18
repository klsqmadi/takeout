import request from './network'
import {
  API_URL_getGoodsCategoryInfo,
  API_URL_deleteCategory,
  API_URL_addCategory
} from './config'

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

export function addCategory(){
  return request({
    url:API_URL_addCategory,
    method:'POST'
  })
}


