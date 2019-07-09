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
      label: '社保公积金'
    }, {
      value: 3,
      label: '财务税收'
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
  setTitle (e) {
    let title = 'publish.title'
    this.setData({
      [title]:e.detail.value
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
    console.log(data)
    if (!data.title) {
      wx.showToast({
        title: '标题为空',
        icon: 'success',
        image: '../../static/img/error.png',
        duration: 2000
      })
      console.log('标题为空')
    } else if (!data.content) {
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
          category: 5,
          content: this.data.publish.content,
          classify: this.data.picker[index].label,
          title: this.data.publish.title
        }
        wx.request({
        url: 'https://zk.1boyun.com/web/api/release/essence',
        header:app.globalData.token,
        data: params,
        header: app.globalData.token,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: res => {
          wx.hideLoading()
          wx.navigateBack({
            delta: 1
          })
        }
        // else if (data.index == '') {
        //   wx.showToast({
        //     title: '请选择类别',
        //     icon: 'success',
        //     image: '../../static/img/error.png',
        //     duration: 2000
        //   })
        //   console.log('请选择类别')
        // } 
      })
    }
    // wx.request({
    //   url: 'https://zk.1boyun.com/web/api/release/essence',
    //   data: this.data.publish,
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: res => {
    //     console.log(res)
    //   }
    // })
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