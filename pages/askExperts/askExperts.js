// pages/PublishedArticles/PublishedArticles.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker:[{
      value: 1,
      label: '人力资源'
    }, {
      value: 2,
      label: '社会保障'
    }, {
      value: 3,
      label: '财务税收'
    }, {
      value: 4,
      label: '公积金'
    }],
    publish:{
      index: 0,
      title: '',
      content: ''
    },
  },
  PickerChange(e) {
    console.log(e);
    let index = 'publish.index'
    this.setData({
      [index]: e.detail.value
    })
  },
  setContent (e) {
    let content = 'publish.content'
    this.setData({
      [content]: e.detail.value
    })
  },
  submit () {
    let data = this.data.publish
    if (!data.content) {
      wx.showToast({
        title: '请输入内容',
        icon: 'success',
        image: '../../static/img/error.png',
        duration: 2000
      })
      console.log('请输入内容')
    } else {
        wx.showLoading({
          title: '文章提交中',
        })
        let index = this.data.publish.index
        let params = {
          category: this.data.picker[index].value,
          content: this.data.publish.content,
          classify: this.data.picker[index].label,
          type: 117
        }
        console.log(params)
        wx.request({
        url: 'https://zk.1boyun.com/web/api/issue/add',
        header: app.globalData.token,
        data: params,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: res => {
          console.log(res)
          wx.hideLoading()
          if (res.data.code === 0) {
            wx.showToast({
              icon: 'none',
              title: '请进行登录',
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../login/login',
              })
            }, 2000)
          } else {
            setTimeout(function () {
              wx.reLaunch({
                url: '../index/index',
              })
            }, 2000)
          }
        }
      })
    }
  },
  cancel () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.category) {
      let index = 'publish.index'
      this.setData({
        [index]: options.category - 1
      })
    }
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