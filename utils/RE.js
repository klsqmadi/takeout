export class RegExp {
  constructor() {
    this.MinLength = 4
    this.MaxLength = 30
    //正数  最多小数点后两位
    this.PositiveNumber = /^[0-9]+(.[0-9]{1,2})?$/
    this.Number = /^\d+$/
    this.Mobile = /^(?:(?:\+|00)86)?1\d{10}$/
    this.MoreStrictMobile = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    this.MostStrictMobile = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
  }
  isMobile(MobileValue,strict = 1){
    return strict == 1?this.Mobile.test(MobileValue):strict == 2?this.MoreStrictMobile.test(MobileValue):strict == 3?this.MostStrictMobile.test(MobileValue):false
  }
  isMinLength(StringValue,minLength = this.MinLength){
    return StringValue.length >= minLength ? true:false 
  }
  isMaxLength(StringValue,maxLength = this.MaxLength){
    return StringValue.length <= maxLength ? true:false 
  }
  isMinToMaxLength(StringValue,minLength = this.MinLength,maxLength = this.MaxLength){
    return StringValue.length >= minLength && StringValue.length <= maxLength ? true:false
  }
  isPositiveNumber(NumberValue){
    return this.PositiveNumber.test(NumberValue)?true:false
  }
}