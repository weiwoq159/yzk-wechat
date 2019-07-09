// pages/ManpowerResource/ManpowerResource.js
const app = getApp()
Page({
  data: {
    category: '2',
    pageIndex: 1,
    picList: ''
  },
  gotoList: function (e) {
    let params = e.currentTarget.dataset
    wx.navigateTo({
      url: '../newsList/newsList?text=' + JSON.stringify(params)
    })
  },
  onShow() {
    app.globalData.searchKind = 2
    app.globalData.category = this.data.category
    app.getAddress(res => {
      app.globalData.searchInput = res.data
    })
    wx.request({
      url: 'https://zk.1boyun.com/web/api/book/searchHome',
      data: {
        category: this.data.category
      },
      header: app.globalData.token,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        let picList = app.checkImg(res.data.data)
        console.log(picList)
        this.setData({
          picList: res.data.data
        })
      }
    })
  }

})