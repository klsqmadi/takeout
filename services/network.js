import {
  BASEURL
} from './config'

export default function(option){
  return new Promise((reslove,reject)=>{
    wx.request({
      url: BASEURL + option.url ,
      method:option.method||'get',
      data:option.data||{},
      success:reslove,
      fail:reject
    })
  })
}