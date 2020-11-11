// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '',
    fitCode: '',
    noticeShow:false,
    noticeContent:'系统出错',
    sendCodeContent:'获取验证码',
    canSendCode:false,
    canAgainSendCode:true,
    loginDebounce:true
  },
  phoneNumberReg(phoneNumber){
    let noticeContent = ''
    const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
    if(phoneNumber == ''){
      noticeContent =  '请输入手机号码'
    }else if(!reg.test(phoneNumber)){
      noticeContent = '手机号码格式不正确,请重新输入'
    }
    if(noticeContent == ''){
      this.setData({
        noticeShow:false,
        canSendCode:true
      })
    }else {
      this.setData({
        noticeShow:true,
        noticeContent:noticeContent,
        canSendCode:false
      })
    }
    setTimeout(()=>{
      this.setData({
        noticeShow:false,
        noticeContent:'系统出错'
      })
    },750)
  },
  fitCodeReg(fitCode){
    const {noticeContent} = this.data
    if(noticeContent == '系统出错'){
      if(fitCode == ''){
        this.setData({
          noticeShow:true,
          noticeContent:'请输入验证码'
        })
        setTimeout(()=>{
          this.setData({
            noticeShow:false,
            noticeContent:'系统错误'
          })
        },750)
      }
    }
  },
  login() {
    let {loginDebounce} = this.data
    if(loginDebounce){
      const {phoneNumber,fitCode} = this.data
      this.phoneNumberReg(phoneNumber)
      this.fitCodeReg(fitCode)
      loginDebounce = false
      this.setData({
        loginDebounce:loginDebounce
      })
      setTimeout(() => {
        this.setData({
        loginDebounce:true
      })
      }, 750);
    }
  },
  sendFitCode(){
    let flag = this.data.canAgainSendCode
    let {canSendCode,phoneNumber} = this.data
    this.phoneNumberReg(phoneNumber)
    if(flag && canSendCode){
      (()=>{this.setData({
        canAgainSendCode:false,
        sendCodeContent:'60秒后重发'
      })})()
      let time = 60
      let setCodeInterval = setInterval(() => {
        time--
        let content = `${time}秒后重发`
        this.setData(({
          sendCodeContent:content
        }))
        if(time == -1){
          clearInterval(setCodeInterval)
          this.setData({
            canAgainSendCode:true,
            sendCodeContent:'获取验证码'
          })
        }
      }, 1000);
    }
  },
  inputEventGetValue(e) {
    const paramType = e.currentTarget.dataset.paramtype
    if (paramType == 'fitCode') {
      const query = wx.createSelectorQuery()
      query.select('.fitcode').fields({
        properties:['value']
      },(res)=>{
        e.detail.value = res.value
      }).exec()
    }
    this.setData({
      [paramType]: e.detail.value
    })
  },

})