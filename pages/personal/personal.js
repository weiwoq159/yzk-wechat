// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    clumnList: [{
      name: '我的发布',
      iconFont: 'icon-publish',
      link: '../mypublish/mypublish'
    }, {
      name: '我的回复',
      iconFont: 'icon-reply',
      link: '../myreply/myreply'
    }
    , {
      name: '我的燚专家',
      iconFont: 'icon-note',
      link: '../mySpecialist/mySpecialist'
    }
  ],
    telphone: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.token['x-authentication-token'] = wx.getStorageSync('token') 
    wx.request({
      url: 'https://zk.1boyun.com/web/api/login/userMessage',
      header:app.globalData.token,
      data: {
        pageNum: 1,
        pageSize: 20,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        this.setData({
          userInfo: app.globalData.userInfo,
          name: app.globalData.userInfo.nickName,
          telphone: res.data.data.phone
        })
        console.log(this.data.userInfo)
        console.log(app.globalData)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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