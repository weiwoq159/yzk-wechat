// pages/ManpowerResource/ManpowerResource.js
const app = getApp()
Page({
  data: {
    category: '5',
    pageIndex: 4,
    picList: '',
    newsList: '',
    meta: {
      pageNum: 1,
      pageSize: 10
    },
    highLight: 0,
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
    this.setData({
      newsList: newArr,
      highLight: selectId
    })
  },
  goodup: function (e) {
    let _this = this.data.newsList[e.currentTarget.dataset.index]
    let goodup = "newsList[" + e.currentTarget.dataset.index + "].liked"
    let isLiked = "newsList[" + e.currentTarget.dataset.index + "].isLiked"
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
  onShow: function () {
    //1 首页搜索
    // 2 二级菜单搜索
    // 3 燚精选搜索
    app.globalData.searchKind = 3
    app.globalData.category = this.data.category
    app.globalData.searchInput = [{
      id: '1',
      name: '人力资源'
    }, {
      id: '2',
      name: '社会保障'
    }, {
      id: '3',
      name: '财务税收'
    }, {
      id: '4',
      name: '公积金'
    }]
    let params = {
      essence: 1,
      pageSize: 10,
      pageNum: 1
    }
    console.log(this.data.meta)
    app.requested(params, res => {
      this.setData({
        meta: res.data.meta,
        newsList: res.data.data
      })
    })
  },
  onReachBottom: function () {
    if (this.data.meta.page < Math.ceil(this.data.meta.total / this.data.meta.perpage)){
      let params = {
        pageNum: this.data.meta.page + 1,
        pageSize: this.data.meta.perpage,
        essence: 1,
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