//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchInput: '',
    navigation: [{
      text: '人力资源',
      pagePath: '../ManpowerResource/ManpowerResource'
    }, {
      text: '社会保障',
      pagePath: '../Social/Social'
    }, {
      text: '财务税收',
      pagePath: '../Taxation/Taxation'
    }, {
      text: '公积金',
      pagePath: '../ReservedFunds/ReservedFunds'
    }, {
      text: '燚精选',
      pagePath: '../Choiceness/Choiceness'
    }
    , {
      text: '燚专家',
      pagePath: '../specialist/specialist'
    }
  ]
  },
  specialist: function () {
    wx.navigateToMiniProgram({
      appId: 'wxd80ef70ff79115d6',
      path: 'pages/home/index/index',
      envVersion: 'release'
    })
  },
  login: function (e) {
    console.log(e)
    app.wxauther(res => {
      console.log(res)
      if (res.data.code === 0) {
        wx.navigateTo({
          url: '../login/login'
        })
      } else {
        wx.navigateTo({
          url: '../personal/personal'
        })
        app.globalData.userinfo = res.data.data
        wx.setStorageSync('token', res.data.data.token)
        wx.setStorageSync('userId', res.data.data.id)
      }
    })
  },
  changeSearch: function (e) {
    this.setData({
      searchInput: e.detail.value
    })
  },
  gotoSearch: function () {
    if (this.data.searchInput === '') {
      wx.showToast({
        title: '请输入搜索内容',
        image: '../../static/img/error.png',
        duration: 2000
      })
    } else {
      app.globalData.searchKind = 1
      app.globalData.searchParams = {
        pageNum: 1,
        pageSize: 5,
        keyword: this.data.searchInput
      }
      wx.navigateTo({
        url: '../SearchResult/SearchResult',
      })
    }
  },
  onLoad: function (options) {
    console.log(options)
    if (options.scene) {
      app.globalData.fromUid = options.scene
    }
  },
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      path: '/pages/index/index'
    }
  }
})