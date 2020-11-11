// subPages/order/takeCash/takeCash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seleteTime:{
      date:'2020-10-01',
      start:'2019-01-01',
      end:'2020-10',
      totalIncome:456,
    },
    incomeDetail:[
      {
        orderNumber:'9874 1234 98544 123',
        time:'2020-10-01 21:25:31',
        income:'12.00'
      },
      {
        orderNumber:'7567 1238 78540 850',
        time:'2020-10-01 11:55:41',
        income:'52.00'
      },
      {
        orderNumber:'4523 7835 45315 027',
        time:'2020-10-07 11:45:53',
        income:'42.00'
      },
      {
        orderNumber:'5230 8675 45325 521',
        time:'2020-10-01 06:12:01',
        income:'13.00'
      },
      {
        orderNumber:'7432 5471 43251 401',
        time:'2020-10-01 08:41:32',
        income:'54.00'
      },
      {
        orderNumber:'9874 1273 49322 454',
        time:'2020-10-01 08:33:42',
        income:'20.00'
      },
      {
        orderNumber:'9874 9541 41035 450',
        time:'2020-10-01 01:11:01',
        income:'78.00'
      },
      {
        orderNumber:'9874 4521 48962 832',
        time:'2020-10-01 13:21:04',
        income:'99999.00'
      },
      {
        orderNumber:'9874 4598 45321 450',
        time:'2020-10-01 12:51:24',
        income:'17.00'
      },
      {
        orderNumber:'9874 1234 45322 589',
        time:'2020-10-01 14:34:54',
        income:'54.00'
      },
      {
        orderNumber:'9874 1234 42489 452',
        time:'2020-10-01 15:24:19',
        income:'201.00'
      },
      
    ]
  },
  dateChange(e){
    this.data.seleteTime.date = e.detail.value
    this.setData({
      seleteTime:this.data.seleteTime
    })
  }
})