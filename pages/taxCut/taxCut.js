// pages/taxCut/taxCut.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '0',
    price1: 0,
    nowIndex: 1,
    previousStep: 1,
    sonNum: 0,
    bortherNum: 0,
    detail: {
    },
    num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    visitHistory: [],
    brotherShowOrDis: false,
    history: [],
    money: {
      education: null,
      treatment: '',
    }
  },
  returnHome () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 修改医疗费用
  changeTreatment(e) {
    console.log(e.detail)
    let treatment = 'money.treatment'
    let money = e.detail.value
    // if (parseInt(money) >= 80000) {
    //   money = 80000
    // }
    this.setData({
      [treatment]: parseInt(e.detail.value),
    })
    app.globalData.money.treatment = parseInt(e.detail.value)
  },
  sureTreatment() {
    if (app.globalData.money.treatment >= 80000) {
      app.globalData.money.treatment = 80000
    }
    this.totalMoney(8)
  },
  showBrotherNum() {
    this.setData({
      brotherShowOrDis: !this.data.brotherShowOrDis
    })
  },
  displayBox(e) {
    console.log(e.currentTarget.dataset.now)
    let nowIndex = this.data.nowIndex
    if (e.currentTarget.dataset.now === 5) {
      this.setData({
        brotherNum: e.currentTarget.dataset.clicknum,
      })
      app.globalData.money.support = 24000 / e.currentTarget.dataset.clicknum
      this.totalMoney(6, nowIndex)
    } else if (e.currentTarget.dataset.now === 8) {
      if (e.currentTarget.dataset.clicknum == 0) {
        this.totalMoney(10, nowIndex)
      } else {
        this.setData({
          sonNum: e.currentTarget.dataset.clicknum
        })
        this.totalMoney(9, nowIndex)
      }
    }
  },
  again () {
    let money = app.globalData.money
    let visit = []
    Object.keys(money).filter(function (a) {
      money[a] = 0
    })
    this.setData({
      sonNum:0,
      brotherNum:0
    })
    this.totalMoney(1, 1)
  },
  totalMoney(nextIndex, nowIndex) {
    let money = app.globalData.money
    let sum = 0
    Object.keys(money).filter(function (a) {
      console.log(a, money[a])
      sum += money[a]
    })
    let visit = this.data.visitHistory
    visit.push(nowIndex)
    this.setData({
      price: sum.toString(),
      price1: sum,
      nowIndex: nextIndex,
      detail: app.globalData.money,
      visitHistory: visit,
      brotherShowOrDis: false
    })
  },
  nextQuest(e) {
    let visit = this.data.visitHistory
    let id = e.currentTarget.dataset.click
    let nowIndex = this.data.nowIndex
    let money = app.globalData.money
    let nextIndex = ''
    if (id === 'true') {
      switch (this.data.nowIndex) {
        case 1:
          money.education = 4800
          nextIndex = nowIndex + 1
          break
        case 2:
          money.professional = 3600
          nextIndex = nowIndex + 1
          break
        case 4:
          money.support = 24000
          nextIndex = nowIndex + 2
          break
        case 9:
          money.childrenEducation = this.data.sonNum * 12000 / 2
          nextIndex = nowIndex + 1
          break
        case 11:
          money.rent = 18000
          money.twelve = 0
          nextIndex = 14
          break
        case 12:
          money.twelve  = 13200
          nextIndex = 14
          break
        case 13:
          money.rent = money.rent === 9600 ? 0 : money.rent
          money.twelve = 12000
          nextIndex = 14
          break
        default:
          nextIndex = nowIndex + 1
          break
      }
    } else if (id === 'false') {
      switch (this.data.nowIndex) {
        case 1:
          money.education = 0
          nextIndex = nowIndex + 1
        case 2:
          money.professional = 0
          nextIndex = nowIndex + 1
          break
        case 3:
          nextIndex = 6
          break
        case 4 :
          money.support = 0
          nextIndex = nowIndex + 1
          break
        case 6:
          money.treatment = 0
          nextIndex = 8
          break
        case 9:
          money.childrenEducation = this.data.sonNum * 12000
          nextIndex = nowIndex + 1
          break  
        case 10:
          money.rent = 0
          nextIndex = 13
          break
        case 12:
          money.rent = 9600
          nextIndex = nowIndex + 1  
          break
        case 13:
          money.twelve = 0
          nextIndex = nowIndex + 1  
          break
        default:
          nextIndex = nowIndex + 1
          break 
      }
    }
    this.totalMoney(nextIndex, nowIndex)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  historyed () {
    let length = this.data.visitHistory.length
    let history = this.data.visitHistory
    if (length !== 0) {
      console.log(length)
      console.log(this.data)
      console.log(this.data.visitHistory[length - 1])
      this.setData({
        nowIndex: this.data.visitHistory[length - 1],
      })
      history.pop()
      this.setData({
        visitHistory: history,
      })
      // this.nowIndex = this.data.visitHistory[length - 1]
      if (this.data.visitHistory[length - 1] === 9) {
      }
    } else {
      return false
    }
  },
  onLoad: function (options) {
    wx.request({
      url: 'https://tax.1boyun.com/static/answer.json',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        console.log(res)
        this.setData({
          answerList: res.data,
        })
      }
    })
  },
  onShareAppMessage: function () {
    console.log(1)
  }
})