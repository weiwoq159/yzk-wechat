// pages/answerDetail/answerDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerDetail:{},
    replyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = JSON.parse(options.id)
    this.setData({
      answerDetail: data
    })
  }
})