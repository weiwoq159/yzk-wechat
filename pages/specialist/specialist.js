// pages/specialist/specialist.js
const app = getApp()
Page({
  /**
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
    tabDetailCeil: [],
    showOrDis: false,
    answerIndex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(123123)
    let params = {
      pageNum: 1,
      pageSize: 200,
      type: 117,
      essence: 0
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
        console.log(app.globalData)
      }
    })
  },
  // 切换列表
  changetab: function (e) {
    let params = {
      pageNum: 1,
      pageSize: 200,
      type: 117,
      essence: 0
    }
    params.essence = e.currentTarget.dataset.index
    this.setData({
      chooseList: e.currentTarget.dataset.index
    })
    this.changeRe(params)
  },
  // 点赞
  goodup: function (e) {
    let {praiseStatus, liked} = e.currentTarget.dataset.content
    console.log(e.currentTarget.dataset)
    let _liked = "tabDetailCeil[" + e.currentTarget.dataset.index + "].liked"
    let _praiseStatus = "tabDetailCeil[" + e.currentTarget.dataset.index + "].praiseStatus"
    
    let params = {
      praiseStatus,
      commentId: e.currentTarget.dataset.content.id
    }
    console.log(e)
    if (wx.getStorageSync('token') === '') {
      wx.showToast({
        title: '用户不存在，请登录',
        icon: 'none'
      })
    } else {
      wx.request({
        url: 'https://zk.1boyun.com/web/api/issue/issuePraise',
        header: app.globalData.token,
        data: params,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: res => {
          if (res.data.code === 1) {
            console.log(praiseStatus)
            if (praiseStatus === 0) {
              praiseStatus = 1
              liked++
            } else {
              praiseStatus = 0
              liked--
            }
            this.setData({
              [_liked]: liked,
              [_praiseStatus]: praiseStatus
            })
          }
        }
      })
    }
  },
  // 显示模态框
  showReply(e) {
    console.log(e)
    this.setData({
      showOrDis: true,
      answerIndex: e.currentTarget.dataset.commentid
    })
    console.log(this.data)
  },
  // 隐藏模态框
  disReply() {
    this.setData({
      showOrDis: false
    })
  },
  // 修改内容
  changeReply(e) {
    this.setData({
      replyContent: e.detail.value
    })
    console.log(this.data.replyContent)
  },
  // 评论
  displayReply () {
    let params = {
      issueId: this.data.answerIndex,
      content: this.data.replyContent
    }
    wx.request({
      url: 'https://zk.1boyun.com/web/api/issue/commentAdd',
          data: params,
          header: app.globalData.token,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: res => {
            wx.showToast({
              title: '评论审核中',
              icon: 'none'
            })
            this.setData({
              replyContent: '',
              showOrDis: false
            })
          }
    })
  },
  goToDetail: function(e) {
    var data = JSON.stringify(e.currentTarget.dataset.item);
    console.log(data)
    wx.navigateTo({
      url: '../answerDetail/answerDetail?id=' + data
    })
  },
  AskExperts: function(e) {
    wx.navigateTo({
      url: '../askExperts/askExperts'
    })
  }
})