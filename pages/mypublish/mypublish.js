// pages/mypublish/mypublish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display1: false,
    display: false,
    year: '2019',
    yearChose: 2019,
    publishList: null,
    statusChose: null,
    publishList1: null,
    status: [{
      name: '全部',
      id: 0
    }, {
      name: '已发布',
      id: 1
    }, {
      name: '审核中',
      id: 2
    }, {
      name: '审核未通过',
      id: 4
    }],
    choseName: '筛选',
    message: '该年度暂无文章发布'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {
    let year = 2019
    let yearArr = []
    for (let item = 0; item <= 1; item++) {
      yearArr.push(year - item)
    }
    wx.request({
      url: 'https://zk.1boyun.com/web/api/book/getRelease',
      data: {
        pageNum: 1,
        pageSize: 200
      },
      header: app.globalData.token,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        for (let item in res.data.data) {
          res.data.data[item].year = res.data.data[item].time.substring(0, 4)
        }
        this.setData({
          yearArr,
          publishList: res.data.data,
          publishList1: res.data.data
        })
      }
    })
  },
  chooseYear(e) {
    if (this.data.publishList1) {
      let publishList = this.data.publishList1
      let newArry = publishList.filter(value => {
        if (this.data.statusChose === null) {
          return value.year == e.currentTarget.dataset.choose
        } else {
          return value.year == e.currentTarget.dataset.choose && value.status == this.data.statusChose
        }
      })
      this.setData({
        yearChose: e.currentTarget.dataset.choose,
        year: e.currentTarget.dataset.choose,
        display1: false,
        publishList: newArry

      })
    } else {
      this.setData({
        yearChose: e.currentTarget.dataset.choose,
        year: e.currentTarget.dataset.choose,
        display1: false
      })
    }

    console.log(this.data.publishList1.length)
  },
  choseYearList() {
    this.setData({
      display: false,
      display1: !this.data.display1
    })
  },
  choseNameList() {
    this.setData({
      display: !this.data.display,
      display1: false
    })
  },
  chooseName(item) {
    console.log(item)
    let message = this.data.message
    switch (item.currentTarget.dataset.choose.id) {
      case 0:
        message = '本年度暂无文章发布'
        break
      case 1:
        message = '本年度暂无文章发布'
        break
      case 2:
        message = '本年度暂无需审核内容'
        break
      case 4:
        message = '本年度暂无审核未通过文章'
        break
    }
    this.setData({
      message
    })
    if (this.data.publishList1) {
      let publishList = this.data.publishList1
      let newArry = publishList.filter(value => {
        if (item.currentTarget.dataset.choose.id == 0) {
          return value.year == this.data.yearChose
        } else {
          if (this.data.yearChose === 2019) {
            return value.status == item.currentTarget.dataset.choose.id
          } else {
            return value.status == item.currentTarget.dataset.choose.id && value.year == this.data.yearChose
          }
        }
      })
      this.setData({
        statusChose: item.currentTarget.dataset.choose.id,
        choseName: item.currentTarget.dataset.choose.name,
        display: false,
        publishList: newArry
      })
    } else {
      this.setData({
        statusChose: item.currentTarget.dataset.choose.id,
        choseName: item.currentTarget.dataset.choose.name,
        display: false,
      })
    }

  },
  gotoD(e) {
    if (e.currentTarget.dataset.publish.status == 2) {
      wx.showToast({
        title: '文章审核中',
        icon: 'none',
        duration: 2000
      })
    } else {
      let params = {
        bookid: e.currentTarget.dataset.publish.id,
        category: e.currentTarget.dataset.publish.category
      }
      console.log(params)
      wx.navigateTo({
        url: '../newsDetail/newsDetail?bookId=' + JSON.stringify(params),
      })
    }
  }
})