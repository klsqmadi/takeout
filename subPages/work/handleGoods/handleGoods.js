// subPages/order/handleGoods/handleGoods.js
Page({
  data: {
    tabContent: ['出售中', '售罄的'],
    tabCurrentIndex: 0,
    TabCur: 0,
    TabCur1:0,
    MainCur: 0,
    MainCur1: 0,
    VerticalNavTop: 0,
    VerticalNavTop1: 0,
    list: [
      {
        name: '热销',
        id: 0,
        goods: [{
            goodsName: '1香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 0,
            standard:[
              {
                title:'杯型',
                type:['大杯','中杯','小杯']
              },
              {
                title:'杯型',
                type:['大杯','中杯','小杯']
              }
            ]
          },
          {
            goodsName: '2劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 1
          },
          {
            goodsName: '3鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 2
          },
          {
            goodsName: '4半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 3
          },
          {
            goodsName: '5香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 4
          },
          {
            goodsName: '6香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 5
          },
        ]
      },
      {
        name: '特色炒饭',
        id: 1,
        goods: [{
            goodsName: '7香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 6
          },
          {
            goodsName: '8劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 7
          },
          {
            goodsName: '9鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 8
          },
          {
            goodsName: '10半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 9
          },
          {
            goodsName: '11香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 10
          },
          {
            goodsName: '12香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 11
          },
        ]
      },
      {
        name: '查奥恩',
        id: 2,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 12
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 13
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 14
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 15
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 16
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 17
          },
        ]
      },
      {
        name: '汉堡',
        id: 3,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 18
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 19
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 20
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 21
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 22
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 23
          },
        ]
      },
      {
        name: '炸鸡',
        id: 4,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 24
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 25
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 26
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 27
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 28
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 29
          },
        ]
      },
      {
        name: '热销',
        id: 5,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 0
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 1
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 2
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 3
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 4
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 5
          },
        ]
      },
      {
        name: '特色炒饭',
        id: 6,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 6
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 7
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 8
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 9
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 10
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 11
          },
        ]
      },
      {
        name: '查奥恩',
        id: 7,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 12
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 13
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 14
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 15
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 16
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 17
          },
        ]
      },
      {
        name: '汉堡',
        id: 8,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 18
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 19
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 20
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 21
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 22
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 23
          },
        ]
      },
      {
        name: '炸鸡',
        id: 9,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 24
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 25
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 26
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 27
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 28
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 29
          },
        ]
      },
      {
        name: '热销',
        id: 10,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 0
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 1
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 2
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 3
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 4
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 5
          },
        ]
      },
      {
        name: '特色炒饭',
        id: 11,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 6
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 7
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 8
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 9
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 10
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 11
          },
        ]
      },
      {
        name: '查奥恩',
        id: 12,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 12
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 13
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 14
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 15
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 16
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 17
          },
        ]
      },
      {
        name: '汉堡',
        id: 13,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 18
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 19
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 20
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 21
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 22
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 23
          },
        ]
      },
      {
        name: '炸鸡',
        id: 14,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 24
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 25
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 26
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 27
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 28
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 29
          },
        ]
      },
      {
        name: '热销',
        id: 15,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 0
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 1
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 2
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 3
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 4
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 5
          },
        ]
      },
      {
        name: '特色炒饭',
        id: 16,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 6
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 7
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 8
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 9
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 10
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 11
          },
        ]
      },
      {
        name: '查奥恩',
        id: 17,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 12
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 13
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 14
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 15
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 16
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 17
          },
        ]
      },
      {
        name: '汉堡',
        id: 18,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 18
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 19
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 20
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 21
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 22
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 23
          },
        ]
      },
      {
        name: '炸鸡',
        id: 19,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 24
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 25
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 26
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 27
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 28
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 29
          },
        ]
      },

    ],
    list1: [{
        name: '热销',
        id: 0,
        goods: [{
            goodsName: '1香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 0
          },
          {
            goodsName: '2劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 1
          },
          {
            goodsName: '3鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 2
          },
          {
            goodsName: '4半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 3
          },
          {
            goodsName: '5香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 4
          },
          {
            goodsName: '6香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 5
          },
        ]
      },
      {
        name: '特色炒饭',
        id: 1,
        goods: [{
            goodsName: '7香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 6
          },
          {
            goodsName: '8劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 7
          },
          {
            goodsName: '9鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 8
          },
          {
            goodsName: '10半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 9
          },
          {
            goodsName: '11香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 10
          },
          {
            goodsName: '12香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 11
          },
        ]
      },
      {
        name: '查奥恩',
        id: 2,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 12
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 13
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 14
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 15
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 16
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 17
          },
        ]
      },
      {
        name: '汉堡',
        id: 3,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 18
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 19
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 20
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 21
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 22
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 23
          },
        ]
      },
      {
        name: '炸鸡',
        id: 4,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 24
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 25
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 26
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 27
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 28
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 29
          },
        ]
      },
      {
        name: '热销',
        id: 5,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 0
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 1
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 2
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 3
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 4
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 5
          },
        ]
      },
      {
        name: '特色炒饭',
        id: 6,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 6
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 7
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 8
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 9
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 10
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 11
          },
        ]
      },
      {
        name: '查奥恩',
        id: 7,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 12
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 13
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 14
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 15
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 16
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 17
          },
        ]
      },
      {
        name: '汉堡',
        id: 8,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 18
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 19
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 20
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 21
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 22
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 23
          },
        ]
      },
      {
        name: '炸鸡',
        id: 9,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 24
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 25
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 26
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 27
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 28
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 29
          },
        ]
      },
      {
        name: '热销',
        id: 10,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 0
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 1
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 2
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 3
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 4
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 5
          },
        ]
      },
      {
        name: '特色炒饭',
        id: 11,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 6
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 7
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 8
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 9
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 10
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 11
          },
        ]
      },
      {
        name: '查奥恩',
        id: 12,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 12
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 13
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 14
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 15
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 16
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 17
          },
        ]
      },
      {
        name: '汉堡',
        id: 13,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 18
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 19
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 20
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 21
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 22
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 23
          },
        ]
      },
      {
        name: '炸鸡',
        id: 14,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 24
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 25
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 26
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 27
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 28
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 29
          },
        ]
      },
      {
        name: '热销',
        id: 15,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 0
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 1
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 2
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 3
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 4
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 5
          },
        ]
      },
      {
        name: '特色炒饭',
        id: 16,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 6
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 7
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 8
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 9
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 10
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 11
          },
        ]
      },
      {
        name: '查奥恩',
        id: 17,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 12
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 13
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 14
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 15
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 16
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 17
          },
        ]
      },
      {
        name: '汉堡',
        id: 18,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 18
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 19
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 20
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 21
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 22
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 23
          },
        ]
      },
      {
        name: '炸鸡',
        id: 19,
        goods: [{
            goodsName: '香酥小鸡腿1个',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 12.00,
            isChecked: false,
            iid: 24
          },
          {
            goodsName: '劲爆双层牛肉堡+鸡块+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 4,
            price: 16.9,
            isChecked: false,
            iid: 25
          },
          {
            goodsName: '鸡肉卷+自选小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 17.9,
            isChecked: false,
            iid: 26
          },
          {
            goodsName: '半只烤鸡+自选汉堡+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 48.9,
            isChecked: false,
            iid: 27
          },
          {
            goodsName: '香辣鸡腿堡+小吃+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 57.9,
            isChecked: false,
            iid: 28
          },
          {
            goodsName: '香辣双层牛肉堡+墨西哥鸡肉卷+饮料',
            introduce: '主要原料:酱油,盐,水,米饭,香精,我也不知道',
            saled: 120,
            price: 50.9,
            isChecked: false,
            iid: 29
          },
        ]
      },

    ],
    load: true,
    isCheckBoxShow: false,
    deletedGoods: [],
    deletedGoodsLength: 0,
    currentModalType: '',
    modalName: ['edit', 'delete', 'add', 'deleteNotice'],
    modal: {
      edit: {
        modalShow: false
      },
      delete: {
        modalShow: false
      },
      add: {
        modalShow: false
      },
      deleteNotice: {}
    },
    addGood: {
      addGoodIndex: '',
      addGoodIndex2: '',
      addGoodItemIndex: '',
      addGoodImage: [],
      addGoodName: '',
      addGoodIntroduce: '',
      addGoodPrice: '',
      saled: 0,
      standard:[]
    },
    pickerRanges: []

  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    //将list里的类名收集
    this.pickerRanges()
  },
  onReady() {
    wx.hideLoading()
  },
  /**
   * 导航栏模块
   */
  tabSwitch(e) {
    //tab栏切换 点击事件
    const index = e.currentTarget.dataset.index
    this.setData({
      tabCurrentIndex: index
    })
  },
  tabSelect(e) {
    //垂直导航点击选择
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  tabSelect1(e) {
    //垂直导航点击选择
    this.setData({
      TabCur1: e.currentTarget.dataset.id,
      MainCur1: e.currentTarget.dataset.id,
      VerticalNavTop1: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    //垂直导航高度控制
    let that = this
    let list = this.data.list
    let tabHeight = 0
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id)
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight
          tabHeight = tabHeight + data.height
          list[i].bottom = tabHeight
        }).exec()
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  VerticalMain1(e) {
    //垂直导航高度控制
    let that = this
    let list = this.data.list1
    let tabHeight = 0
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main1-" + list[i].id)
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight
          tabHeight = tabHeight + data.height
          list[i].bottom = tabHeight
        }).exec()
      }
      that.setData({
        load: false,
        list1: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop1: (list[i].id - 1) * 50,
          TabCur1: list[i].id
        })
        return false
      }
    }
  },
  /**
   * ckechBox模块
   */
  controlCheckBoxShowOrHide(e, flag) {
    //显示隐藏checkbox
    //每次点击取消或删除商品将list.goods.isChecked 变为false
    if (flag === false || flag === true) {
      flag = flag
    } else if (flag === undefined) {
      flag = e.currentTarget.dataset.flag
    }
    /* flag = flag || e.currentTarget.dataset.flag */
    for (const item of this.data.list) {
      for (const value of item.goods) {
        value.isChecked = false
      }
    }
    this.setData({
      list: this.data.list,
      isCheckBoxShow: flag,
      deletedGoodsLength: 0
    })
  },
  clickChecked(e) {
    //checkBox 点击(打勾或取消) value改变
    const index = e.currentTarget.dataset.index
    const itemIndex = e.currentTarget.dataset.itemindex
    const iid = e.currentTarget.dataset.iid
    this.data.list[index].goods[itemIndex].isChecked = !this.data.list[index].goods[itemIndex].isChecked
    this.changeDeleteGoods(index, itemIndex, iid)
    this.setData({
      list: this.data.list
    })
  },
  changeDeleteGoods(index, itemIndex, iid) {
    //判断checkBox是否勾选,如勾选动作则把当前goods的id和iid作为一个对象推到deleteGoods里,如是取消动作则遍历deleteGoods把对应的对象删除
    if (this.data.list[index].goods[itemIndex].isChecked == true) {
      const deleteGood = {
        index,
        itemIndex,
        iid
      }
      this.data.deletedGoods.push(deleteGood)
      this.data.deletedGoodsLength++
    } else if (this.data.list[index].goods[itemIndex].isChecked == false) {
      this.data.deletedGoods = this.data.deletedGoods.filter(item => item.iid !== iid)
      this.data.deletedGoodsLength--
    }
    this.setData({
      deletedGoodsLength: this.data.deletedGoodsLength,
      deletedGoods: this.data.deletedGoods
    })
  },
  /**
   * 显示或隐藏modal框 工具函数
   */
  showModal(e, currentModalType) {
    currentModalType = currentModalType || e.currentTarget.dataset.currentmodaltype
    this.setData({
      currentModalType: currentModalType,
    })
  },
  hideModal(e) {
    if (this.data.currentmodaltype == 'add') {
      const {addGood} = this.data
      addGood.goodName = addGood.goodIntroduce = addGood.goodPrice = ''
    }
    this.setData({
      currentModalType: '',
    })
  },
  getQueryInputValue(className, obj, param) {
    const query = wx.createSelectorQuery()
    query.select(className).fields({
      properties: ['value']
    }, res => {
      obj[param] = res.value
    }).exec();
  },
  clearthisDataAddGood() {
    const {addGood} = this.data
    addGood.addGoodIndex = addGood.addGoodItemIndex = addGood.addGoodIndex2 = null
    addGood.addGoodImage = []
    addGood.addGoodName = addGood.addGoodIntroduce = addGood.addGoodPrice = ''
    addGood.saled = 0
  },
  /**
   * 删除商品模块 相关函数
   */
  showDeleteModal(e) {
    //判断是否选择删除商品,如数量为0,弹出提示框
    if (this.data.deletedGoodsLength == 0) {
      this.showModal(e, this.data.modalName[3])
      setTimeout(() => {
        this.hideModal()
      }, 1500)
    } else {
      this.showModal(e, this.data.modalName[1])
    }
  },
  deleteGoods(e) {
    let flag1 = 0;
    let temp = 0;
    //对deleteGoods 进行多条件排序
    this.data.deletedGoods.sort((a, b) => {
      if (a["index"] == b["index"]) {
        if (a["itemIndex"] > b["itemIndex"])
          return 1
        else if (a["itemIndex"] < b["itemIndex"])
          return -1
        else return 0
      } else if (a["index"] > b["index"])
        return 1
      else return -1

    })
    for (const item of this.data.deletedGoods) {
      //temp用来判断是否index改变
      if (temp != item.index) {
        flag1 = 0
      }
      //判断itemIndex跟flag的大小,存在flag比itemIndex大的情况,
      this.data.list[item.index].goods.splice(item.itemIndex - flag1, 1)
      temp = item.index
      flag1++
    }
    this.setData({
      list: this.data.list,
      deletedGoodsLength: 0,
      deletedGoods: []
    })
    this.controlCheckBoxShowOrHide(e, false)
    this.hideModal()
  },
  /**
   * 增加商品模块 相关函数
   */
  addGoods(e) {
    //在api中传输,在success中清空addGood
    //获取 新增商品名字,介绍,价格 input框内的值
    const addGood = {
      goodsName: '',
      introduce: '',
      saled: 0,
      price: '',
      isChecked: false,
      iid: 0
    }
    this.getQueryInputValue('.addGoodName', addGood, "goodsName")
    this.getQueryInputValue('.addGoodIntroduce', addGood, "introduce")
    this.getQueryInputValue('.addGoodPrice', addGood, "price")
    //给一个setTimeout 为了同上面一样进入微任务队列,防止异步操作,下面作为主线程任务先行执行
    setTimeout(() => {
      this.data.list[this.data.addGood.addGoodIndex].goods.push(addGood)
      this.clearthisDataAddGood()
      this.setData({
        list: this.data.list,
        addGood: this.data.addGood
      })
      this.hideModal()
    }, 100)

  },
  pickerChange(e, index) {
    //切换类型时,index改变
    this.setData({
      ["addGood.addGoodIndex"]: e.detail.value
    })
  },
  pickerRanges() {
    //类型收集函数
    for (const item of this.data.list) {
      this.data.pickerRanges.push(item.name)
    }
    this.setData({
      pickerRanges: this.data.pickerRanges
    })
  },
  chooseImage() {
    //图片选择
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        this.data.addGood.addGoodImage = res.tempFilePaths
        this.setData({
          ["addGood.addGoodImage"]: this.data.addGood.addGoodImage
        })
      }
    });
  },
  deleteImage(e) {
    //图片删除
    this.data.addGood.addGoodImage.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      ["addGood.addGoodImage"]: this.data.addGood.addGoodImage
    })
  },
  /**
   * 编辑商品模块 相关函数
   */
  showEditModal(e) {
    /**
     * @param (index) (事件所传递参数，大类的索引)
     * @param (itemindex) (事件所传递参数，小类的索引)
     * @param (addGood) (页面全局变量，用于在编辑时,临时储存,确定编辑后,再赋值到原数组)
     * 该函数用于显示编辑模态框
     * if判断当前是否为checkBox显示阶段,如果是，不给继续
     * 如果不是,index是大类索引,
     * 利用index和itemindex拿到当前点击的商品的信息,赋值给addGood
     */
    if(!this.data.isCheckBoxShow){
      const {addGood} = this.data
      const {index,itemindex} = e.currentTarget.dataset
      const {goodsName,introduce,price,saled} = this.data.list[index].goods[itemindex]
      addGood.addGoodName = goodsName
      addGood.addGoodIntroduce = introduce
      addGood.addGoodPrice = price
      addGood.saled = saled
      addGood.addGoodIndex2 = addGood.addGoodIndex = index
      addGood.addGoodItemIndex = itemindex
      //JSON.parse(JSON.stringify) 因为standard是引用类型数据,担心会修改addGood影响到原数据
      this.setData({
        addGood: addGood
      })
      this.showModal(e, 'edit')
    }
  },
  hideEditModal() {
    /**
     * @param (addGood) (页面全局变量,点击取消编辑时,将addGood赋空)
     * 该函数用于隐藏编辑模态框
     */
    this.hideModal()
    const {addGood} = this.data
    addGood.addGoodIndex = addGood.addGoodItemIndex = addGood.addGoodIndex2 = null
    addGood.addGoodImage = []
    addGood.addGoodName = addGood.addGoodIntroduce = addGood.addGoodIntroduce = ''
    addGood.saled = addGood.price = 0
    this.setData({
      addGood: this.data.addGood
    })
  },
  confirmEditGood() {
    const index2 = this.data.addGood.addGoodIndex2
    const index = this.data.addGood.addGoodIndex
    const itemIndex = this.data.addGood.addGoodItemIndex
    const addGood = {
      goodsName: '',
      introduce: '',
      saled: this.data.addGood.saled,
      price: '',
      isChecked: false,
      iid: 0
    }
    //获取input内的值
    this.getQueryInputValue('.editGoodName', addGood, "goodsName")
    this.getQueryInputValue('.editGoodIntroduce', addGood, "introduce")
    this.getQueryInputValue('.editGoodPrice', addGood, "price")
    setTimeout(() => {
      if (index == index2) {
        //判断是否从原本所在的类切换到其他类
        this.data.list[index].goods[itemIndex] = addGood
      } else {
        this.data.list[index].goods.push(addGood)
        this.data.list[index2].goods.splice(itemIndex, 1)
      }
      this.clearthisDataAddGood()
      this.setData({
        list: this.data.list,
        addGood: this.data.addGood
      })
      this.hideModal()
    },50)
    //时间毫米数不够 ，坑
  }
})