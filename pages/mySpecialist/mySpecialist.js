// pages/specialist/specialist.js
const app = getApp()
Page({

  /**a s
   * 页面的初始数据
   */
  data: {
    speciaList:[{
      name:'最新问答',
      id: 0
    },
    {
      name:'燚精选问答',
      id: 1
    }],
    chooseList: 0,
    tabDetailCeil: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let params = {
      isme: 1,
      pageNum: 1,
      pageSize: 20,
      type: 117
    }
    this.changeRe(params)
  },
  changeRe: function(params) {
    wx.request({
      url: 'https://zk.1boyun.com/web/api/issue/search',
      data: params,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: app.globalData.token, // 设置请求的 header
      success: res => {
        this.setData({
          tabDetailCeil: res.data.data.search
        })
      }
    })
  },
  gotoDetail: function(e) {
    wx.navigateTo({
      url: '../answerDetail/answerDetail?id=' + e.currentTarget.dataset.bookid
    })
  },
  AskExperts: function(e) {
    wx.navigateTo({
      url: '../askExperts/askExperts'
    })
  }
})