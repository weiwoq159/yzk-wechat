// pages/ManpowerResource/ManpowerResource.js
const app = getApp()
Page({
  data: {
    category: '1',
    pageIndex: 0,
    picList: '',
    name: ''
  },
  gotoList: function (e) {
    let params = e.currentTarget.dataset
    wx.navigateTo({
      url: '../newsList/newsList?text=' + JSON.stringify(params)
    })
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  onShow () {
    console.log(123)
    const { searchHome } = app.globalData.app
    app.globalData.searchKind = 2
    app.globalData.category = this.data.category
    app.globalData.hierarchy = 1
    let params = {
      category: this.data.category
    }
    searchHome(params).then(res => {
      console.log(res)
      this.setData({
        picList: res.data
      })
    })
  },
})