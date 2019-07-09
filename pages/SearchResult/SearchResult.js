// pages/SearchResult/SearchResult.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meta: '',
    newsList: '',
    // title:'<font style="color:red">123123</font>',
    labelDis: false,
    name: '请选择',
    category: '',
    index: '',
    searchKey: '',
    options: [{
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
    }],
  },
  changeLab: function () {
    this.setData({
      labelDis: !this.data.labelDis
    })
  },
  changeChose: function (e) {
    console.log(e)
    this.setData({
      category: e.target.dataset.item.id,
      index: e.target.dataset.item.id - 1,
      name: e.target.dataset.item.name,
      labelDis: false
    })
  },
  goodup: function (e) {
    console.log('e', e)
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
  searchKey(e) {
    console.log(e)
    this.setData({
      searchKey: e.detail.value
    })
  },
  SearchInput: function (e) {
    let $this = this
    app.globalData.searchParams = {
      category: this.data.category,
      keyword: this.data.searchKey,
      pageNum: 1,
      pageSize: 10,
    }
    app.requested(app.globalData.searchParams, res => {
      this.setData({
        meta: res.data.meta,
        newsList: res.data.data
      })
    })
    // this.setData({
    //   meta: newsList.meta,
    //   newsList: newsList.data
    // })
  },
  gotoDetail (el) {
    console.log(el.currentTarget.dataset.da.id)
    let params = {
      bookid: el.currentTarget.dataset.da.id,
      category: el.currentTarget.dataset.da.category,
      nowpage:el.currentTarget.dataset.da.category - 1
    }
    console.log(params)
    wx.navigateTo({
      url: '../newsDetail/newsDetail?bookId=' + JSON.stringify(params),
    })
  },
  onReachBottom: function () {
    if (this.data.meta.page < Math.ceil(this.data.meta.total / this.data.meta.perpage)) {
      app.globalData.searchParams.pageNum = this.data.meta.page + 1
      console.log(app.globalData.searchParams.pageNum)
      app.requested(app.globalData.searchParams, res => {
        let meta = this.data.meta
        meta.page++
        let data = [...this.data.newsList, ...res.data.data]
        let page = 'meta.page'
        this.setData({
          page: this.data.meta.page + 1,
          newsList: data
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.request({
      url: 'https://zk.1boyun.com/web/api/book/search',
      data: app.globalData.searchParams,
      header: app.globalData.token,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        this.setData({
          meta: res.data.meta,
          newsList: res.data.data,
          searchKey: app.globalData.searchParams.keyword,
        })
        console.log(this.data)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})