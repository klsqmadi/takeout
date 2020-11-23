import request from './network'
import {
  API_URL_getGoodsCategoryInfo,
  API_URL_deleteCategory,
  API_URL_addCategory,
  API_URL_modifyCategoryName
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


