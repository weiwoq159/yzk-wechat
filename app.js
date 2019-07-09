//app.js
App({
  onReady() {},
  onShow: function () {},
  onLaunch: function (options) {
    // wx.getShareInfo({
    //   shareTicket: options.shareTicket,
    //   timeout:10000,
    //   success: (result)=>{
    //     console.log(result)
    //   }
    // });
    wx.hideTabBar({})
    let a = wx.getStorage({
      key: 'token',
      success: res => {
        this.globalData.token['x-authentication-token'] = res.data
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.token['x-authentication-token'] = wx.getStorageSync('token')

    // 登录
    wx.login({
      success: res => {
        console.log('wx.login')
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.jscode = res.code
        let globalData = this.globalData
        wx.getStorage({
          key: 'token',
          success: res => {
            wx.setStorageSync('token', res.data)
          },
          fail: function () {
            wx.request({
              url: 'https://zk.1boyun.com/web/api/mp/wxauth',
              data: {
                jscode: res.code
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function (result) {
                console.log(result)
                globalData.userInfo = result.data.data
                wx.setStorage({
                  key: 'token',
                  data: result.data.data.token
                })
                wx.setStorageSync('token', res.data)
                return result.data.code
              }
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    fromUid: null,
    money:{
      education: 0,
      // 职业证书
      professional: 0,
      support:0,
      treatment: 0,
      twelve: 0,
      childrenEducation: 0,
      rent: 0,
    },
    userInfo: null,
    hierarchy: '',
    jscode: '',
    userId: '',
    userinfo: '',
    searchParams: {
      pageNum: 1,
      pageSize: 5,
      keyword: null,
      category: null,
      areaId: '',
      classify: ''
    },
    searchInput: {},
    category: {},
    replyDetail: '',
    searchKind: '',
    token: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://zk.1boyun.com',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'x-authentication-token': ''
    }
  },
  //search 接口
  requested: function (params, success) {
    wx.request({
      url: 'https://zk.1boyun.com/web/api/book/search',
      data: params,
      header: this.globalData.token,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: success,
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //获取地址
  getAddress: function (success) {
    wx.request({
      url: 'https://zk.1boyun.com/static/address.json',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: this.globalData.token, // 设置请求的 header
      success: success
    })
  },
  wxauther: function (success) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://zk.1boyun.com/web/api/mp/wxauth',
          data: {
            jscode: res.code
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: success
        })
      }
    })
  },
  checkImg(that) {
    var listArr = that.map(function (value) {
      // console.log(value)
      switch (value.classify) {
        case '办税服务':
          value.img = 'https://zk.1boyun.com/static/img/bszn.png'
          break
        case '服务之窗':
          value.img = 'https://zk.1boyun.com/static/img/bg.png'
          break
        case '法律法规':
          value.img = 'https://zk.1boyun.com/static/img/law.png'
          break
        case '权威解读':
          value.img = 'https://zk.1boyun.com/static/img/qwjd.png'
          break
        case '办税指南':
          value.img = 'https://zk.1boyun.com/static/img/bszn1.png'
          break
        case '政策解读':
          value.img = 'https://zk.1boyun.com/static/img/zcjd.png'
          break
        case '业务指南':
          value.img = 'https://zk.1boyun.com/static/img/afPic2.png'
          break
        case '政策法规':
          value.img = 'https://zk.1boyun.com/static/img/afPic1.png'
          break
        case '公积金学堂':
          value.img = 'https://zk.1boyun.com/static/img/afPic3.png'
          break
        case '税收法规':
          value.img = 'https://zk.1boyun.com/static/img/revenue.png'
          break
        case '劳动关系案例':
          value.img = 'https://zk.1boyun.com/static/img/lwhzgx.png'
          break
        case '财税学堂':
          value.img = 'https://zk.1boyun.com/static/img/csxt.png'
          break
        case '税收法规库':
          value.img = 'https://zk.1boyun.com/static/img/revenue.png'
          break
      }
      return value
    })
    return listArr
  },
  newsPositive(a, b) {
    return (new Date(a.ceateTime)).getTime() - (new Date(b.ceateTime)).getTime()
  },
  newsFlashback(a, b) {
    return (new Date(b.ceateTime)).getTime() - (new Date(a.ceateTime)).getTime()
  },
  newsLiked(a, b) {
    return b.liked - a.liked
  },
  newsReply(a, b) {
    return b.commentNum - a.commentNum
  },
  replyPositive(a, b) {
    return a.createTimes - b.createTimes
  },
  replyFlashback(a, b) {
    return b.createTimes - a.createTimes
  },
  replyGoodUp(a, b) {
    return b.goodUp - a.goodUp
  },
  replyNum(a, b) {
    return b.replyNum - a.replyNum
  }
})