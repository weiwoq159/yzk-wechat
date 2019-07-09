// pages/newsDetail/newsDetail.js
var WxParse = require('../../wxParse/wxParse')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: '4',
    getOption: {},
    news: '',
    replyMessage: '',
    showOrDis: false,
    sort: [{
      name: '时间倒序',
      id: 0
    }, {
      name: '时间正序',
      id: 1
    }, {
      name: '被赞最多',
      id: 2
    }, {
      name: '评论最多',
      id: 3
    }],
    highLight: 0,
    replyContent: '',
    replyKind: '2',
    replyStor: ''
  },
  clickgoodup: function (e) {
    let news = e.currentTarget.dataset.index
    let params = {
      type: 1,
      typeId: news.id
    }
    wx.request({
      url: 'https://zk.1boyun.com/web/api/praise/add',
      data: params,
      header: app.globalData.token,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        if (news.isLiked === 0) {
          news.isLiked = 1
          news.liked = news.liked + 1
        } else {
          news.isLiked = 0
          news.liked = news.liked - 1
        }
        this.setData({
          news: news
        })
      }
    })
  },
  goodup: function (e) {
    console.log(e.currentTarget.dataset.index)
    let params = {
      typeId: e.currentTarget.dataset.index.id,
      type: 2
    }
    let reply = e.currentTarget.dataset.index
    let replyMes = "replyMessage[" + e.currentTarget.dataset.inde + "]"
    wx.request({
      url: 'https://zk.1boyun.com/web/api/praise/add',
      data: params,
      header: app.globalData.token,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        if (reply.status === 0) {
          reply.status = 1
          reply.goodUp = reply.goodUp + 1
        } else {
          reply.status = 0
          reply.goodUp = reply.goodUp - 1
        }
        console.log(reply)
        this.setData({
          [replyMes]: reply
        })
      }
    })
  },
  changeActive: function (el) {
    let selectId = el.currentTarget.dataset.choose
    let newArr = []
    switch (selectId) {
      case 0:
        newArr = this.data.replyMessage.sort(app.replyFlashback)
        break;
      case 1:
        newArr = this.data.replyMessage.sort(app.replyPositive)
        break;
      case 2:
        newArr = this.data.replyMessage.sort(app.replyGoodUp)
        break
      case 3:
        newArr = this.data.replyMessage.sort(app.replyNum)
        break
    }
    this.setData({
      replyMessage: newArr,
      highLight: selectId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var replyArr = [];
    let params = {
      pageSize: 10,
      pageNum: "1",
      status: null,
      id: null
      // id: "6487546222672244758"
    }
    console.log(JSON.parse(options.bookId).bookid)
    if (JSON.parse(options.bookId).bookid === undefined) {
      params.id = options.bookId
    } else {
      this.setData({
        getOption: JSON.parse(options.bookId),
        pageIndex: JSON.parse(options.bookId).nowpage
      })
      params.id = this.data.getOption.bookid
    }
    console.log(params)
    app.requested(params, res => {
      this.setData({
        news: res.data.data[0]
      })
      WxParse.wxParse('art', 'html', res.data.data[0].content, that);
    })
    // console.log(this.data.getOption)
    wx.request({
      url: 'https://zk.1boyun.com/web/api/comment/commentShow',
      data: {
        bookId: this.data.getOption.bookid,
        // bookId: params.id,
        pageSize: 200,
        pageNum: 1,
      },
      header: app.globalData.token,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: res => {
        this.setData({
          replyMessage: res.data.data.comment.sort(app.replyFlashback)
        })
      }
    })
    wx.request({
      url: 'https://zk.1boyun.com/web/api/book/click',
      header: app.globalData.token,
      data: {
        id: this.data.getOption.bookid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
      }
    })
  },
  changeReply(e) {
    this.setData({
      replyContent: e.detail.value
    })
    console.log(this.data.replyContent)
  },
  displayReply(e) {
    let params = {}
    let news = this.data.news
    console.log(this.data.replyContent)
    if (this.data.replyContent === '') {
      this.setData({
        showOrDis: false
      })
    } else {
      if (this.data.replyKind == 2) {
        params = {
          bookId: news.id,
          bookTitle: news.title,
          bookType: news.type,
          content: this.data.replyContent
        }
        wx.request({
          url: 'https://zk.1boyun.com/web/api/comment/commentAdd',
          data: params,
          header: app.globalData.token,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: res => {
            this.setData({
              showOrDis: false
            })
            // this.replyNewsOk(res.data.commentId)
            wx.showToast({
              title: '评论审核中',
              duration: 2000
            })
          }
        })
      } else if (this.data.replyKind == 1) {
        let reply = this.data.replyMessage[this.data.replyStor]
        console.log(reply)
        params = {
          commentId: reply.id,
          replyType: 1,
          content: this.data.replyContent
        }
        wx.request({
          url: 'https://zk.1boyun.com/web/api/reply/replyAdd',
          data: params,
          header: app.globalData.token,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: res => {
            this.setData({
              showOrDis: false
            })
            console.log(res)
            // this.replyOK()
            wx.showToast({
              title: '评论审核中',
              duration: 2000
            })
          }
        })
      }
    }
    console.log(params)
  },
  replyNewsOk(key) {
    let lis = {
      id: key,
      content: this.data.replyContent,
      createTimes: (new Date()).getTime(),
      fromUname: app.globalData.userInfo.nickName,
      fromUheadportrait: null,
      fromUid: 72,
      goodUp: 0,
      replyNum: 0,
      status: 0,
      relpy: []
    }
    this.data.replyMessage.push(lis)
    let newMessage = this.data.replyMessage.sort(app.replyFlashback)
    this.setData({
      replyMessage: newMessage,
      replyContent: ''
    })
  },
  replyOK(res) {
    console.log(this.data)
    let replyMes = {
      commentId: this.data.replyMessage[this.data.replyStor].id,
      content: this.data.replyContent,
      createTime: '2019-01-17T14:04:22.000+0000',
      createTimes: (new Date()).getDate(),
      fromUid: 72,
      replyToUname: null,
      replyType: 1,
      replyUname: app.globalData.userInfo.nickName,
      toUid: null
    }
    this.data.replyMessage[this.data.replyStor].relpy.push(replyMes)
    let newMessage = this.data.replyMessage.sort(app.replyFlashback)
    this.setData({
      replyMessage: newMessage,
      replyContent: ''
    })
  },
  disReply() {
    this.setData({
      showOrDis: false
    })
  },
  showReply(e) {
    console.log(e)
    this.setData({
      showOrDis: true,
      replyKind: e.currentTarget.dataset.inde,
      replyStor: e.currentTarget.dataset.reply,
    })
  },
  godo() {
    console.log(1)
    let date = new Date()
    console.log(date)
  },
  goToDetail(e) {
    app.globalData.replyDetail = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../replyDetail/replyDetail'
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