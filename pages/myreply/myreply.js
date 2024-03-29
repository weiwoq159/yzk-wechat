// pages/myreply/myreply.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  goToNews (e) {
    console.log(e)
    let params = {
      bookid: e.currentTarget.dataset.news.bookId
    }
    // wx.navigateTo({
    //   url: '../newsDetail/newsDetail?bookId=' + JSON.stringify(params),
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: 'https://zk.1boyun.com/web/api/iReplys/searchIReplys',
      header: app.globalData.token,
      data: {
        pageNum: 1,
        pageSize: 20
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        console.log(res)
        let content = [...res.data.data.reply, ...res.data.data.comment].sort(app.replyPositive1)
        this.setData({
          contentList:content
        })
        console.log(this.data)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})