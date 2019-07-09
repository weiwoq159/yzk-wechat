// pages/newsList/newsList.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getOption: {},
    newsList: '',
    meta: '',
    highLight: 0,
    pageIndex: '',
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
      name: '回复最多',
      id: 3
    }]
  },
  changeActive: function (el) {
    let selectId = el.currentTarget.dataset.choose
    console.log(selectId)
    let newArr = []
    switch (selectId) {
      case 0:
        newArr = this.data.newsList.sort(app.newsFlashback)
        break;
      case 1:
        newArr = this.data.newsList.sort(app.newsPositive)
        break;
      case 2:
        newArr = this.data.newsList.sort(app.newsLiked)
        break
      case 3:
        newArr = this.data.newsList.sort(app.newsReply)
        break
    }
    console.log(newArr)
    this.setData({
      newsList: newArr,
      highLight: selectId
    })
  },
  goodup: function (e) {
    console.log('e', e)
    console.log(this.data.newsList)
    let _this = this.data.newsList[e.currentTarget.dataset.index]
    let goodup = "newsList[" + e.currentTarget.dataset.index + "].liked"
    let isLiked = "newsList[" + e.currentTarget.dataset.index + "].isLiked"
    console.log(_this)
    let isLikedNum = 0
    let _thisLiked = _this.liked
    console.log(_this.id)
    console.log(app.globalData.token)
    wx.request({
      url: 'https://zk.1boyun.com/web/api/praise/add',
      header: app.globalData.token,
      data: {
        typeId: _this.id,
        type: 1
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        if (_this.isLiked === 0) {
          isLikedNum = 1
          _thisLiked = _this.liked + 1
        } else {
          isLikedNum = 0
          _thisLiked = _this.liked - 1
        }
        this.setData({
          [goodup]: _thisLiked,
          [isLiked]: isLikedNum
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  gotoDetail (e) {
    let params = e.currentTarget.dataset
    console.log(params)
    wx.navigateTo({
      url: '../newsDetail/newsDetail?bookId=' + JSON.stringify(params),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.searchKind = 5
    this.setData({
      getOption: JSON.parse(options.text)
    })
    let params = JSON.parse(options.text)
    console.log(123, params)
    this.setData({
      pageIndex: params.nowpage
    })
    delete params.nowpage
    let num = {
      pageSize: 10,
      pageNum: 1,
      classify: params.pagename,
      category: params.category
  }
    console.log(num)
    // let num = this.data.getOption
    app.requested(num,res => {
      console.log(res)
      this.setData({
        meta:res.data.meta,
        newsList:res.data.data
      })
    })
  },
  onReachBottom: function () {
    console.log(Math.ceil(this.data.meta.total / this.data.meta.perpage))
    if (this.data.meta.page < Math.ceil(this.data.meta.total / this.data.meta.perpage)){
      let params = {
        pageNum: this.data.meta.page + 1,
        pageSize: 10,
        classify: this.data.getOption.pagename,
        category: this.data.getOption.category
      }
      app.requested(params, res => {
        let meta = this.data.meta
        meta.page ++
        let data = [...this.data.newsList, ...res.data.data].sort(app.newsFlashback)
        console.log(res)
        let page = 'meta.page'
        this.setData({
          page: this.data.meta.page + 1,
          newsList: data
        })
      })
    }
  }  
})