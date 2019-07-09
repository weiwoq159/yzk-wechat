// pages/ManpowerResource/ManpowerResource.js
const app = getApp()
Page({
  data: {
    category: '4',
    pageIndex: 3,
    newsList: '',
    meta: {
      pageNum: 1,
      pageSize: 10
    },
  },
  gotoList: function (e) {
    let params = e.currentTarget.dataset
    wx.navigateTo({
      url: '../newsList/newsList?text=' + JSON.stringify(params)
    })
  },
  gotoDetail(e) {
    let params = e.currentTarget.dataset
    console.log(params)
    wx.navigateTo({
      url: '../newsDetail/newsDetail?bookId=' + JSON.stringify(params),
    })
  },
  onShow() {
    app.globalData.searchKind = 2
    app.globalData.category = this.data.category
    app.getAddress(res => {
      app.globalData.searchInput = res.data
    })
    console.log('公积金页面加载')
    let params = Object.assign({
      category: this.data.category
    }, this.data.meta)
    wx.request({
      url: 'https://zk.1boyun.com/web/api/book/search',
      data: params,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: app.globalData.token,
      success: res => {
        console.log(res)
        this.setData({
          meta: res.data.meta,
          newsList: res.data.data
        })
      }
    })
    wx.request({
      url: 'https://zk.1boyun.com/web/api/book/searchHome',
      data: {
        category: this.data.category
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: app.globalData.token,
      success: res => {
        let picList = app.checkImg(res.data.data)
        console.log(picList)
        this.setData({
          picList: res.data.data
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  goodup: function (e) {
    console.log('e', e)
    let _this = this.data.newsList[e.currentTarget.dataset.index]
    let goodup = "newsList[" + e.currentTarget.dataset.index + "].liked"
    let isLiked = "newsList[" + e.currentTarget.dataset.index + "].isLiked"
    console.log(_this)
    let isLikedNum = 0
    let _thisLiked = _this.liked
    console.log(_this.id)
    console.log(app.globalData.token)
    wx.request({
      url: 'https://zk.1boyun.com/web/api/praise/add',
      header: app.globalData.token,
      data: {
        typeId: _this.id,
        type: 1
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        if (_this.isLiked === 0) {
          isLikedNum = 1
          _thisLiked = _this.liked + 1
        } else {
          isLikedNum = 0
          _thisLiked = _this.liked - 1
        }
        this.setData({
          [goodup]: _thisLiked,
          [isLiked]: isLikedNum
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }

})